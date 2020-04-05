---
id: flattening
title: Flattening
sidebar_label: Flattening
---

One particular use-case for an `AutoMapper` is to **flatten** complex objects into a simpler form. `@nartc/automapper` supports this feature at a basic level.

```typescript
class Address {
  @AutoMap()
  street: string;
  @AutoMap()
  city: string;
  @AutoMap()
  state: string;
}

class Company {
  @AutoMap()
  name: string;
  @AutoMap()
  description: string;
  @AutoMap()
  yearEstablished: number;
  @AutoMap(() => Address)
  address: Address;
}

class CompanyVm {
  @AutoMap()
  name: string;
  @AutoMap()
  description: string;
  @AutoMap()
  addressStreet: string;
}

Mapper.createMap(Company, CompanyVm);
```

Here, all `CompanyVm.name`, `CompanyVm.description` and `CompanyVm.addressStreet` will be **auto-configured**.
If you notice, you'll see that `CompanyVm.addressStreet` conventionally matches the path `Company.address.street` and `@nartc/automapper` can take advantage of that to **automap** `CompanyVm.addressStreet` from `Company.address.street`.

```typescript
const company = new Company();
company.name = 'ACME';
company.description = 'Consulting';
company.yearEstablished = 2010;
company.address = new Address();
company.address.street = '123 Sesame St';
company.address.city = 'foo';
company.address.state = 'bar';

const vm = Mapper.map(company, CompanyVm);
/**
 * CompanyVm { name: 'ACME', description: 'Consulting', addressStreet: '123 Sesame St' }
 */
```

> If you run into issue with **Flattening**, please check out how to customize the mapping configuration with [ForMember](usages/mapping-configuration/for-member/basic.md)
