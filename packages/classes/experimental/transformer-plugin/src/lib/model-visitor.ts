import { AUTOMAPPER_METADATA_FACTORY_KEY } from '@automapper/classes';
import {
  ArrowFunction,
  ClassDeclaration,
  GetAccessorDeclaration,
  getAllJSDocTags,
  Identifier,
  ImportDeclaration,
  isClassDeclaration,
  isGetAccessorDeclaration,
  isImportDeclaration,
  isPropertyDeclaration,
  JSDocTag,
  ModuleKind,
  NodeArray,
  NodeFactory,
  ObjectLiteralExpression,
  Program,
  PropertyAssignment,
  PropertyDeclaration,
  SourceFile,
  Statement,
  StringLiteral,
  SyntaxKind,
  TransformationContext,
  Type,
  TypeChecker,
  TypeReferenceNode,
  visitEachChild,
  visitNode,
  Visitor,
} from 'typescript/lib/tsserverlibrary';
import {
  hasPropertyKey,
  isAnyType,
  isNullableUnionType,
  isTypeLiteral,
} from './ast-utils';
import { AUTOMAPPER_DECORATOR_NAME } from './constants';
import {
  getDecoratorOrUndefinedByNames,
  getTypeReferenceAsString,
  replaceImportPath,
} from './plugin-utils';

export class ModelVisitor {
  private static readonly metadataMap = new Map<
    string,
    Record<string, unknown>
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

    function visitor(ctx: TransformationContext, sf: SourceFile): Visitor {
      const _visitor: Visitor = (node) => {
        if (isImportDeclaration(node)) {
          ModelVisitor.importsMap.set(
            (node.moduleSpecifier as StringLiteral).text,
            ModelVisitor.cloneImportDeclaration(ctx.factory, node)
          );
          return node;
        }

        if (isClassDeclaration(node)) {
          node = visitEachChild(node, _visitor, ctx);
          return ModelVisitor.addMetadataFactory(
            node as ClassDeclaration,
            ctx.factory
          );
        }

        if (isPropertyDeclaration(node) || isGetAccessorDeclaration(node)) {
          const decorators = node.decorators;
          const existingAutoMapDecorator = getDecoratorOrUndefinedByNames(
            [AUTOMAPPER_DECORATOR_NAME],
            ctx.factory,
            decorators
          );

          if (existingAutoMapDecorator) {
            return node;
          }

          const isPropertyStaticOrPrivate = (node.modifiers || []).some(
            (modifier) =>
              modifier.kind === SyntaxKind.StaticKeyword ||
              modifier.kind === SyntaxKind.PrivateKeyword
          );

          if (isPropertyStaticOrPrivate) {
            return node;
          }

          if (node['jsDoc']) {
            const ignoreTag = getAllJSDocTags(
              node['jsDoc'],
              (tag): tag is JSDocTag =>
                tag.tagName.escapedText === 'autoMapIgnore'
            );
            if (ignoreTag) {
              return node;
            }
          }

          ModelVisitor.inspectNode(
            ctx.factory,
            node,
            typeChecker,
            ctx.factory.createNodeArray(),
            sf
          );
          return node;
        }

        return visitEachChild(node, _visitor, ctx);
      };

      return _visitor;
    }

    const _sourceFile = visitNode(sourceFile, visitor(context, sourceFile));

    if (ModelVisitor.isCommonJS) {
      return _sourceFile;
    }

    return context.factory.updateSourceFile(
      _sourceFile,
      ([...ModelVisitor.importsMap.values()] as Statement[]).concat(
        (_sourceFile.statements || ([] as Statement[])).filter(
          (statement) => statement.kind !== SyntaxKind.ImportDeclaration
        )
      ),
      _sourceFile.isDeclarationFile,
      _sourceFile.referencedFiles,
      _sourceFile.typeReferenceDirectives,
      _sourceFile.hasNoDefaultLib,
      _sourceFile.libReferenceDirectives
    );
  }

  private static addMetadataFactory(
    classNode: ClassDeclaration,
    factory: NodeFactory
  ): ClassDeclaration {
    const classMetadata = this.getClassMetadata(classNode);
    if (!classMetadata) {
      return classNode;
    }
    const returnValue = factory.createArrayLiteralExpression(
      Object.entries(classMetadata).reduce((expressions, [key, val]) => {
        if (val) {
          expressions.push(
            factory.createArrayLiteralExpression([
              factory.createStringLiteral(key),
              factory.createObjectLiteralExpression(
                ModelVisitor.getMetadataObjectLiteralExpression(
                  factory,
                  (val as PropertyAssignment).initializer as ArrowFunction
                )
              ),
            ])
          );
        }

        return expressions;
      }, [])
    );
    const method = factory.createMethodDeclaration(
      undefined,
      [factory.createModifier(SyntaxKind.StaticKeyword)],
      undefined,
      factory.createIdentifier(AUTOMAPPER_METADATA_FACTORY_KEY),
      undefined,
      undefined,
      [],
      undefined,
      factory.createBlock([factory.createReturnStatement(returnValue)], true)
    );

    return factory.updateClassDeclaration(
      classNode,
      classNode.decorators,
      classNode.modifiers,
      classNode.name,
      classNode.typeParameters,
      classNode.heritageClauses,
      [...classNode.members, method]
    );
  }

  private static getMetadataObjectLiteralExpression(
    factory: NodeFactory,
    arrowFn: ArrowFunction
  ) {
    const properties: PropertyAssignment[] = [
      factory.createPropertyAssignment('typeFn', arrowFn),
    ];

    const arrowFnBodyText = (arrowFn.body as Identifier)?.text;

    if (
      arrowFnBodyText &&
      (arrowFnBodyText === String.name ||
        arrowFnBodyText === Number.name ||
        arrowFnBodyText === Boolean.name ||
        arrowFnBodyText === Date.name ||
        arrowFnBodyText === 'null')
    ) {
      return properties;
    }

    return properties.concat(
      factory.createPropertyAssignment('depth', factory.createNumericLiteral(0))
    );
  }

  private static getClassMetadata(
    classNode: ClassDeclaration
  ): Record<string, unknown> {
    if (!classNode.name) {
      return;
    }
    return this.metadataMap.get(classNode.name.getText());
  }

  private static addClassMetadata(
    propertyNode: PropertyDeclaration | GetAccessorDeclaration,
    objectLiteral: ObjectLiteralExpression,
    sourceFile: SourceFile
  ): void {
    const hostClass = propertyNode.parent;
    const className = (hostClass as ClassDeclaration).name?.getText();
    if (!className) {
      return;
    }

    const existingMetadata = this.metadataMap.get(className) || {};
    const propertyName = propertyNode.name?.getText(sourceFile);
    if (
      !propertyName ||
      (propertyNode.name &&
        propertyNode.name.kind === SyntaxKind.ComputedPropertyName)
    ) {
      return;
    }

    this.metadataMap.set(className, {
      ...existingMetadata,
      [propertyName]: objectLiteral.properties[0],
    });
  }

  private static inspectNode(
    factory: NodeFactory,
    node: PropertyDeclaration | GetAccessorDeclaration,
    typeChecker: TypeChecker,
    existingProperties: NodeArray<PropertyAssignment> = factory.createNodeArray<PropertyAssignment>(),
    sourceFile: SourceFile
  ): void {
    const properties = [
      ...existingProperties,
      ModelVisitor.createPropertyAssignment(
        node,
        typeChecker,
        existingProperties,
        sourceFile.fileName,
        factory
      ),
    ];
    const objectLiteral = factory.createObjectLiteralExpression(
      properties
        .reduce((a, b) => a.concat(b), [] as PropertyAssignment[])
        .filter(Boolean)
    );
    this.addClassMetadata(node, objectLiteral, sourceFile);
  }

  private static createPropertyAssignment(
    node: PropertyDeclaration | GetAccessorDeclaration,
    typeChecker: TypeChecker,
    existingProperties: NodeArray<PropertyAssignment>,
    hostFileName: string,
    factory: NodeFactory
  ): PropertyAssignment | undefined {
    const key = node.name?.getText();
    if (!key || hasPropertyKey(key, existingProperties)) {
      return undefined;
    }

    let type = typeChecker.getTypeAtLocation(node);
    if (!type) {
      return undefined;
    }

    if (isNullableUnionType(type)) {
      type = type.getNonNullableType();
    }

    if (this.shouldCreateNullNode(type, typeChecker, node)) {
      return factory.createPropertyAssignment(
        key,
        factory.createArrowFunction(
          undefined,
          undefined,
          [],
          undefined,
          undefined,
          factory.createNull()
        )
      );
    }

    let typeReference = getTypeReferenceAsString(type, typeChecker);

    if (!typeReference) {
      typeReference = this.tryGetTypeReferenceFromNodeType(node);
    }

    if (!typeReference) {
      return undefined;
    }

    if (typeReference.includes('import')) {
      if (ModelVisitor.isCommonJS) {
        typeReference = replaceImportPath(typeReference, hostFileName);
      } else {
        typeReference = typeReference.split('.').pop();
      }
    }

    return this.createArrowFunctionWithTypeReference(
      factory,
      key,
      typeReference
    );
  }

  private static tryGetTypeReferenceFromNodeType(
    node: PropertyDeclaration | GetAccessorDeclaration
  ): string | undefined {
    return ((node.type as TypeReferenceNode).typeName as Identifier)
      ?.escapedText as string;
  }

  private static createArrowFunctionWithTypeReference(
    factory: NodeFactory,
    key: string,
    typeReference: string
  ): PropertyAssignment {
    return factory.createPropertyAssignment(
      key,
      factory.createArrowFunction(
        undefined,
        undefined,
        [],
        undefined,
        undefined,
        factory.createIdentifier(typeReference)
      )
    );
  }

  private static cloneImportDeclaration(
    factory: NodeFactory,
    importDeclaration: ImportDeclaration
  ) {
    return factory.createImportDeclaration(
      importDeclaration.decorators,
      importDeclaration.modifiers,
      importDeclaration.importClause,
      importDeclaration.moduleSpecifier
    );
  }

  private static shouldCreateNullNode(
    type: Type,
    typeChecker: TypeChecker,
    node: PropertyDeclaration | GetAccessorDeclaration
  ): boolean {
    return isTypeLiteral(type) || isAnyType(type, typeChecker, node);
  }
}
