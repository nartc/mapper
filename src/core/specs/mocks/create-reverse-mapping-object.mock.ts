import { createReverseMappingObject } from '../../create-reverse-mapping-object';

export const mockedCreateReverseMappingObject = createReverseMappingObject as jest.Mock<
  ReturnType<typeof createReverseMappingObject>
>;
