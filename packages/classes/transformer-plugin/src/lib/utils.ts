import { dirname, posix } from 'path';
import {
    ArrayTypeNode,
    CallExpression,
    Decorator,
    EnumDeclaration,
    EnumMember,
    Identifier,
    isArrayTypeNode,
    isTypeNode,
    LeftHandSideExpression,
    Node,
    NodeArray,
    NodeBuilderFlags,
    NodeFactory,
    PropertyAccessExpression,
    SyntaxKind,
    Type,
    TypeChecker,
    TypeFlags,
    TypeFormatFlags,
    TypeNode,
    TypeReference,
} from 'typescript/lib/tsserverlibrary';

export function hasFlag(type: Type, flag: TypeFlags): boolean {
    return (type.flags & flag) === flag;
}

export function isFilenameMatched(
    patterns: string[],
    filename: string
): boolean {
    return patterns.some((path) => filename.includes(path));
}

export function isDynamicallyAdded(identifier: Node): boolean {
    return identifier && !identifier.parent && identifier.pos === -1;
}

export function isNullableUnionType(type: Type): boolean {
    return (
        type.isUnion() &&
        (type as unknown as { isNullableType: () => boolean }).isNullableType()
    );
}

export function isArrayType(type: Type): boolean {
    const symbol = type.getSymbol();
    if (!symbol) {
        return false;
    }
    return (
        symbol.getName() === 'Array' &&
        (type as TypeReference).typeArguments?.length === 1
    );
}

export function isBoolean(type: Type): boolean {
    return (
        hasFlag(type, TypeFlags.Boolean) ||
        (type.isUnionOrIntersection() &&
            type.types[0].flags === TypeFlags.BooleanLiteral)
    );
}

export function isEnumType(type: Type): boolean {
    if (hasFlag(type, TypeFlags.Enum)) {
        return true;
    }

    if (hasFlag(type, TypeFlags.EnumLiteral) && !type.isUnion()) return false;

    const symbol = type.getSymbol();
    if (symbol == null) {
        return false;
    }
    const { valueDeclaration } = symbol;
    return (
        valueDeclaration != null &&
        valueDeclaration.kind === SyntaxKind.EnumDeclaration
    );
}

export function isNumber(type: Type) {
    return hasFlag(type, TypeFlags.Number);
}

export function isNumberEnum(type: Type): boolean {
    const isEnum = isEnumType(type);
    const valueDeclaration = type.getSymbol()
        ?.valueDeclaration as EnumDeclaration;

    return (
        (isEnum &&
            valueDeclaration?.members?.some(
                (member: EnumMember) => member.initializer == null
            )) ||
        false
    );
}

export function isString(type: Type): boolean {
    return hasFlag(type, TypeFlags.String);
}

export function isStringEnum(type: Type): boolean {
    const isEnum = isEnumType(type);
    const valueDeclaration = type.getSymbol()
        ?.valueDeclaration as EnumDeclaration;

    return (
        (isEnum &&
            valueDeclaration?.members?.some(
                (member: EnumMember) => member.initializer != null
            )) ||
        false
    );
}

export function isDate(type: Type) {
    return type.symbol && type.symbol.escapedName === 'Date';
}

export function getDecoratorOrUndefinedByNames(
    names: string[],
    factory: NodeFactory,
    decorators?: NodeArray<Decorator>
): Decorator | undefined {
    return (decorators || factory.createNodeArray()).find((item) =>
        names.includes(getDecoratorName(item) as string)
    );
}

export function getDecoratorName(decorator: Decorator): string | undefined {
    const isDecoratorFactory =
        decorator.expression.kind === SyntaxKind.CallExpression;
    if (isDecoratorFactory) {
        const callExpression = decorator.expression;
        const expression = (callExpression as CallExpression).expression;
        const identifier = expression as Identifier;
        if (isDynamicallyAdded(identifier)) {
            return undefined;
        }

        return getIdentifierFromExpression(expression).getText();
    }
    return getIdentifierFromExpression(decorator.expression).getText();
}

export function getNameFromExpression(
    expression: LeftHandSideExpression
): Identifier | LeftHandSideExpression {
    if (expression && expression.kind === SyntaxKind.PropertyAccessExpression) {
        return (expression as PropertyAccessExpression).name as Identifier;
    }
    return expression;
}

export function getIdentifierFromExpression(
    expression: LeftHandSideExpression
): Identifier {
    const identifier = getNameFromExpression(expression);
    if (identifier && identifier.kind !== SyntaxKind.Identifier) {
        throw new Error();
    }
    return identifier as Identifier;
}

export function getText(
    type: Type,
    typeChecker: TypeChecker,
    enclosingNode?: Node,
    typeFormatFlags?: TypeFormatFlags
): string {
    if (!typeFormatFlags) {
        typeFormatFlags = getDefaultTypeFormatFlags(enclosingNode);
    }
    const compilerNode = !enclosingNode ? undefined : enclosingNode;
    return typeChecker.typeToString(type, compilerNode, typeFormatFlags);
}

export function getDefaultTypeFormatFlags(enclosingNode?: Node): number {
    let formatFlags =
        TypeFormatFlags.UseTypeOfFunction |
        TypeFormatFlags.NoTruncation |
        TypeFormatFlags.UseFullyQualifiedType |
        TypeFormatFlags.WriteTypeArgumentsOfSignature;
    if (enclosingNode && enclosingNode.kind === SyntaxKind.TypeAliasDeclaration)
        formatFlags |= TypeFormatFlags.InTypeAlias;
    return formatFlags;
}

export function getTypeReference(
    type: Type,
    typeNode: TypeNode,
    typeChecker: TypeChecker,
    isArray = false
): [elementType: string | undefined, isArray: boolean] {
    if (isArrayType(type) || isArrayTypeNode(typeNode)) {
        const [arrayType] =
            (type as TypeReference).typeArguments ||
            ((typeNode as ArrayTypeNode).elementType
                ? [(typeNode as ArrayTypeNode).elementType]
                : []) ||
            [];
        const isArrayTypeNode = isTypeNode(arrayType as TypeNode);
        return getTypeReference(
            isArrayTypeNode
                ? typeChecker.getTypeAtLocation(arrayType as TypeNode)
                : (arrayType as Type),
            isArrayTypeNode
                ? (arrayType as TypeNode)
                : (typeChecker.typeToTypeNode(
                      arrayType as Type,
                      typeNode,
                      NodeBuilderFlags.NoTruncation
                  ) as TypeNode),
            typeChecker,
            true
        );
    }

    if (isBoolean(type)) {
        return [Boolean.name, isArray];
    }

    if (isNumber(type) || isNumberEnum(type)) {
        return [Number.name, isArray];
    }

    if (isString(type) || isStringEnum(type)) {
        return [String.name, isArray];
    }

    if (isDate(type)) {
        return [Date.name, isArray];
    }

    if (type.isClass()) {
        return [getText(type, typeChecker), isArray];
    }

    return [undefined, isArray];
}

export function replaceImportPath(
    typeReference: string,
    fileName: string
): string | undefined {
    let importPath = /\("([^)]).+(")/.exec(typeReference)?.[0];
    if (!importPath) {
        return undefined;
    }
    importPath = importPath.slice(2, importPath.length - 1);

    let relativePath = posix.relative(dirname(fileName), importPath);
    relativePath = relativePath[0] !== '.' ? './' + relativePath : relativePath;
    typeReference = typeReference.replace(importPath, relativePath);

    return typeReference.replace('import', 'require');
}
