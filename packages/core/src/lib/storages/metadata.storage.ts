/**
 * Internal MetadataStorage
 *
 * One and only one instance of MetadataStorage at any given time
 * A MetadataStorage will store all information about metadata
 * of all models inside of an application.
 *
 * @private
 */
class MetadataStorage {
  private storage = new WeakMap();
}

export const metadataStorage = new MetadataStorage();
