import { setupClasses } from '../setup.spec';
import { CamelCaseNamingConvention } from '@automapper/core';
import { issue396Profile } from './fixtures/profiles/issue-396.profile';
import {
  DestinationChild,
  NestedOptionalClass,
  SourceChild,
} from './fixtures/models/issue-396';

describe('Issue 396', () => {
  const [mapper] = setupClasses('issue-396', new CamelCaseNamingConvention());

  it('should map', () => {
    mapper.addProfile(issue396Profile);

    const options = new NestedOptionalClass();
    options.name = 'name';

    const input1 = new SourceChild();
    input1.description = 'description';
    input1.options = options;

    const output1 = mapper.map(input1, DestinationChild, SourceChild);
    expect(output1).toBeTruthy();

    const input2 = new SourceChild();
    input2.description = 'description 2';

    const output2 = mapper.map(input2, DestinationChild, SourceChild);
    expect(output2).toBeTruthy();
  });
});
