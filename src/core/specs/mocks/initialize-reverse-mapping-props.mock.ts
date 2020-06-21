import { initializeReverseMappingProps } from '../../initialize-reverse-mapping-props';

export const mockedInitializeReverseMappingProps = initializeReverseMappingProps as jest.Mock<
  ReturnType<typeof initializeReverseMappingProps>
>;
