import { createMapForMember } from '../../create-map-for-member';

export const mockedCreateMapForMember = createMapForMember as jest.Mock<
  ReturnType<typeof createMapForMember>
>;
