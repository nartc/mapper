import type { ClassIdentifier, MetadataIdentifier } from '@automapper/core';
import { isDateConstructor, isPrimitiveConstructor } from '@automapper/core';
import 'reflect-metadata';
import {
    AUTOMAP_PROPERTIES_METADATA_KEY,
    AUTOMAPPER_METADATA_FACTORY_KEY,
} from './keys';

type MetadataList = Array<
    [
        string,
        {
            type: () => ClassIdentifier | [ClassIdentifier];
            depth: number;
            isGetterOnly?: boolean;
        }
    ]
>;

export function getMetadataList(model: MetadataIdentifier): [
    metadataList: [
        string,
        {
            type: () => MetadataIdentifier;
            isArray: boolean;
            depth: number;
            isGetterOnly?: boolean;
        }
    ][],
    nestedConstructor: MetadataIdentifier[]
] {
    if (typeof model !== 'function') {
        return [[], []];
    }

    // `model` is a class (function); @AutoMap stores metadata on the class via
    // `target.constructor`, and Reflect.getMetadata walks the class's prototype
    // chain (so subclass inheritance is already covered). The old
    // `model.constructor.prototype` read was `Function.prototype` — never a
    // metadata target — so it always contributed []. `.concat()` keeps the
    // defensive copy (never hand out the stored array).
    let metadataList: MetadataList = (
        Reflect.getMetadata(AUTOMAP_PROPERTIES_METADATA_KEY, model) || []
    ).concat();

    const metadataFactoryFn = model[AUTOMAPPER_METADATA_FACTORY_KEY];
    if (metadataFactoryFn) {
        metadataList = metadataList.concat(
            metadataFactoryFn() || ([] as MetadataList)
        );
    }
    return metadataList.reduce(
        (result, [propertyKey, { type, depth, isGetterOnly }]) => {
            // can be [type] or type
            const meta = type();
            const isArray = Array.isArray(meta);

            const trueMeta = isArray ? meta[0] : meta;

            if (
                !isDateConstructor(trueMeta) &&
                !isPrimitiveConstructor(trueMeta)
            ) {
                result[1].push(trueMeta);
            }

            result[0].push([
                propertyKey,
                { type: () => trueMeta, depth, isGetterOnly, isArray },
            ]);

            return result;
        },
        [[], []] as [
            metadataList: [
                string,
                {
                    type: () => MetadataIdentifier;
                    isArray: boolean;
                    depth: number;
                    isGetterOnly?: boolean;
                }
            ][],
            nestedConstructor: MetadataIdentifier[]
        ]
    );
}
