import { getMappingForDestination } from '../../get-mapping-for-destination';

export const mockedGetMappingForDestination = getMappingForDestination as jest.Mock<
  ReturnType<typeof getMappingForDestination>
>;
