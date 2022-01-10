import { mapFrom, MappingProfile } from '@automapper/core';
import {
  Destination,
  DestinationChild,
  Source,
  SourceChild,
} from '../models/issue-396';

export const issue396Profile: MappingProfile = (mapper) => {
  mapper.createMap(Source, Destination).forMember(
    (d) => d.options,
    mapFrom((s) => s.options)
  );
  mapper.createMap(SourceChild, DestinationChild, {
    extends: [mapper.getMapping(Source, Destination)],
  });
};
