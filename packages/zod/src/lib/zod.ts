import type {
    MappingStrategyInitializer,
    MappingStrategyInitializerOptions,
} from '@automapper/core';
import { PojosMetadataMap, pojos } from '@automapper/pojos';

/**
 * Mapping strategy for Zod-inferred values. Zod output is structurally a plain
 * object, so this is the `pojos` strategy. Pair it with {@link createMetadataMap}
 * to derive AutoMapper metadata directly from a Zod schema instead of writing it
 * out by hand.
 *
 * @example
 * ```ts
 * const User = z.object({ name: z.string(), age: z.number() });
 * const UserDto = z.object({ name: z.string(), age: z.number() });
 * createMetadataMap('User', User);
 * createMetadataMap('UserDto', UserDto);
 * const mapper = createMapper({ strategyInitializer: zod() });
 * createMap(mapper, 'User', 'UserDto');
 * ```
 */
export function zod(
    options: MappingStrategyInitializerOptions = {}
): MappingStrategyInitializer<symbol> {
    return pojos(options);
}

// --- Zod 4 introspection ---------------------------------------------------
// Zod 4 exposes a schema's definition at `_zod.def` (with a plain `.def` kept as
// a fallback across 4.x). We only read `type`, `element`, `innerType`, `shape`.
interface ZodDef {
    type: string;
    element?: ZodSchemaLike;
    innerType?: ZodSchemaLike;
    shape?: Record<string, ZodSchemaLike>;
}

interface ZodSchemaLike {
    _zod?: { def?: ZodDef };
    def?: ZodDef;
    shape?: Record<string, ZodSchemaLike>;
}

type DerivedType =
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | DateConstructor
    | BigIntConstructor
    | string // nested object identifier
    | [DerivedType]; // array element

function defOf(schema: ZodSchemaLike): ZodDef | undefined {
    return schema?._zod?.def ?? schema?.def;
}

function shapeOf(
    schema: ZodSchemaLike
): Record<string, ZodSchemaLike> | undefined {
    return schema?.shape ?? defOf(schema)?.shape;
}

function deriveType(
    schema: ZodSchemaLike,
    parentIdentifier: string,
    key: string
): DerivedType | undefined {
    const def = defOf(schema);
    if (!def) return undefined;

    switch (def.type) {
        case 'string':
        case 'enum':
        case 'literal':
            return String;
        case 'number':
            return Number;
        case 'boolean':
            return Boolean;
        case 'date':
            return Date;
        case 'bigint':
            return BigInt;
        case 'array': {
            if (!def.element) return undefined;
            const element = deriveType(def.element, parentIdentifier, key);
            return element === undefined ? undefined : [element];
        }
        case 'object': {
            // Register the nested schema under a derived identifier, point at it.
            const nestedIdentifier = `${parentIdentifier}.${key}`;
            createMetadataMap(nestedIdentifier, schema);
            return nestedIdentifier;
        }
        // Wrapper types just unwrap to their inner schema.
        case 'optional':
        case 'nullable':
        case 'default':
        case 'readonly':
        case 'catch':
        case 'nonoptional':
            return def.innerType
                ? deriveType(def.innerType, parentIdentifier, key)
                : undefined;
        default:
            // Unsupported types (union, record, etc.) are skipped — configure
            // those members explicitly with forMember if needed.
            return undefined;
    }
}

/**
 * Introspects a Zod object `schema` and registers the equivalent AutoMapper
 * metadata under `identifier`, recursing into nested object schemas. After this,
 * the schema's inferred type can be used as a map source/destination with the
 * {@link zod} strategy.
 */
export function createMetadataMap(
    identifier: string,
    schema: ZodSchemaLike
): void {
    const shape = shapeOf(schema);
    if (!shape) return;

    const metadata: Record<string, DerivedType> = {};
    for (const key of Object.keys(shape)) {
        const derived = deriveType(shape[key], identifier, key);
        if (derived !== undefined) {
            metadata[key] = derived;
        }
    }

    PojosMetadataMap.create(
        identifier,
        metadata as Parameters<typeof PojosMetadataMap.create>[1]
    );
}
