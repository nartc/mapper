import { createReverseMapFluentFunction } from '../../create-reverse-map-fluent-function';

export const mockedCreateReverseMapFluentFunction = createReverseMapFluentFunction as jest.Mock<
  ReturnType<typeof createReverseMapFluentFunction>
>;
