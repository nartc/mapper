import type { ClassIdentifier } from '@automapper/core';
import { AutoMapperLogger } from '@automapper/core';
import 'reflect-metadata';
import { AUTOMAP_PROPERTIES_METADATA_KEY } from './keys';

export interface AutoMapOptions {
    /**
     * Type Function
     */
    type?: () => ClassIdentifier | [ClassIdentifier];
    /**
     * Depth for nested models. Default to 1
     */
    depth?: number;
    /**
     * Is this property getter-only?
     */
    isGetterOnly?: boolean;
}

export function AutoMap(): PropertyDecorator;
export function AutoMap(
    typeFn: () => ClassIdentifier | [ClassIdentifier]
): PropertyDecorator;
export function AutoMap(options: AutoMapOptions): PropertyDecorator;
export function AutoMap(
    typeFnOrOptions?:
        | (() => ClassIdentifier | [ClassIdentifier])
        | AutoMapOptions
): PropertyDecorator {
    const options = getAutoMapOptions(typeFnOrOptions);
    return (target, propertyKey) => {
        if (!options.type) {
            const designTypeMeta = Reflect.getMetadata(
                'design:type',
                target,
                propertyKey
            );
            // only store design:type metadata if it's not Array or Object
            if (
                designTypeMeta &&
                designTypeMeta !== Array &&
                designTypeMeta !== Object
            ) {
                options.type = () => designTypeMeta;
            }
        }

        // if typeFn is still null/undefined, fail fast;
        if (options.type == null) {
            if (AutoMapperLogger.warn) {
                AutoMapperLogger.warn(`
Cannot determine type metadata of "${String(propertyKey)}" on class ${
                    target.constructor.name
                }.
"${String(propertyKey)}" metadata has been skipped.
Manually provide the "type" metadata to prevent unexpected behavior.
`);
            }
            return;
        }

        if (!options.isGetterOnly) {
            // paramtypes gives information about the setter.
            // it will be null if this is not a getter
            // it will be an [] if this is an getter-only
            const designParamsType = Reflect.getMetadata(
                'design:paramtypes',
                target,
                propertyKey
            );
            options.isGetterOnly =
                designParamsType && !(designParamsType as []).length;
        }

        // Push onto the class's OWN metadata list — O(1) per decorator instead of
        // spreading the whole accumulated array each time (was O(P^2) per class).
        // The own list is seeded once from inherited metadata via slice(), so a
        // subclass keeps its parent's entries WITHOUT mutating the parent's array.
        const ctor = target.constructor;
        let metadataList = Reflect.getOwnMetadata(
            AUTOMAP_PROPERTIES_METADATA_KEY,
            ctor
        );
        if (!metadataList) {
            metadataList = (
                Reflect.getMetadata(AUTOMAP_PROPERTIES_METADATA_KEY, ctor) || []
            ).slice();
            Reflect.defineMetadata(
                AUTOMAP_PROPERTIES_METADATA_KEY,
                metadataList,
                ctor
            );
        }
        metadataList.push([propertyKey, options]);
    };
}

function getAutoMapOptions(
    typeFnOrOptions?:
        | (() => ClassIdentifier | [ClassIdentifier])
        | AutoMapOptions
): AutoMapOptions {
    if (typeFnOrOptions === undefined) {
        return { depth: 1, isGetterOnly: undefined, type: undefined };
    }

    if (typeof typeFnOrOptions === 'function') {
        return { depth: 1, isGetterOnly: undefined, type: typeFnOrOptions };
    }

    return typeFnOrOptions;
}
