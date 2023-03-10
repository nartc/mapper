import { AUTOMAPPER_METADATA_FACTORY_KEY } from '@automapper/classes';
import {
    ArrayLiteralExpression,
    ClassDeclaration,
    GetAccessorDeclaration,
    getDecorators,
    Identifier,
    ImportDeclaration,
    JSDocTag,
    MethodDeclaration,
    Modifier,
    NodeFactory,
    ObjectLiteralExpression,
    Program,
    PropertyDeclaration,
    SourceFile,
    Statement,
    StringLiteral,
    TransformationContext,
    TypeChecker,
    TypeReferenceNode,
    Visitor,
    getAllJSDocTags,
    isClassDeclaration,
    isGetAccessorDeclaration,
    isImportDeclaration,
    isPropertyDeclaration,
    ModuleKind,
    SyntaxKind,
    visitEachChild,
    visitNode,
} from 'typescript/lib/tsserverlibrary';
import {
    AUTOMAP_IGNORE_TAG,
    AUTOMAPPER_DECORATOR_NAME,
    JSDOC_KEY,
} from './constants';
import {
    getDecoratorOrUndefinedByNames,
    getTypeReference,
    isNullableUnionType,
    replaceImportPath,
} from './utils';

export class ModelVisitor {
    private static readonly metadataMap = new Map<
        string,
        Record<string, ObjectLiteralExpression>
    >();
    private static readonly importsMap = new Map<string, ImportDeclaration>();
    private static isCommonJS = false;

    static reset() {
        this.metadataMap.clear();
        this.importsMap.clear();
        this.isCommonJS = false;
    }

    static visit(
        sourceFile: SourceFile,
        context: TransformationContext,
        program: Program
    ): SourceFile {
        const typeChecker = program.getTypeChecker();
        ModelVisitor.isCommonJS =
            context.getCompilerOptions().module === ModuleKind.CommonJS;

        function nodeVisitorFactory(
            ctx: TransformationContext,
            sf: SourceFile
        ): Visitor {
            const nodeVisitor: Visitor = (node) => {
                // if there is import, save the cloned in our importsMap for the file
                if (isImportDeclaration(node)) {
                    ModelVisitor.importsMap.set(
                        (node.moduleSpecifier as StringLiteral).text,
                        ModelVisitor.cloneImportDeclaration(ctx.factory, node)
                    );
                    return node;
                }

                // if this is a class node, traverse all properties in this class
                // after traverse finishes, we add the metadata factory method to the class
                // because all nodes' metadata should have been saved
                if (isClassDeclaration(node)) {
                    // visit each property/methods/nodes/comments in the class
                    node = visitEachChild(node, nodeVisitor, ctx);
                    return ModelVisitor.addMetadataFactory(
                        node as ClassDeclaration,
                        ctx.factory
                    );
                }

                // if the node is property or a getter
                // foo: string
                // get foo(): string {}
                if (
                    isPropertyDeclaration(node) ||
                    isGetAccessorDeclaration(node)
                ) {
                    const decorators = getDecorators(node);
                    const existingAutoMapDecorator =
                        getDecoratorOrUndefinedByNames(
                            [AUTOMAPPER_DECORATOR_NAME],
                            decorators
                        );

                    // if the property already has AutoMap decorator on it, skip
                    if (existingAutoMapDecorator) {
                        return node;
                    }

                    const isPropertyStaticOrPrivate = (
                        node.modifiers || []
                    ).some(
                        (modifier) =>
                            modifier.kind === SyntaxKind.StaticKeyword ||
                            modifier.kind === SyntaxKind.PrivateKeyword
                    );

                    // if this property is static or private, skip because
                    // we shouldn't/can't access this property when mapping
                    if (isPropertyStaticOrPrivate) {
                        return node;
                    }

                    // Check jsDoc for ignore tag
                    const jsDocKey = JSDOC_KEY as keyof typeof node;
                    if (node[jsDocKey]) {
                        const ignoreTag = getAllJSDocTags(
                            node[jsDocKey],
                            (tag): tag is JSDocTag =>
                                tag.tagName.escapedText === AUTOMAP_IGNORE_TAG
                        );
                        if (ignoreTag) {
                            return node;
                        }
                    }

                    return ModelVisitor.inspectNode(
                        ctx.factory,
                        node,
                        typeChecker,
                        sf
                    );
                }

                // visit each node in the file
                return visitEachChild(node, nodeVisitor, ctx);
            };

            return nodeVisitor;
        }

        const visitedSourceFile = visitNode(
            sourceFile,
            nodeVisitorFactory(context, sourceFile)
        );

        // if the target is CommonJS, keep as is
        if (ModelVisitor.isCommonJS) {
            return visitedSourceFile;
        }

        // if the target is not CommonJS, we need to re-map the imports
        return context.factory.updateSourceFile(
            visitedSourceFile,
            ([...ModelVisitor.importsMap.values()] as Statement[]).concat(
                (visitedSourceFile.statements || ([] as Statement[])).filter(
                    (statement) =>
                        statement.kind !== SyntaxKind.ImportDeclaration
                )
            ),
            visitedSourceFile.isDeclarationFile,
            visitedSourceFile.referencedFiles,
            visitedSourceFile.typeReferenceDirectives,
            visitedSourceFile.hasNoDefaultLib,
            visitedSourceFile.libReferenceDirectives
        );
    }

    private static addMetadataFactory(
        classNode: ClassDeclaration,
        factory: NodeFactory
    ): ClassDeclaration {
        const classMetadata = this.getClassMetadata(classNode);

        // return early, no class metadata
        if (!classMetadata) {
            return classNode;
        }

        // add the factory static method at the end of the class
        return factory.updateClassDeclaration(
            classNode,
            classNode.modifiers as unknown as Modifier[],
            classNode.name,
            classNode.typeParameters,
            classNode.heritageClauses,
            [
                ...classNode.members,
                this.createMetadataFactoryMethod(factory, classMetadata),
            ]
        );
    }

    private static createMetadataFactoryMethod(
        factory: NodeFactory,
        metadata: Record<string, ObjectLiteralExpression>
    ): MethodDeclaration {
        /**
         * should be: [
         *    ['property1', {type, depth}],
         *    ['property2', {type, depth}]
         *  ]
         */
        const metadataAsReturnBlock = factory.createArrayLiteralExpression(
            Object.entries(metadata).reduce(
                (expressions, [propertyKey, propertyMetadata]) => {
                    if (propertyMetadata) {
                        expressions.push(
                            factory.createArrayLiteralExpression([
                                factory.createStringLiteral(propertyKey),
                                propertyMetadata,
                            ])
                        );
                    }
                    return expressions;
                },
                [] as ArrayLiteralExpression[]
            ),
            true
        );

        /**
         * should be: static __AUTOMAPPER_METDATA_FACTORY__() {
         *   return [...]
         * }
         */
        return factory.createMethodDeclaration(
            [factory.createModifier(SyntaxKind.StaticKeyword)],
            undefined,
            factory.createIdentifier(AUTOMAPPER_METADATA_FACTORY_KEY),
            undefined,
            undefined,
            [],
            undefined,
            factory.createBlock(
                [factory.createReturnStatement(metadataAsReturnBlock)],
                true
            )
        );
    }

    private static addMetadata(
        node: PropertyDeclaration | GetAccessorDeclaration,
        metadata: ObjectLiteralExpression, // { type, depth }
        sourceFile: SourceFile
    ): PropertyDeclaration | GetAccessorDeclaration {
        const hostClass = node.parent;
        const className = (hostClass as ClassDeclaration).name?.getText();
        // cannot find the class of this property, skip
        if (!className) {
            return node;
        }

        const existingMetadata = this.metadataMap.get(className) || {};
        const propertyName = node.name?.getText(sourceFile);

        // defensive, no name for this property, skip
        // or this property name is computed like: object[computed]
        if (
            !propertyName ||
            (node.name && node.name.kind === SyntaxKind.ComputedPropertyName)
        ) {
            return node;
        }

        this.metadataMap.set(className, {
            ...existingMetadata,
            [propertyName]: metadata,
        });
        return node;
    }

    private static inspectNode(
        factory: NodeFactory,
        node: PropertyDeclaration | GetAccessorDeclaration,
        typeChecker: TypeChecker,
        sourceFile: SourceFile
    ) {
        // try getting type from typeChecker
        let type = typeChecker.getTypeAtLocation(node);
        const typeNode = node.type;

        // no type for property node, skip
        if (!type || !typeNode) return node;

        // union with undefined or null like string | null, ?: string
        if (isNullableUnionType(type)) {
            type = type.getNonNullableType();
        }

        // typeReference is [the type, if the type is array or not]
        const typeReference = getTypeReference(type, typeNode, typeChecker);

        if (!typeReference[0]) {
            const typeReferenceFromNodeType =
                this.tryGetTypeReferenceFromNodeType(node);
            if (typeReferenceFromNodeType) {
                typeReference[0] = typeReferenceFromNodeType;
            }
        }

        // failed to infer type, skip
        if (!typeReference[0]) return node;

        // if typeReference includes an import statement, extract the correct import symbol
        if (typeReference[0].includes('import')) {
            if (ModelVisitor.isCommonJS) {
                const replacedImportPath = replaceImportPath(
                    typeReference[0],
                    sourceFile.fileName
                );
                if (replacedImportPath) {
                    typeReference[0] = replacedImportPath;
                }
            } else {
                const typeName = typeReference[0].split('.').pop();
                if (typeName) {
                    typeReference[0] = typeName;
                }
            }
        }

        return this.addMetadata(
            node,
            this.createMetadataObjectLiteral(
                factory,
                typeReference as [string, boolean]
            ),
            sourceFile
        );
    }

    private static createMetadataObjectLiteral(
        factory: NodeFactory,
        [type, isArray]: [string, boolean]
    ): ObjectLiteralExpression {
        // result should be: { type: () => typeReference | [typeReference], depth: 1 }
        return factory.createObjectLiteralExpression([
            factory.createPropertyAssignment(
                factory.createIdentifier('type'),
                factory.createArrowFunction(
                    undefined,
                    undefined,
                    [],
                    undefined,
                    factory.createToken(SyntaxKind.EqualsGreaterThanToken),
                    isArray
                        ? factory.createArrayLiteralExpression([
                              factory.createIdentifier(type),
                          ])
                        : factory.createIdentifier(type)
                )
            ),
            factory.createPropertyAssignment(
                factory.createIdentifier('depth'),
                factory.createNumericLiteral(1)
            ),
        ]);
    }

    private static getClassMetadata(
        classNode: ClassDeclaration
    ): Record<string, ObjectLiteralExpression> | undefined {
        if (!classNode.name) {
            return;
        }
        return this.metadataMap.get(classNode.name.getText());
    }

    private static tryGetTypeReferenceFromNodeType(
        node: PropertyDeclaration | GetAccessorDeclaration
    ): string | undefined {
        return ((node.type as TypeReferenceNode).typeName as Identifier)
            ?.escapedText as string;
    }

    private static cloneImportDeclaration(
        factory: NodeFactory,
        importDeclaration: ImportDeclaration
    ) {
        return factory.createImportDeclaration(
            importDeclaration.modifiers,
            importDeclaration.importClause,
            importDeclaration.moduleSpecifier
        );
    }
}
