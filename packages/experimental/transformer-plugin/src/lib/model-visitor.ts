import { AUTOMAPPER_METADATA_FACTORY_KEY } from '@automapper/classes';
import * as tss from 'typescript/lib/tsserverlibrary';
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
  private readonly metadataMap = new Map<string, Record<string, unknown>>();

  reset() {
    this.metadataMap.clear();
  }

  visit(
    sourceFile: tss.SourceFile,
    context: tss.TransformationContext,
    program: tss.Program
  ): tss.SourceFile {
    const typeChecker = program.getTypeChecker();

    function visitor(
      modelVisitor: ModelVisitor,
      ctx: tss.TransformationContext,
      sf: tss.SourceFile
    ): tss.Visitor {
      const _visitor: tss.Visitor = (node) => {
        if (tss.isClassDeclaration(node)) {
          node = tss.visitEachChild(node, _visitor, ctx);
          return modelVisitor.addMetadataFactory(
            node as tss.ClassDeclaration,
            ctx.factory
          );
        }

        if (tss.isPropertyDeclaration(node) || tss.isGetAccessor(node)) {
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
              modifier.kind === tss.SyntaxKind.StaticKeyword ||
              modifier.kind === tss.SyntaxKind.PrivateKeyword
          );

          if (isPropertyStaticOrPrivate) {
            return node;
          }

          modelVisitor.inspectNode(
            ctx.factory,
            node,
            typeChecker,
            ctx.factory.createNodeArray(),
            sf
          );
          return node;
        }

        return tss.visitEachChild(node, _visitor, ctx);
      };

      return _visitor;
    }

    return tss.visitNode(sourceFile, visitor(this, context, sourceFile));
  }

  private addMetadataFactory(
    classNode: tss.ClassDeclaration,
    factory: tss.NodeFactory
  ): tss.ClassDeclaration {
    const classMetadata = this.getClassMetadata(classNode);
    if (!classMetadata) {
      return classNode;
    }
    const returnValue = factory.createArrayLiteralExpression(
      Object.entries(classMetadata).map(([key, val]) =>
        factory.createArrayLiteralExpression([
          factory.createStringLiteral(key),
          factory.createObjectLiteralExpression(
            ModelVisitor.getMetadataObjectLiteralExpression(
              factory,
              (val as tss.PropertyAssignment).initializer as tss.ArrowFunction
            )
          ),
        ])
      )
    );
    const method = factory.createMethodDeclaration(
      undefined,
      [factory.createModifier(tss.SyntaxKind.StaticKeyword)],
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
    factory: tss.NodeFactory,
    arrowFn: tss.ArrowFunction
  ) {
    const properties: tss.PropertyAssignment[] = [
      factory.createPropertyAssignment('typeFn', arrowFn),
    ];

    const arrowFnBodyText = (arrowFn.body as tss.Identifier)?.text;

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

  private getClassMetadata(classNode: tss.ClassDeclaration): unknown {
    if (!classNode.name) {
      return;
    }
    return this.metadataMap.get(classNode.name.getText());
  }

  private addClassMetadata(
    propertyNode: tss.PropertyDeclaration | tss.GetAccessorDeclaration,
    objectLiteral: tss.ObjectLiteralExpression,
    sourceFile: tss.SourceFile
  ): void {
    const hostClass = propertyNode.parent;
    const className = (hostClass as tss.ClassDeclaration).name?.getText();
    if (!className) {
      return;
    }

    const existingMetadata = this.metadataMap.get(className) || {};
    const propertyName = propertyNode.name?.getText(sourceFile);
    if (
      !propertyName ||
      (propertyNode.name &&
        propertyNode.name.kind === tss.SyntaxKind.ComputedPropertyName)
    ) {
      return;
    }

    this.metadataMap.set(className, {
      ...existingMetadata,
      [propertyName]: objectLiteral.properties[0],
    });
  }

  private inspectNode(
    factory: tss.NodeFactory,
    node: tss.PropertyDeclaration | tss.GetAccessorDeclaration,
    typeChecker: tss.TypeChecker,
    existingProperties: tss.NodeArray<tss.PropertyAssignment> = factory.createNodeArray<tss.PropertyAssignment>(),
    sourceFile: tss.SourceFile
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
        .reduce((a, b) => a.concat(b), [] as tss.PropertyAssignment[])
        .filter(Boolean)
    );
    this.addClassMetadata(node, objectLiteral, sourceFile);
  }

  private static createPropertyAssignment(
    node: tss.PropertyDeclaration | tss.GetAccessorDeclaration,
    typeChecker: tss.TypeChecker,
    existingProperties: tss.NodeArray<tss.PropertyAssignment>,
    hostFileName: string,
    factory: tss.NodeFactory
  ): tss.PropertyAssignment | undefined {
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
      return undefined;
    }

    typeReference = replaceImportPath(typeReference, hostFileName);
    return factory.createPropertyAssignment(
      key,
      factory.createArrowFunction(
        undefined,
        undefined,
        [],
        undefined,
        undefined,
        factory.createIdentifier(typeReference as string)
      )
    );
  }

  private static shouldCreateNullNode(
    type: tss.Type,
    typeChecker: tss.TypeChecker,
    node: tss.PropertyDeclaration | tss.GetAccessorDeclaration
  ): boolean {
    return isTypeLiteral(type) || isAnyType(type, typeChecker, node);
  }
}
