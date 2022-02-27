import type { Constructible } from '@automapper/classes';
import {
  AUTOMAP_PROPERTIES_METADATA_KEY,
  getMetadataList,
} from '@automapper/classes';

export function inheritAutoMapMetadata(
  parentClass: Constructible,
  // eslint-disable-next-line @typescript-eslint/ban-types
  targetClass: Function,
  isPropertyInherited?: (key: string) => boolean
) {
  try {
    const parentClassMetadataList = getMetadataList(parentClass);
    if (!parentClassMetadataList.length) {
      return;
    }

    const existingMetadataList = getMetadataList(targetClass as Constructible);
    Reflect.defineMetadata(
      AUTOMAP_PROPERTIES_METADATA_KEY,
      [
        ...existingMetadataList,
        ...parentClassMetadataList.filter(
          ([propertyKey]) =>
            !isPropertyInherited || isPropertyInherited(propertyKey)
        ),
      ],
      targetClass
    );
  } catch (e) {
    console.error(e);
  }
}

export function inheritPropertyInitializers(
  target: Record<string, unknown>,
  sourceClass: Constructible,
  isPropertyInherited: (key: string) => boolean = () => true
) {
  try {
    const tempInstance = new sourceClass();
    const propertyNames = Object.getOwnPropertyNames(tempInstance);

    propertyNames
      .filter(
        (propertyName) =>
          typeof tempInstance[propertyName] !== 'undefined' &&
          typeof target[propertyName] === 'undefined'
      )
      .filter((propertyName) => isPropertyInherited(propertyName))
      .forEach((propertyName) => {
        target[propertyName] = tempInstance[propertyName];
      });
  } catch (e) {
    console.error('Error inheriting properties');
  }
}
