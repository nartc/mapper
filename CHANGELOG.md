## [3.0.2](https://github.com/nartc/mapper/compare/3.0.1...3.0.2) (2021-02-19)

### Bug Fixes

- **experimental/transformer-plugin:** fix publish ([c90047a](https://github.com/nartc/mapper/commit/c90047a88bf22a220a462a39e7e9aadb53e25a4d)), closes [#261](https://github.com/nartc/mapper/issues/261)

## [3.0.1](https://github.com/nartc/mapper/compare/3.0.0...3.0.1) (2021-02-19)

### Bug Fixes

- **experimental/transformer-plugin:** move into classes ([05aae8a](https://github.com/nartc/mapper/commit/05aae8ab113b31408ef3f6ccdcdb3fd2393eba2a))

# [3.0.0](https://github.com/nartc/mapper/compare/2.2.1...3.0.0) (2021-02-19)

### Bug Fixes

- **classes:** treat property as primitives if metaResult is null. Default Date to undefined if valueAtKey is undefined ([8e17527](https://github.com/nartc/mapper/commit/8e17527dc27dedfea6060a44f4bb5cbbcd62f224)), closes [#254](https://github.com/nartc/mapper/issues/254)
- **core:** treat null metadata/Date same as null value aka just map the value. add logic for isNullMetadata to MappingPropert ([97f260d](https://github.com/nartc/mapper/commit/97f260d4507d3829acf5f0b24bc7bc4edd875f83))
- **pojos:** treat property as primitives if metaResult is null. Date member to be returned as undefined if valueAtKey is undefined ([3e474ab](https://github.com/nartc/mapper/commit/3e474ab4cf5932c2ab34efe88e0cfeaf0c70973f))
- **types:** add isNullMetadata to MappingTransformation ([a0b39d9](https://github.com/nartc/mapper/commit/a0b39d999baaafd10b77178c346ef58c3ab08a93))

### Features

- **classes:** add logic to take advantage of transformer plugin if used ([f3aca21](https://github.com/nartc/mapper/commit/f3aca21124424f5effed5a03627bacf52dd1c94f))
- **experimental/transformer-plugin:** add transformer plugin for classes package ([67cdd29](https://github.com/nartc/mapper/commit/67cdd29a5abee34a977e29b8161dadff14a612b4))
- **pojos:** allow to pass in null for createMetadataMap to treat something as primitives ([7357ad5](https://github.com/nartc/mapper/commit/7357ad5692c0380eac4ef11a9ef62f14d8392a5e))

### BREAKING CHANGES

- **pojos:** Previously, `null` was used to **skip** properties. Now, use `false` instead,
  `null` means something else.

## [2.2.1](https://github.com/nartc/mapper/compare/2.2.0...2.2.1) (2021-02-14)

### Bug Fixes

- **core:** move isDateConstructor and isPrimitiveConstructor from plugins to core ([997528b](https://github.com/nartc/mapper/commit/997528b0c2d8dca5a85c384e40aaf11f4b17d542))
- **core:** utilize extraArguments in mapArray ([ac5bb40](https://github.com/nartc/mapper/commit/ac5bb4030a9b67fc8c143e3fcd7c8e4550031780))

### Refactor

- **core**: clean up misc ([61f4f65](https://github.com/nartc/mapper/commit/61f4f65c6a12ff6de7ea963d89f2f8df5e968931))
- **classes/pojos**: use `isDateConstructor` and `isPrimitiveConstructor` from core ([b1dc211](https://github.com/nartc/mapper/commit/b1dc2112aa3a0084229a1531424084e222748c00), [66a2f33](https://github.com/nartc/mapper/commit/66a2f33528ddbea5ab0fb8cd891a0e9b1ca9a796))

# [2.2.0](https://github.com/nartc/mapper/compare/2.1.1...2.2.0) (2021-02-14)

### Features

- **core:** add mapWithArguments ([2732300](https://github.com/nartc/mapper/commit/2732300a7454cc9c266d2a2b5e0714d59fd4f1ae))
- **types:** add mapWithArguments to typing definitions ([4b52da3](https://github.com/nartc/mapper/commit/4b52da34947e8fe6cd74e60e7f14435ad7d6f939))

## [2.1.1](https://github.com/nartc/mapper/compare/2.1.0...2.1.1) (2021-02-06)

### Bug Fixes

- **core:** null/undefined check for source in map and mapArray ([b37d29a](https://github.com/nartc/mapper/commit/b37d29af616e2bc257a58058acdeab2a5e856710))

# [2.1.0](https://github.com/nartc/mapper/compare/2.0.1...2.1.0) (2021-02-03)

### Bug Fixes

- adjust config ([b074b21](https://github.com/nartc/mapper/commit/b074b21aeb004dac188c6e93eb99317c5c7710e0))

### Features

- **classes:** add AUTOMAP_PROPERTIES_METADATA_KEY to public api ([1165380](https://github.com/nartc/mapper/commit/116538006a94e0efa3170c31c859385fca356264))

## [2.0.1](https://github.com/nartc/mapper/compare/2.0.0...2.0.1) (2021-02-02)

### Bug Fixes

- **core:** ensure to call mapArray with mapWith if sourceValue is an Array ([0eef348](https://github.com/nartc/mapper/commit/0eef348221265869f047339af8422d3292eacee8)), closes [#253](https://github.com/nartc/mapper/issues/253)

# [2.0.0](https://github.com/nartc/mapper/compare/1.2.0...2.0.0) (2021-01-31)

### Features

- enable strict mode ([6456bec](https://github.com/nartc/mapper/commit/6456bec68becae47509d7d59bb71d24007d07503))
- **classes:** strict mode friendly ([bac51e9](https://github.com/nartc/mapper/commit/bac51e9dc93090fd7ea4db865f99bb940b572d38))
- **core:** strict mode friendly ([5178c3c](https://github.com/nartc/mapper/commit/5178c3caa1536aca12a9611a0471a6b2a206d50c))
- **nestjs:** strict mode friendly ([64abad4](https://github.com/nartc/mapper/commit/64abad4c09d43449108ad63921f0e81ef5cac307))
- **pojos:** strict mode friendly ([deedc1b](https://github.com/nartc/mapper/commit/deedc1be9bb5dca86dbfa8ad945436ead1ac2c9d))
- **types:** strict mode friendly ([f8e6211](https://github.com/nartc/mapper/commit/f8e62111ebcfb5422ab3606587fc2288072b91b6))

### BREAKING CHANGES

- This release enables strict mode for automapper. The type is stricter which might
  affect your current implementations.

# [1.2.0](https://github.com/nartc/mapper/compare/1.1.1...1.2.0) (2021-01-31)

### Features

- **core:** add logic to run preMapArray if available when invoking mapArray ([f1f97f3](https://github.com/nartc/mapper/commit/f1f97f30c3fd07b573951d8fdc61437ca5264256))
- **types:** add MapArrayOptions and adjust mapArray signature ([9d2df49](https://github.com/nartc/mapper/commit/9d2df49fa77f8126e431b9ae0b3ecd05ee0f95ab))

### Documentations

- Add documentation on how to extend a plugin. Please check [Docs](https://automapperts.netlify.app) for more information.

## [1.1.1](https://github.com/nartc/mapper/compare/1.1.0...1.1.1) (2021-01-30)

### Bug Fixes

- **classes:** ensure to use return value of concat() ([705cbec](https://github.com/nartc/mapper/commit/705cbecee34d935669de4f1678eb980ef7af4fd4))

# [1.1.0](https://github.com/nartc/mapper/compare/1.0.4...1.1.0) (2021-01-30)

### Bug Fixes

- **classes:** adjust code smell ([cf53a1f](https://github.com/nartc/mapper/commit/cf53a1f0bfcd472105a5f8fe127bd0c2b782ca53))
- **core:** adjust code smell ([736f58d](https://github.com/nartc/mapper/commit/736f58d94012d901ccc6980c026e06afe75eba98))
- **pojos:** adjust code smell ([4682fbf](https://github.com/nartc/mapper/commit/4682fbf7ea0f3a18a7c6c32849bf3e0d99c4721b))

### Features

- **core:** better error message for mapping operation error ([550d8e8](https://github.com/nartc/mapper/commit/550d8e87dbebf8e699b48454f11ef841712d732a))

## [1.0.4](https://github.com/nartc/mapper/compare/1.0.3...1.0.4) (2021-01-29)

### Bug Fixes

- **nestjs:** ensure mapper is safe for accessing with optional chaining ([83307f5](https://github.com/nartc/mapper/commit/83307f59a510c2b8dfdfa81adbe25e3453ad9a13))

## [1.0.3](https://github.com/nartc/mapper/compare/1.0.2...1.0.3) (2021-01-28)

### Bug Fixes

- **pojos:** add Array to isPrimitiveConstructor. This is to match with the behavior in `classes` ([6415463](https://github.com/nartc/mapper/commit/64154631ce779121332f2d42aa649c265f497b8f))

## [1.0.2](https://github.com/nartc/mapper/compare/1.0.1...1.0.2) (2021-01-28)

### Bug Fixes

- **classes:** isPrimitiveConstructor also returns true for Array constructor ([c5d111d](https://github.com/nartc/mapper/commit/c5d111d27a3fa1a81d99837cca665bc985bc2799)), closes [#249](https://github.com/nartc/mapper/issues/249)

## [1.0.1](https://github.com/nartc/mapper/compare/1.0.0...1.0.1) (2021-01-25)

### Bug Fixes

- **nestjs:** make sure mapOptions passed in as null if it's empty ([93e3761](https://github.com/nartc/mapper/commit/93e37616600e79aea5d04b128d0cfe810aa0fadc)), closes [#247](https://github.com/nartc/mapper/issues/247)

# [1.0.0](https://github.com/nartc/mapper/compare/1.0.0-beta.9...1.0.0) (2021-01-17)

## Official release 1.0.0

Please check out [README](./README.md) for more information

# [1.0.0-beta.9](https://github.com/nartc/mapper/compare/1.0.0-beta.8...1.0.0-beta.9) (2021-01-11)

### Refactor

- **nestjs:** use `global` options in `DynamicModule` for `forRoot` instead of `@Global` decorator ([8f05d8f](https://github.com/nartc/mapper/commit/8f05d8faaa3520052219b1dd87386246d68e5765))

### Bug Fixes

- **nestjs:** adjust globalNamingConventions options to also accept a single NamingConvention ([822c790](https://github.com/nartc/mapper/commit/822c7908bea682fff87f00c06d5c88d7e7060480))

### Features

- **nestjs:** add MapInterceptor ([1a811e5](https://github.com/nartc/mapper/commit/1a811e528fdab2648aa43841ee23661ea9a9c17f))

# [1.0.0-beta.8](https://github.com/nartc/mapper/compare/1.0.0-beta.7...1.0.0-beta.8) (2021-01-09)

### Refactor

- **core:** adjust public API of core ([d86af1d](https://github.com/nartc/mapper/commit/d86af1d26d7005c0dcba442f0592b42f8fca7e06))

# [1.0.0-beta.7](https://github.com/nartc/mapper/compare/1.0.0-beta.6...1.0.0-beta.7) (2021-01-08)

### Bug Fixes

- **core:** adjust getFlatteningSourcePath to take into account multiple parts path with naming conventions ([811568e](https://github.com/nartc/mapper/commit/811568ee9aa7da6ae7168a3db535054e7cf317cb))

# [1.0.0-beta.6](https://github.com/nartc/mapper/compare/1.0.0-beta.5...1.0.0-beta.6) (2021-01-07)

### Features

- **core:** add ability to pass in destinationObj and mutate on map instead of return ([46e920d](https://github.com/nartc/mapper/commit/46e920db51f7c8042926064696dc894a502a509f))
- **core:** adjust set() to have setMutate() and not return ([bdd6d17](https://github.com/nartc/mapper/commit/bdd6d1767ce74e20853b5f2bd4edaf8d7b996929))

# [1.0.0-beta.5](https://github.com/nartc/mapper/compare/1.0.0-beta.4...1.0.0-beta.5) (2021-01-05)

### Bug Fixes

- **classes:** rename types.d.ts to types.ts to include with bundle ([3a15f72](https://github.com/nartc/mapper/commit/3a15f7241543c93af7301422428c790eecf5e60e))
- **pojos:** adjust typings for createMetadataMap ([18cc504](https://github.com/nartc/mapper/commit/18cc5042b529989c00ece99d79c8789e02a43f24))

# [1.0.0-beta.4](https://github.com/nartc/mapper/compare/1.0.0-beta.3...1.0.0-beta.4) (2021-01-05)

### Bug Fixes

- **core:** remove properties added by istanbul for not failing in test coverage ([1dcdcdb](https://github.com/nartc/mapper/commit/1dcdcdb5a3ba1ebe57ac4314b15ef0c945733aa7))

# [1.0.0-beta.3](https://github.com/nartc/mapper/compare/1.0.0-beta.2...1.0.0-beta.3) (2021-01-04)

### Bug Fixes

- **classes:** skip empty metadataList before looping ([88ecf9c](https://github.com/nartc/mapper/commit/88ecf9c04b235a6c39fe4c72c5bacabb332c8ea7))
- **core:** check null and fail fast in getPathRecursive ([449da22](https://github.com/nartc/mapper/commit/449da225695ce75f3e11cc4d7544165c8aa74cb3))

# [1.0.0-beta.2](https://github.com/nartc/mapper/compare/1.0.0-beta.1...1.0.0-beta.2) (2021-01-04)

# [1.0.0-beta.1](https://github.com/nartc/mapper/compare/1.0.0-beta.0...1.0.0-beta.1) (2021-01-04)

# 1.0.0-beta.0 (2021-01-04)

### Bug Fixes

- **core:** adjust isDefined ([6187453](https://github.com/nartc/mapper/commit/618745362e1252ac4a105d28ec79abcc279bc8f8))

### Features

- **nestjs:** add nestjs integration package ([db550c3](https://github.com/nartc/mapper/commit/db550c383264979572d15d4d2d61feb0c3a3ae60))
- add core ([04cd18c](https://github.com/nartc/mapper/commit/04cd18cc3190311bc94e3ef5b07222a9bdaf3b02))
- prepare for beta ([17e2199](https://github.com/nartc/mapper/commit/17e2199d7c07686a9895a7b3ed4cee392764d81e))
- start working on some core functionalities ([5d4fe2b](https://github.com/nartc/mapper/commit/5d4fe2bb906120a3c798b0a6aeb78c422db82cd1))
