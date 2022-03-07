import type { Constructor } from '@automapper/core';
import 'reflect-metadata';
import {
    AUTOMAP_PROPERTIES_METADATA_KEY,
    AUTOMAPPER_METADATA_FACTORY_KEY,
} from './keys';

type MetadataList = Array<
    [
        string,
        {
            type: () => Constructor | [Constructor];
            depth: number;
            isGetterOnly?: boolean;
        }
    ]
>;

export function getMetadataList(model: Constructor): [
    string,
    {
        type: () => Constructor;
        isArray: boolean;
        depth: number;
        isGetterOnly?: boolean;
    }
][] {
    let metadataList: MetadataList = (
        model.constructor?.prototype
            ? Reflect.getMetadata(
                  AUTOMAP_PROPERTIES_METADATA_KEY,
                  model.constructor.prototype
              ) || []
            : []
    ).concat(Reflect.getMetadata(AUTOMAP_PROPERTIES_METADATA_KEY, model) || []);

    const metadataFactoryFn = model[AUTOMAPPER_METADATA_FACTORY_KEY];
    if (metadataFactoryFn) {
        metadataList = metadataList.concat(
            metadataFactoryFn() || ([] as MetadataList)
        );
    }
    return metadataList.map(([propertyKey, { type, depth, isGetterOnly }]) => {
        const meta = type();
        const isArray = Array.isArray(meta);
        return [
            propertyKey,
            {
                type: isArray ? () => meta[0] : () => meta,
                depth,
                isGetterOnly,
                isArray,
            },
        ];
    });
}
