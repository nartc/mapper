---
title: Create mappings
description: Register nested and top-level mappings, then map a source object to its destination type.
---

Create mappings once during application startup. Register a nested mapping before a mapping that depends on it.

```ts title="src/mappings/register.ts"
import { createMap } from '@automapper/core';
import { mapper } from './mapper';
import { Bio, User } from '../models/user';
import { BioDto, UserDto } from '../models/user.dto';

createMap(mapper, Bio, BioDto);
createMap(mapper, User, UserDto);
```

`createMap(mapper, Source, Destination)` registers and returns a unidirectional mapping. Register the reverse direction separately if you need it.

## Execute the mapping

```ts
const dto = mapper.map(user, User, UserDto);
```

Matching metadata maps automatically:

- `firstName`, `lastName`, and `username` copy by name;
- `password` is not part of destination metadata;
- `bio` uses the registered `Bio` to `BioDto` mapping.

Three differences remain:

- `fullName` is computed;
- `birthday` changes from `Date` to `string`;
- `jobTitle` and `jobSalary` flatten values from `job`.

The next page configures those differences.
