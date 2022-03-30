import type {
    AnyConstructor,
    Constructor,
    Dictionary,
    ModelIdentifier,
} from '@automapper/core';

export type PojoMetadata =
    | Exclude<ModelIdentifier, Constructor>
    | AnyConstructor;

export class PojosMetadataMap {
    private static metadataStorage: Map<
        symbol,
        [
            key: string,
            metadata: {
                type: () => PojoMetadata | [PojoMetadata];
                depth: number;
            }
        ][]
    > = new Map();

    static reset() {
        this.metadataStorage = new Map();
    }

    static create<TModel extends Dictionary<TModel>>(
        identifier: string | symbol,
        metadata: {
            [key in keyof TModel]?:
                | PojoMetadata
                | [PojoMetadata]
                | { type: PojoMetadata | [PojoMetadata]; depth: number };
        } = {}
    ) {
        const symbolIdentifier =
            typeof identifier === 'string'
                ? Symbol.for(identifier)
                : identifier;

        const metadataEntries = Object.entries(metadata);
        if (!metadataEntries.length) return;

        for (let i = 0, length = metadataEntries.length; i < length; i++) {
            const [metadataKey, pojoMetadata] = metadataEntries[i];
            const normalizedMetadata = this.normalizePojoMetadata(pojoMetadata);
            if (!this.metadataStorage.has(symbolIdentifier)) {
                this.metadataStorage.set(symbolIdentifier, []);
            }

            this.metadataStorage
                .get(symbolIdentifier)
                ?.push([metadataKey, normalizedMetadata]);
        }
    }

    static retrieve(identifier: symbol): [
        string,
        {
            type: () => PojoMetadata;
            isArray: boolean;
            depth: number;
            isGetterOnly?: boolean;
        }
    ][] {
        const identifierMetadata = this.metadataStorage.get(identifier);
        if (!identifierMetadata) return [];

        return identifierMetadata.map(([key, { type, depth }]) => {
            const meta = type();
            const isArray = Array.isArray(meta);
            return [
                key,
                {
                    type: isArray ? () => meta[0] : () => meta,
                    isArray,
                    depth,
                },
            ];
        });
    }

    private static normalizePojoMetadata(pojoMetadata: unknown): {
        type: () => PojoMetadata | [PojoMetadata];
        depth: number;
    } {
        if (
            typeof pojoMetadata === 'string' ||
            typeof pojoMetadata === 'symbol' ||
            typeof pojoMetadata === 'function' ||
            Array.isArray(pojoMetadata)
        ) {
            return {
                type: () =>
                    this.toSymbol(
                        pojoMetadata as PojoMetadata | [PojoMetadata]
                    ),
                depth: 1,
            };
        }

        const metadata = pojoMetadata as {
            type: PojoMetadata | [PojoMetadata];
            depth: number;
        };

        metadata.type = this.toSymbol(metadata.type);

        return {
            type: () => metadata.type,
            depth: metadata.depth,
        };
    }

    private static toSymbol(
        metadata: PojoMetadata | [PojoMetadata]
    ): PojoMetadata | [PojoMetadata] {
        if (typeof metadata === 'string') {
            return Symbol.for(metadata);
        }

        if (Array.isArray(metadata) && typeof metadata[0] === 'string') {
            return Symbol.for(metadata[0]);
        }

        return metadata;
    }
}
