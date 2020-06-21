import { getMemberPath } from '../../getMemberPath';

export const mockedGetMemberPath = <
  jest.Mock<ReturnType<typeof getMemberPath>>
>getMemberPath;
