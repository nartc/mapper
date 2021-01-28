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
