import { initializeMappingProps } from '../../initialize-mapping-props';

export const mockedInitializeMappingProps = initializeMappingProps as jest.Mock<
  ReturnType<typeof initializeMappingProps>
>;
