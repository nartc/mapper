import { AutoMapperStorage } from '@automapper/models';

export interface AutoMapperPlugin<TMappingKey> {
  createMap(
    storage: AutoMapperStorage<'mapping'>,
    sourceKey: TMappingKey,
    destinationKey: TMappingKey
  );
}
