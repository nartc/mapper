import { getMemberPath } from '../../getMemberPath';

export const mockedGetMemberPath = getMemberPath as jest.Mock<
  ReturnType<typeof getMemberPath>
>;
