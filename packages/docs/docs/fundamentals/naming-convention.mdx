---
title: Naming conventions
description: Match differently cased properties and flatten nested source paths into destination names.
---

Naming conventions let AutoMapper compare differently cased property names and enable auto-flattening. AutoMapper includes:

- `CamelCaseNamingConvention`;
- `PascalCaseNamingConvention`;
- `SnakeCaseNamingConvention`.

No convention is enabled by default.

## Mapper-wide convention

```ts
const mapper = createMapper({
  strategyInitializer: classes(),
  namingConventions: new CamelCaseNamingConvention(),
});
```

## Mapping or profile convention

```ts
createMap(
  mapper,
  User,
  UserDto,
  namingConventions(new CamelCaseNamingConvention()),
);

addProfile(
  mapper,
  userProfile,
  namingConventions(new CamelCaseNamingConvention()),
);
```

## Different source and destination conventions

```ts
const mapper = createMapper({
  strategyInitializer: classes(),
  namingConventions: {
    source: new PascalCaseNamingConvention(),
    destination: new CamelCaseNamingConvention(),
  },
});
```

## Auto-flattening

Auto-flattening matches a destination name against a path through the source model. The configured naming convention determines how the destination name is split.

```ts
class Customer {
  @AutoMap()
  name!: string;
}

class Order {
  @AutoMap(() => Customer)
  customer!: Customer;

  @AutoMap()
  total!: number;
}

class OrderDto {
  @AutoMap()
  customerName!: string;

  @AutoMap()
  total!: number;
}
```

With camel case enabled, `customerName` splits into `customer` and `name`, so it maps from `order.customer.name`:

```ts
const mapper = createMapper({
  strategyInitializer: classes(),
  namingConventions: new CamelCaseNamingConvention(),
});

createMap(mapper, Order, OrderDto);

const dto = mapper.map(order, Order, OrderDto);
// { customerName: 'Chau Tran', total: 50 }
```

Use `forMember()` with `mapFrom()` when a flattened name is ambiguous or does not follow the configured convention.
