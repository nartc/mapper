# @automapper/classes

This is the official strategy from `@automapper` to work with TS/ES6 Class

## Installation

```sh
npm i @automapper/classes
```

or with `yarn`:

```sh
yarn add @automapper/classes
```

### `peerDependencies`

`@automapper/classes` depends on `@automapper/core` and `reflect-metadata`.

```sh
npm i @automapper/core reflect-metadata
```

or with `yarn`:

```sh
yarn add @automapper/core reflect-metadata
```

## Usage

`@automapper/classes` provides `classes` as a `MappingStrategyInitializer`. Pass `classes()` to `createMapper` to create
a `Mapper` that uses `classes` strategy.

```ts
import { classes, AutoMap } from '@automapper/classes';
import { createMapper, createMap, forMember, mapFrom } from '@automapper/core';

const mapper = createMapper({
  ...,
  strategyInitializer: classes()
});

class User {
    @AutoMap()
    firstName: string;
    @AutoMap()
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class UserDto {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  fullName: string;
}

createMap(
    mapper,
    User,
    UserDto,
    forMember(
        d => d.fullName,
        mapFrom(s => s.firstName + ' ' + s.lastName)
    )
);
mapper.map(new User('Auto', 'Mapper'), User, UserDto);
// UserDto { firstName: 'Auto', lastName: 'Mapper', fullName: 'Auto Mapper' }
```

## Customization

`classes()` accepts two optional parameters:

-   `destinationConstructor`: how to construct the `Destination`. This is the default `destinationConstructor` that will be used on `mapper.mapXXXX()` operations. `DestinationConstructor` is a function with the following signature:

    ```ts
    export type DestinationConstructor<
        TSource extends Dictionary<TSource> = any,
        TDestination extends Dictionary<TDestination> = any
    > = (
        sourceObject: TSource, // the sourceObject used to map to the Destination
        destinationIdentifier: MetadataIdentifier<TDestination> // the Destination model
    ) => TDestination;

    // example
    mapper.map(user, User, UserDto);
    // sourceObject will be "user"
    // destinationIdentifier will be "UserDto"
    // This allows you to provide a default constructor that can be based on the Source object data
    ```

    -   There is a way to provide one-off custom `destinationConstructor` to any given `Mapping` when you run `createMap`. Read more about [constructUsing](https://automapperts.netlify.app/docs/plugins-system/introduce-to-classes)

-   `applyMetadata`: how the strategy should apply the metadata to a model. The default should work for most cases but if you would like to customize this, you can. `ApplyMetadata` is a function with the following signature:

    ```ts
    export type ApplyMetadataFn = <TModel extends Dictionary<TModel>>(
        model: MetadataIdentifier<TModel>
    ) => TModel;

    export type ApplyMetadata = (
        strategy: MappingStrategy<MetadataIdentifier>
    ) => ApplyMetadataFn;

    // for example
    const customApplyMetadata: ApplyMetadata = (strategy: MappingStrategy) => {
        // strategy contains the Mapper which stores all the models' metadata
        return (model) => {
            // based on this model, you can extract the metadata and do as you like

            return anObjectThatHasTheMetadataApplied; // { foo: undefined, bar: undefined }
        };
    };
    ```

Read more about this strategy on [classes documentation](https://automapperts.netlify.app/docs/plugins-system/introduce-to-classes)
