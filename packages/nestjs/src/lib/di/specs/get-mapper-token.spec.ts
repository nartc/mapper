import { DEFAULT_MAPPER_TOKEN, getMapperToken } from '@automapper/nestjs';

describe('getMapperToken', () => {
  it('should return properly', () => {
    expect(getMapperToken()).toEqual(DEFAULT_MAPPER_TOKEN);
    expect(getMapperToken('name')).toEqual('automapper:nestjs:name');
  });
});
