import { setupMikro } from '../setup.spec';
import { Foo, FooDto } from './fixtures/models/foo';
import { simpleFooProfile } from './fixtures/profiles/foo.profile';

describe('map', () => {
  const [mapper] = setupMikro('foo');

  it('should map properly', () => {
    mapper.addProfile(simpleFooProfile);

    const foo = new Foo();
    foo.foo = 'foo';

    const dto = mapper.map(foo, FooDto, Foo);
    expect(dto).toBeTruthy();
  });
});
