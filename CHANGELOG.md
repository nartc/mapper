

### [8.8.1](https://github.com/nartc/mapper/compare/8.8.0...8.8.1) (2024-01-23)


### Bug Fixes

* **classes:** fixed transformer ttypescript / ts-patch support ([#556](https://github.com/nartc/mapper/issues/556)) ([eafd79b](https://github.com/nartc/mapper/commit/eafd79b630220285de65984a9f740c4fec08080a))
* ignore import path transformations on win32 platform ([#570](https://github.com/nartc/mapper/issues/570)) ([4089bb4](https://github.com/nartc/mapper/commit/4089bb4d35548eb06a1defd6ee47ce23ca359a09))
* **mikro:** infinite loop when using OneToOne eager loading ([#546](https://github.com/nartc/mapper/issues/546)) ([ec00a0d](https://github.com/nartc/mapper/commit/ec00a0d54855d542585413134eaf49dcb6c28b7d))
* remove / from  @automapper/classes default exports ([#589](https://github.com/nartc/mapper/issues/589)) ([d1d2df5](https://github.com/nartc/mapper/commit/d1d2df585717ffdfab351886bf98732f58227160))


### Documentations

* **core:** add autoMap mapping configuration docs ([#539](https://github.com/nartc/mapper/issues/539)) ([d92f62f](https://github.com/nartc/mapper/commit/d92f62f582140e710c966167cb7c575a777ee347))

## [8.8.0](https://github.com/nartc/mapper/compare/8.7.7...8.8.0) (2024-01-22)


### Features

* **core:** add autoMap mapping configuration ([#538](https://github.com/nartc/mapper/issues/538)) ([5906add](https://github.com/nartc/mapper/commit/5906adddb2bf9a97916e7bbcb789cb4d4ac19b8a))
* **core:** use model's name on mapping error message ([#518](https://github.com/nartc/mapper/issues/518)) ([09bb926](https://github.com/nartc/mapper/commit/09bb9264301e72674a37df171976d7dbab374376))
* **nestjs:** bump nestjs dependencies to v10 ([#561](https://github.com/nartc/mapper/issues/561)) ([1403b41](https://github.com/nartc/mapper/commit/1403b41e2e7e17e026260914a0c96b921604db2e))
* **zod:** init zod ([aa010cd](https://github.com/nartc/mapper/commit/aa010cd7a1efee7caee2db193f320c82932781b4))


### Bug Fixes

* **classes:** add script to update plugin version for jest ([018c666](https://github.com/nartc/mapper/commit/018c6664ee8284513d98d757349e38287e400dfb)), closes [#528](https://github.com/nartc/mapper/issues/528)
* **classes:** clean up transformer plugin to ensure decorator is ignored ([e82e9a1](https://github.com/nartc/mapper/commit/e82e9a1c1699ef43d65ad5e93e90e284eeb6825e))
* **core:** consolidate some logic between forMember and createInitialMapping ([88397b4](https://github.com/nartc/mapper/commit/88397b4fe66ff257fc4360054a36ac04515bfdcc))


### Documentations

* **core:** adjust documentation ([193d541](https://github.com/nartc/mapper/commit/193d541e5d33440bf8de872607bc3e3d04264dfb))

### [8.7.7](https://github.com/nartc/mapper/compare/8.7.6...8.7.7) (2022-10-25)


### Bug Fixes

* **core:** extend uses customProperties instead of properties because it is custom ([b29f2ef](https://github.com/nartc/mapper/commit/b29f2ef6658c8110b7f5c4cf39a9509b5104f33a))
* **core:** send extraArgs from original map operation to mapWith operations ([65c6a74](https://github.com/nartc/mapper/commit/65c6a746c7baeb62cdf6b06fd69c69ec9e9c5668)), closes [#509](https://github.com/nartc/mapper/issues/509)

### [8.7.6](https://github.com/nartc/mapper/compare/8.7.5...8.7.6) (2022-08-31)


### Bug Fixes

* **core:** handle stringify symbol ([0f7f90d](https://github.com/nartc/mapper/commit/0f7f90d8d8e17ad509c4448fbaa00fc6cd679232)), closes [#501](https://github.com/nartc/mapper/issues/501)

### [8.7.5](https://github.com/nartc/mapper/compare/8.7.4...8.7.5) (2022-08-03)

### [8.7.4](https://github.com/nartc/mapper/compare/8.7.3...8.7.4) (2022-08-02)

### [8.7.3](https://github.com/nartc/mapper/compare/8.7.2...8.7.3) (2022-08-02)


### Bug Fixes

* remove target default on package that affects the secondary entry point ([4993411](https://github.com/nartc/mapper/commit/499341180cdd40b7af10c8e520e7fb2910894f21))

### [8.7.2](https://github.com/nartc/mapper/compare/8.7.1...8.7.2) (2022-07-31)

Re-release due to erroneous artifacts in 8.7.1

### [8.7.1](https://github.com/nartc/mapper/compare/8.7.0...8.7.1) (2022-07-29)


### Bug Fixes

* **core:** ensure forMember to always push mapping property to customProperties ([27c1ca0](https://github.com/nartc/mapper/commit/27c1ca0a899cb6ff40368172183f4b5503570e17))

## [8.7.0](https://github.com/nartc/mapper/compare/8.6.0...8.7.0) (2022-07-27)


### Features

* **core:** add custom properties to isolate forMember configuration ([e5b7028](https://github.com/nartc/mapper/commit/e5b7028ac9ef9b4e65f36f3d80e4211c538b9ce1)), closes [#497](https://github.com/nartc/mapper/issues/497)

## [8.6.0](https://github.com/nartc/mapper/compare/8.5.1...8.6.0) (2022-07-25)


### Features

* **nestjs:** add 9.X.X compatibility [#488](https://github.com/nartc/mapper/issues/488) ([#494](https://github.com/nartc/mapper/issues/494)) ([e815c54](https://github.com/nartc/mapper/commit/e815c548f040642dd3ad3c016cd441f6454e0828))


### Bug Fixes

* [docs] Wrong hyperlink [#476](https://github.com/nartc/mapper/issues/476) ([#490](https://github.com/nartc/mapper/issues/490)) ([96af5f9](https://github.com/nartc/mapper/commit/96af5f9430b962524e1591d1b6f6f49681619e3b))
* **mikro:** cannot read properties of undefined (reading 'id') bug ([#493](https://github.com/nartc/mapper/issues/493)) ([4fe4e37](https://github.com/nartc/mapper/commit/4fe4e370910b59c14953bfa92103ec09b9ad5360))


### Documentations

* add @Alwinator as a contributor ([5fe1547](https://github.com/nartc/mapper/commit/5fe1547873a0541f01c6879d2bb1b85f77d4fe98))
* add @VPecquerie as a contributor ([2f5c5af](https://github.com/nartc/mapper/commit/2f5c5aff9f65fc7f57a16c3b6f4aa9933eab9231))
* update ([aca0d8d](https://github.com/nartc/mapper/commit/aca0d8d0f3960d54c06559b90c71ae67b6925a5c))

### [8.5.1](https://github.com/nartc/mapper/compare/8.5.0...8.5.1) (2022-07-13)


### Features

* **core:** MapCallback is now called with extraArguments ([60a1da8](https://github.com/nartc/mapper/commit/60a1da8d26ffb1b087bd16e9a0e561af53539ec1))


### Bug Fixes

* **classes:** get type from typeNode in the case type isn't sufficient enough ([4ab3549](https://github.com/nartc/mapper/commit/4ab3549bcdd54fc320a5aec98fc205ec22899209))
* **classes:** use aliasSymbol and aliasTypeArguments for transformer plugin if they exist ([6b0b5ae](https://github.com/nartc/mapper/commit/6b0b5ae2ff56497bf35bed2aebf843852bfdedc4))
* **core:** skip nested mapping for array prop if destination identifier is primitive ([d2327bc](https://github.com/nartc/mapper/commit/d2327bca824882aadb52bf2042a1f301ef4f8ffa))


### Documentations

* fix mikro pagakage name on readme ([#487](https://github.com/nartc/mapper/issues/487)) ([13b7305](https://github.com/nartc/mapper/commit/13b7305b8759f34bc5841b4e2e00b3840013e2e8))

## [8.5.0](https://github.com/nartc/mapper/compare/8.5.0-beta.0...8.5.0) (2022-07-05)


### Bug Fixes

* **core:** adjust logger impl ([33978de](https://github.com/nartc/mapper/commit/33978de984a54a74d4acc70437985f5cdce60d5b))


### Documentations

* **core:** add documentations on AutoMapperLogger ([53b7b40](https://github.com/nartc/mapper/commit/53b7b40364b1ccb4848c98dc063c9933aa94ee18))

## [8.5.0-beta.0](https://github.com/nartc/mapper/compare/8.4.1...8.5.0-beta.0) (2022-07-02)


### Features

* **core:** add logger ([51a7984](https://github.com/nartc/mapper/commit/51a7984ed061b201af44b1d6b5dccb58492e3b1f))

### [8.4.1](https://github.com/nartc/mapper/compare/8.4.0...8.4.1) (2022-07-01)


### Bug Fixes

* add exports field since web:rollup does not add it by default ([a2c2df1](https://github.com/nartc/mapper/commit/a2c2df11cb4538b00c15b4a61b69e00cf871b612)), closes [#485](https://github.com/nartc/mapper/issues/485) [#483](https://github.com/nartc/mapper/issues/483)
* handle peer dependencies version ([82e447a](https://github.com/nartc/mapper/commit/82e447a9c075b207a534e6a7921d8511cc651746)), closes [#482](https://github.com/nartc/mapper/issues/482)


### Documentations

* add [@jmplahitko](https://github.com/jmplahitko) as a contributor ([3ff1b7b](https://github.com/nartc/mapper/commit/3ff1b7bf20e35348a7be90b54d7c820efd58ebe8))

## [8.4.0](https://github.com/nartc/mapper/compare/8.3.7...8.4.0) (2022-07-01)


### Features

* **core:** allow shorthand syntax for same identifiers w/ createMap and map ([f06bf24](https://github.com/nartc/mapper/commit/f06bf24a5e0ab014a7ecf6d96e919e010d9fe3a4))


### Bug Fixes

* adjust all peer deps ([88650ad](https://github.com/nartc/mapper/commit/88650ad9589b61147dc92441898d4efc97305a7f))
* **core:** add check to only run nest map on applicable identifiers in map member ([262f86b](https://github.com/nartc/mapper/commit/262f86b81371829de38f6d09e6c3a9f9a56c0440)), closes [#480](https://github.com/nartc/mapper/issues/480)
* **core:** allow same identifier to be mapped with custom mapping if such mapping is created ([73e1224](https://github.com/nartc/mapper/commit/73e122420c0ca7ecc0850958b13d81e8886b8922)), closes [#479](https://github.com/nartc/mapper/issues/479)
* **core:** cleanup default serializer options ([653cbb7](https://github.com/nartc/mapper/commit/653cbb7d6aa828a53b7297215d60abce72d2c17e))
* **core:** rename default serializer to strategy initializer ([2a1b4b4](https://github.com/nartc/mapper/commit/2a1b4b42e3c63c74794901ca1158eed0cc564fc8))


### Documentations

* add @LennartH as a contributor ([2f7c948](https://github.com/nartc/mapper/commit/2f7c948fec21315bd064e7c25cca5df1b86264db))
* add documentation on self mapping ([3a3b84d](https://github.com/nartc/mapper/commit/3a3b84d2fb07a4845cb052da957ccec661ac9cbc))
* update [@roblopz](https://github.com/roblopz) as a contributor ([cd23868](https://github.com/nartc/mapper/commit/cd2386815c326e5feffde08ba216f0f82cbbc0dc))

### [8.3.7](https://github.com/nartc/mapper/compare/8.3.7-beta.0...8.3.7) (2022-06-02)


### Bug Fixes

* **core:** use readonly access modifier in MappingStrategy interface instead of get. ([#478](https://github.com/nartc/mapper/issues/478)) ([bc6b2f1](https://github.com/nartc/mapper/commit/bc6b2f132d973d0e8d8b598e2dd8d7c000a58b01))


### Documentations

* bump node version for docusaurus workflow ([fcb93a5](https://github.com/nartc/mapper/commit/fcb93a5e462fcbb07cb6789761f8df0949701950))
* update docusaurus ([8ad45f8](https://github.com/nartc/mapper/commit/8ad45f826a772763d034e11f725fe28c3359372c))

### [8.3.7-beta.0](https://github.com/nartc/mapper/compare/8.3.6...8.3.7-beta.0) (2022-05-27)


### Documentations

* add docsearch ([768c632](https://github.com/nartc/mapper/commit/768c6323a613ecf5716d58954096ab75287e217c))
* adjust algolia search again ([031db42](https://github.com/nartc/mapper/commit/031db42ddc647506d5b568edc6e658f15b5ced65))
* adjust doc search settings ([00d25ce](https://github.com/nartc/mapper/commit/00d25ce1e541b4c86443456ce0d0bf0c4298827f))

### [8.3.6](https://github.com/nartc/mapper/compare/8.3.5...8.3.6) (2022-05-06)


### Bug Fixes

* **core:** fix freezing of source object after mapping ([#468](https://github.com/nartc/mapper/issues/468)) ([a95563d](https://github.com/nartc/mapper/commit/a95563d4aafac39c536bffb3963dfc014a1fc1c7)), closes [#467](https://github.com/nartc/mapper/issues/467) [#467](https://github.com/nartc/mapper/issues/467)
* **repo:** remove peerDeps ([f6ef2a0](https://github.com/nartc/mapper/commit/f6ef2a00af7fd9539883e7e614ddec50f2db8f65))

### [8.3.5](https://github.com/nartc/mapper/compare/8.3.4...8.3.5) (2022-05-05)


### Documentations

* adjust typo ([04ebb42](https://github.com/nartc/mapper/commit/04ebb4219a41beb98e7001aa17150f175710cc25))

### [8.3.4](https://github.com/nartc/mapper/compare/8.3.3...8.3.4) (2022-05-04)


### Bug Fixes

* **core:** treat property that is typed-converted as-is because they cannot go through normal mapping pipeline ([819485f](https://github.com/nartc/mapper/commit/819485f5029755a0952b23ff3c2eb6af38fdc4cb))


### Documentations

* add warning about type converters ([2ce47f1](https://github.com/nartc/mapper/commit/2ce47f1082a3c98346d32ad82535340091484743))
* update docs ([f645777](https://github.com/nartc/mapper/commit/f645777e6076117b661adfc962167a64aec93035))

### [8.3.3](https://github.com/nartc/mapper/compare/8.3.2...8.3.3) (2022-04-13)


### Bug Fixes

* **core:** condition and substitutions should respect automap nature of a property ([1ab671d](https://github.com/nartc/mapper/commit/1ab671d11fb60a47f5296a660bbbae1707338599)), closes [#461](https://github.com/nartc/mapper/issues/461)
* **core:** map as-is for same identifiers ([270cb53](https://github.com/nartc/mapper/commit/270cb53282befdaeac757fe65a40add458effd44)), closes [#460](https://github.com/nartc/mapper/issues/460)### [8.3.2](https://github.com/nartc/mapper/compare/8.3.1...8.3.2) (2022-04-11)


### Bug Fixes

* **core:** update applyMetadata to ensure selfReference properties are handled ([109b5f0](https://github.com/nartc/mapper/commit/109b5f0dd9514fe6ade9f61b722db7be018ed921))

### [8.3.1](https://github.com/nartc/mapper/compare/8.3.0...8.3.1) (2022-04-11)


### Bug Fixes

* **classes:** adjust packageJson exports to include secondary entry points ([a82c0c3](https://github.com/nartc/mapper/commit/a82c0c3e916e8c1f2db8fbbb9e45852dea389aba))

## [8.3.0](https://github.com/nartc/mapper/compare/8.2.4...8.3.0) (2022-04-11)


### Features

* **core:** applyMetadata now needs to know whether it's applying to a model as Source or as Destination ([70d267a](https://github.com/nartc/mapper/commit/70d267a32c48da25a2abf0d25badf23e4e6a24a5))


### Bug Fixes

* **core:** not clearing metadataMap on dispose ([f2ae39c](https://github.com/nartc/mapper/commit/f2ae39c7d3bc4c66e155675880d56c0fc5629cc1))

### [8.2.4](https://github.com/nartc/mapper/compare/8.2.3...8.2.4) (2022-04-10)


### Bug Fixes

* **core:** add custom node inspect to log meaningful message for Mapper (empty object as Proxy) ([de9725a](https://github.com/nartc/mapper/commit/de9725ae07b9288349863e097dcbee30446298e1))

### [8.2.3](https://github.com/nartc/mapper/compare/8.2.2...8.2.3) (2022-04-07)


### Bug Fixes

* **classes:** use class constructor's name instead of constructor function ([#452](https://github.com/nartc/mapper/issues/452)) ([8b413f9](https://github.com/nartc/mapper/commit/8b413f9cbc2d989df91c31d5d294fa34ed46b91e))
* **core:** remove constraint on postMap (remove seal on destination) ([2c38340](https://github.com/nartc/mapper/commit/2c383408247345d080674b13bf5a61532e1c193c)), closes [#450](https://github.com/nartc/mapper/issues/450)

### [8.2.2](https://github.com/nartc/mapper/compare/8.2.1...8.2.2) (2022-04-07)


### Bug Fixes

* **mikro:** adjust serializeEntity to return the object with id for uninitialized reference ([62f5c0f](https://github.com/nartc/mapper/commit/62f5c0f36d0275b406f61e8dc10bd0319905bc1a))

### [8.2.1](https://github.com/nartc/mapper/compare/8.2.0...8.2.1) (2022-04-07)


### Bug Fixes

* **core:** adjust getFlatteningPaths to flatten more as needed ([b8734ec](https://github.com/nartc/mapper/commit/b8734ecb609ad41c3c117b88cab8dc818d82e62a))

## [8.2.0](https://github.com/nartc/mapper/compare/8.1.0...8.2.0) (2022-04-07)


### Features

* **core:** allow preMap and postMap to also be called with the Mapping ([1e0fa62](https://github.com/nartc/mapper/commit/1e0fa62b67400609a79290a860c84ffd9c74c0ee))


### Bug Fixes

* **mikro:** ensure serializeEntity follows the metadata object to accommodate depth of serialization ([54cd373](https://github.com/nartc/mapper/commit/54cd37319c28b9494055559480f9a49891aef873))

## [8.1.0](https://github.com/nartc/mapper/compare/8.1.0-beta.0...8.1.0) (2022-04-03)## [8.1.0-beta.0](https://github.com/nartc/mapper/compare/8.0.1...8.1.0-beta.0) (2022-04-03)


### Features

* **repo:** change to use ESM while still supporting cjs ([7866e00](https://github.com/nartc/mapper/commit/7866e00237fa48a516e776193edc2c1d1fe08cc0))

### [8.0.1](https://github.com/nartc/mapper/compare/8.0.1-beta.1...8.0.1) (2022-03-30)


### Bug Fixes

* **classes:** add a metadataTracker to track identifier whose metadata has already been extracted ([7cd1ae2](https://github.com/nartc/mapper/commit/7cd1ae2a8ef6e6ef01181b8faf0788f0d2a2d049))
* **core:** revert export symbols as no need ([bb5d32f](https://github.com/nartc/mapper/commit/bb5d32f0a36f896579e39981ff90e335cff6a182))

### [8.0.1-beta.1](https://github.com/nartc/mapper/compare/8.0.1-beta.0...8.0.1-beta.1) (2022-03-30)


### Bug Fixes

* **classes:** fix infinity loop with circular dependency models ([3360992](https://github.com/nartc/mapper/commit/3360992b4c240fca673d3741c2ce5aba8ffcb9d9))
* **core:** export symbols ([a87acb5](https://github.com/nartc/mapper/commit/a87acb5454bd7b78393bfe6e73e174b309efac2d))

### [8.0.1-beta.0](https://github.com/nartc/mapper/compare/8.0.0...8.0.1-beta.0) (2022-03-30)


### Bug Fixes

* **repo:** adjust exports field in package json across packages ([f462395](https://github.com/nartc/mapper/commit/f462395f1d0fab7f58288e85def9b25c2c7d7698))

## [8.0.0](https://github.com/nartc/mapper/compare/8.0.0-beta.18...8.0.0) (2022-03-30)

It is finally here 🎉. Highlights:

-   Smaller bundle-size
-   Support CJS and ESM
-   Functional approach with tree-shake in mind
-   Custom Constructor

Check out the [Migration Guide](https://automapperts.netlify.app/docs/getting-started/migrate-to-automapper-v8)

### [7.3.14](https://github.com/nartc/mapper/compare/8.0.0-beta.18...8.0.0) (2022-03-05)

### Bug Fixes

-   **mikro:** use getEntity as unwrap value instead of recursion ([292759c](https://github.com/nartc/mapper/commit/292759c24aff0a23796d4d2457ba65058d5a10a8))

### [7.3.13](https://github.com/nartc/mapper/compare/8.0.0-beta.18...8.0.0) (2022-03-05)

### Bug Fixes

-   **mikro:** recursively unwrap collections ([a445b3b](https://github.com/nartc/mapper/commit/a445b3b1d9ca788b0fe8226d6c296958f0263758))

### [7.3.12](https://github.com/nartc/mapper/compare/8.0.0-beta.18...8.0.0) (2022-03-05)

### Bug Fixes

-   **mikro:** run toJSON on reference ([a5e2a67](https://github.com/nartc/mapper/commit/a5e2a67b41faae886db9189e586fc291c85fb2dc))

### [7.3.11](https://github.com/nartc/mapper/compare/8.0.0-beta.18...8.0.0) (2022-03-05)

### Bug Fixes

-   **mikro:** ensure preMapArray run instantiate correctly ([7b2ef67](https://github.com/nartc/mapper/commit/7b2ef671bf5b3c3ee5cc1e38ce6d8252db4bec02))## [8.0.0-beta.18](https://github.com/nartc/mapper/compare/8.0.0-beta.17...8.0.0-beta.18) (2022-03-30)## [8.0.0-beta.17](https://github.com/nartc/mapper/compare/8.0.0-beta.16...8.0.0-beta.17) (2022-03-28)## [8.0.0-beta.16](https://github.com/nartc/mapper/compare/8.0.0-beta.15...8.0.0-beta.16) (2022-03-27)## [8.0.0-beta.15](https://github.com/nartc/mapper/compare/8.0.0-beta.14...8.0.0-beta.15) (2022-03-24)## [8.0.0-beta.14](https://github.com/nartc/mapper/compare/8.0.0-beta.13...8.0.0-beta.14) (2022-03-24)## [8.0.0-beta.13](https://github.com/nartc/mapper/compare/8.0.0-beta.12...8.0.0-beta.13) (2022-03-22)## [8.0.0-beta.12](https://github.com/nartc/mapper/compare/8.0.0-beta.11...8.0.0-beta.12) (2022-03-21)## [8.0.0-beta.11](https://github.com/nartc/mapper/compare/8.0.0-beta.10...8.0.0-beta.11) (2022-03-21)## [8.0.0-beta.10](https://github.com/nartc/mapper/compare/8.0.0-beta.9...8.0.0-beta.10) (2022-03-21)## [8.0.0-beta.9](https://github.com/nartc/mapper/compare/8.0.0-beta.8...8.0.0-beta.9) (2022-03-21)## [8.0.0-beta.8](https://github.com/nartc/mapper/compare/8.0.0-beta.7...8.0.0-beta.8) (2022-03-21)## [8.0.0-beta.7](https://github.com/nartc/mapper/compare/8.0.0-beta.6...8.0.0-beta.7) (2022-03-21)## [8.0.0-beta.6](https://github.com/nartc/mapper/compare/8.0.0-beta.5...8.0.0-beta.6) (2022-03-21)## [8.0.0-beta.5](https://github.com/nartc/mapper/compare/8.0.0-beta.4...8.0.0-beta.5) (2022-03-21)## [8.0.0-beta.4](https://github.com/nartc/mapper/compare/8.0.0-beta.3...8.0.0-beta.4) (2022-03-21)## [8.0.0-beta.3](https://github.com/nartc/mapper/compare/8.0.0-beta.2...8.0.0-beta.3) (2022-03-21)## [8.0.0-beta.2](https://github.com/nartc/mapper/compare/8.0.0-beta.1...8.0.0-beta.2) (2022-03-20)## [8.0.0-beta.1](https://github.com/nartc/mapper/compare/8.0.0-beta.0...8.0.0-beta.1) (2022-03-20)## [8.0.0-beta.0](https://github.com/nartc/mapper/compare/7.3.10...8.0.0-beta.0) (2022-03-19)

### Features

-   **core:** add core ([5fe3f93](https://github.com/nartc/mapper/commit/5fe3f938c6003e9cd69c10adb70490c38016c820))

### Bug Fixes

-   **mikro:** remove redundant util ([a943c10](https://github.com/nartc/mapper/commit/a943c100de333601a84ea003be70444ebb2d80cb))### [7.3.10](https://github.com/nartc/mapper/compare/7.3.9...7.3.10) (2022-02-26)

### Bug Fixes

-   **mikro:** serialize reference (attempt 2) ([47da73e](https://github.com/nartc/mapper/commit/47da73eb5ce76920670aea71fcb71cc1bc3857fb))

### [7.3.9](https://github.com/nartc/mapper/compare/7.3.8...7.3.9) (2022-02-26)

### Bug Fixes

-   **mikro:** serialize reference ([567bd73](https://github.com/nartc/mapper/commit/567bd7382db747be11a365b17196eb3dbf8bd055))

### [7.3.8](https://github.com/nartc/mapper/compare/7.3.7...7.3.8) (2022-02-25)

### Bug Fixes

-   **mikro:** adjust instantiate logic (attempt 2) ([6f6ae9f](https://github.com/nartc/mapper/commit/6f6ae9f8d2e6437fa2d11da8bc461919a1f88907))

### [7.3.7](https://github.com/nartc/mapper/compare/7.3.6...7.3.7) (2022-02-25)

### Bug Fixes

-   **mikro:** adjust instantiate logic (attempt) ([75b4367](https://github.com/nartc/mapper/commit/75b436758a94660b2d33359fddd304782fb74e05))

### [7.3.6](https://github.com/nartc/mapper/compare/7.3.5...7.3.6) (2022-02-25)

### Bug Fixes

-   **mikro:** allow entity serializer to be customizable ([f4f7d29](https://github.com/nartc/mapper/commit/f4f7d29c266544bbb8504f2ffd010b6de71dfeab))

### [7.3.5](https://github.com/nartc/mapper/compare/7.3.4...7.3.5) (2022-02-25)

### Bug Fixes

-   **mikro:** assign id before serialize entity ([068d25b](https://github.com/nartc/mapper/commit/068d25bee078a97a4ce6daa96ebb6167c61b688c))

### [7.3.4](https://github.com/nartc/mapper/compare/7.3.3...7.3.4) (2022-02-25)

### Bug Fixes

-   **mikro:** adjust instantiate logic ([bcf004e](https://github.com/nartc/mapper/commit/bcf004e32d98324fa73cb0c320098a38bea58523))

### [7.3.3](https://github.com/nartc/mapper/compare/7.3.2...7.3.3) (2022-02-25)

### Bug Fixes

-   **mikro:** skipping symbol ([83494e6](https://github.com/nartc/mapper/commit/83494e6b1cbd8293ebc0c5e88bcdd32029ae9816))

### [7.3.2](https://github.com/nartc/mapper/compare/7.3.1...7.3.2) (2022-02-25)

### Bug Fixes

-   **mikro:** serialize entity in instantiate as well ([635fba2](https://github.com/nartc/mapper/commit/635fba2d73a2c2351aecb974e93e64d544cb92bf))

### [7.3.1](https://github.com/nartc/mapper/compare/7.3.0...7.3.1) (2022-02-25)

### Bug Fixes

-   **mikro:** serialize entity properly ([4a18543](https://github.com/nartc/mapper/commit/4a185430b2dfa03d31e10fd5acc29394d4fb5c22))

## [7.3.0](https://github.com/nartc/mapper/compare/7.2.1...7.3.0) (2022-02-25)

### Features

-   **mikro:** add mikro plugin ([6f52813](https://github.com/nartc/mapper/commit/6f5281310e9d914808ed9f570ccfdaf3dbedef72))

### Bug Fixes

-   **repo:** use js:swc for all packages ([03e4577](https://github.com/nartc/mapper/commit/03e457783247662c2eb8be735776877bb6fc2e1c))

### [7.2.1](https://github.com/nartc/mapper/compare/7.2.0...7.2.1) (2022-01-11)

### Bug Fixes

-   **classes, core:** add ability to map Date[] types ([#399](https://github.com/nartc/mapper/issues/399)) ([cb27b1a](https://github.com/nartc/mapper/commit/cb27b1aa8d45efe0f93e13dd9ad82617a4b10aac)), closes [#397](https://github.com/nartc/mapper/issues/397) [#397](https://github.com/nartc/mapper/issues/397)
-   **core:** relax addTypeConverter return to include undefined ([20c250c](https://github.com/nartc/mapper/commit/20c250cbe744be9c3c36c03a4e2f0bd5e832545a))
-   **core:** skip key that is a method in getPathRecursive ([5a56529](https://github.com/nartc/mapper/commit/5a56529b60bfa7898625f176a578cc0992e4072f)), closes [#396](https://github.com/nartc/mapper/issues/396)

### Documentations

-   add [@roblopz](https://github.com/roblopz) as a contributor ([a45bc0a](https://github.com/nartc/mapper/commit/a45bc0a3cf5a2137f1c9040645c8edecb644f9c8))

## [7.2.0](https://github.com/nartc/mapper/compare/7.1.1...7.2.0) (2022-01-06)

### Features

-   **classes:** add logic to handle [@auto](https://github.com/auto)MapIgnore JSDoc comment ([2de6893](https://github.com/nartc/mapper/commit/2de689352ad272a6a61a121e06c1cd3f18bbb2b4)), closes [#395](https://github.com/nartc/mapper/issues/395)

### Bug Fixes

-   **core:** adjust how unmapped properties assertion work ([3f2bb0e](https://github.com/nartc/mapper/commit/3f2bb0e73b10e331ac3a3a183984a9042c89327f)), closes [#394](https://github.com/nartc/mapper/issues/394)

### Documentations

-   display last updated date and author ([#390](https://github.com/nartc/mapper/issues/390)) ([0e0956b](https://github.com/nartc/mapper/commit/0e0956bbd998c495d9ff9b8afa03b666ea7f8b1c))

### [7.1.1](https://github.com/nartc/mapper/compare/7.1.0...7.1.1) (2021-12-23)

### Bug Fixes

-   **core:** fallback to primitive if constructor/function is undefined ([ac5030f](https://github.com/nartc/mapper/commit/ac5030f7811a1c03f5c5c19669d2b3e64fa9cc64))

## [7.1.0](https://github.com/nartc/mapper/compare/7.0.3...7.1.0) (2021-12-20)

### Features

-   **core:** adjust typings to support more custom type converter ([6ef280f](https://github.com/nartc/mapper/commit/6ef280f9c74841fba68d9d157eb4918e5b55fc8d))

### Documentations

-   remove limitation to Custom Type Converter ([a28d320](https://github.com/nartc/mapper/commit/a28d320960731093eb0062a5c21f03d648f0be7e))
-   update docusaurus ([3b439b4](https://github.com/nartc/mapper/commit/3b439b4763efdbbf7900865175da91306a42c4d3))

### [7.0.3](https://github.com/nartc/mapper/compare/7.0.2...7.0.3) (2021-12-19)

### Bug Fixes

-   **core:** improve error message for logging ([c9db5c4](https://github.com/nartc/mapper/commit/c9db5c4445b5973da2c6ed7e6d1e6e1bdc28b058))

### [7.0.2](https://github.com/nartc/mapper/compare/7.0.1...7.0.2) (2021-11-12)

### Bug Fixes

-   **classes:** rename PrimitiveWithDate to PrimitiveExtended ([34d8a52](https://github.com/nartc/mapper/commit/34d8a52fcb0e66444b4ff3e7c79837aefc27c1a8))
-   **core:** change how File is handled in map ([57df4ad](https://github.com/nartc/mapper/commit/57df4adb6f5902e8500003e0f877654890f8538f))
-   **core:** rename PrimitiveWithDate to PrimitiveExtended ([4c299ff](https://github.com/nartc/mapper/commit/4c299ff60b2d9af1676f9b406e889f65017855f3))

### Documentations

-   add ForSelf doc to sidebars ([9f0f478](https://github.com/nartc/mapper/commit/9f0f4787793f6de83db80f2609981cf4569ffa3e))
-   remove all reference to automapper/types ([9e44e17](https://github.com/nartc/mapper/commit/9e44e17d56cfa52a49f5a30061e48aacf808b9e0))

### [7.0.1](https://github.com/nartc/mapper/compare/7.0.0...7.0.1) (2021-11-11)

### Documentations

-   remove types from readme ([31ab69f](https://github.com/nartc/mapper/commit/31ab69fbc427fcc156c812f98af01467a55b9eea))

## [7.0.0](https://github.com/nartc/mapper/compare/6.3.1...7.0.0) (2021-11-11)

### ⚠ BREAKING CHANGES

-   **types:** @automapper/types is removed

`@automapper/types` has been removed and the types have been moved to `@automapper/core`. This is to reduce the amount of libraries that the consumers have to install. The types themselves are untouched, you can probably fix this with a simple Find and Replace.

### Features

-   **classes:** use core types ([985def8](https://github.com/nartc/mapper/commit/985def898b31499a007ededc41a00c2653218ecf))
-   **core:** add isFileConstructor util ([54d2b65](https://github.com/nartc/mapper/commit/54d2b6564ee9caf2d4012122f736881378e43f5e))
-   **core:** move types into core ([62ffdc6](https://github.com/nartc/mapper/commit/62ffdc68ee7724a076348f5896187eae28aba891))
-   **core:** use local types ([558782d](https://github.com/nartc/mapper/commit/558782d6b14206c8c5d07f4eedcdddb12fbd6402))
-   **nestjs:** use core types ([a21f5a3](https://github.com/nartc/mapper/commit/a21f5a3ece1cd89ba0fe04ec83752e110f434289))
-   **pojos:** support File as a metadata constructor ([0eafe05](https://github.com/nartc/mapper/commit/0eafe059f236b748b00fa30845c697d41dec15d5))
-   **pojos:** use core types ([d601da2](https://github.com/nartc/mapper/commit/d601da205946f20fb880dbb5766cfc38158ca266))
-   **sequelize:** use core types ([35c28a8](https://github.com/nartc/mapper/commit/35c28a87d73675f550cd9ae13d2ab72d56755cff))
-   **test:** use core types ([f562ca0](https://github.com/nartc/mapper/commit/f562ca01c9acda2994a2be2ea11fbece62c2785c))
-   **types:** moving types to core to retire @automapper/types ([ccfcf94](https://github.com/nartc/mapper/commit/ccfcf94ef7d8b864f51567db7e9d11b19ddcdc01))

### Documentations

-   add lookup types limitation on custom type converter ([#370](https://github.com/nartc/mapper/issues/370)) ([9ab6023](https://github.com/nartc/mapper/commit/9ab60239f2147034b1b7357f3ea1a75acb067435))
-   **core:** add documentations for forSelf ([e896a22](https://github.com/nartc/mapper/commit/e896a22483a89616b54773bd44f624f27788b109))

### Refactor

-   **pojos:** clean up if check ([0470fb3](https://github.com/nartc/mapper/commit/0470fb3339432619dd698b01373d4e32e2220a41))

### [6.3.1](https://github.com/nartc/mapper/compare/6.3.0...6.3.1) (2021-10-28)

### Bug Fixes

-   **types:** adjust type of Primitive type converter ([f30b9c4](https://github.com/nartc/mapper/commit/f30b9c4e9c5672a18f308287373c96f4d98bcc8b))

### Refactor

-   **classes:** clean up model visitor ([1126755](https://github.com/nartc/mapper/commit/11267550a2d77c5ae178461deffc706c4dcbe88b))

### Documentations

-   update docs ([e59ce14](https://github.com/nartc/mapper/commit/e59ce14f01034c4e1aeed4d8f9c42bf8a8acb638))

## [6.3.0](https://github.com/nartc/mapper/compare/6.2.1...6.3.0) (2021-10-26)

### Features

-   **classes:** add shim file for browsers ([#354](https://github.com/nartc/mapper/issues/354)) ([4feff72](https://github.com/nartc/mapper/commit/4feff72fd01f5ef4c1f48fccbb938fc2faaa3236)), closes [#353](https://github.com/nartc/mapper/issues/353)

### Bug Fixes

-   **classes:** widen Constructible type ([a394e5c](https://github.com/nartc/mapper/commit/a394e5c63eee15d8743a1043f6944c4fd7e429c4)), closes [#365](https://github.com/nartc/mapper/issues/365)

### [6.2.1](https://github.com/nartc/mapper/compare/6.2.0...6.2.1) (2021-09-21)

### Bug Fixes

-   **core:** ensure applyTypeConverter to work correctly ([0f1b689](https://github.com/nartc/mapper/commit/0f1b6894efbbb61dd9e95366dae31bbaa9700ede))

## [6.2.0](https://github.com/nartc/mapper/compare/6.1.4...6.2.0) (2021-09-21)

### Features

-   **classes:** store source and destination on mapping; use .name instead of toString() ([6b0530c](https://github.com/nartc/mapper/commit/6b0530cb03e4ee407524ea1599165c7f045dfd94))
-   **core:** start storing Source and Destination keys on Mapping ([73d19a3](https://github.com/nartc/mapper/commit/73d19a3474c916581c1ccdc9e451e306606752f9))
-   **core:** support strong type extraArguments ([0cd5119](https://github.com/nartc/mapper/commit/0cd51191ea529b4214a45d31b1582084684b4f16))
-   **pojos:** store source and destination on mapping ([2fd60bc](https://github.com/nartc/mapper/commit/2fd60bc36426b492175a33ffc680512269cd833c))

### Bug Fixes

-   **types:** replace unknown record type in mapWithArguments by any ([#347](https://github.com/nartc/mapper/issues/347)) ([8160498](https://github.com/nartc/mapper/commit/816049834b5938e82cceb5933a3092a9c09e307b)), closes [#346](https://github.com/nartc/mapper/issues/346)

### Documentations

-   remove 'odd-property name' limitation ([99e0efd](https://github.com/nartc/mapper/commit/99e0efd5a636c9530c0529deeef9761237d8addf))

### [6.1.4](https://github.com/nartc/mapper/compare/6.1.3...6.1.4) (2021-09-10)

### Bug Fixes

-   **transformer-plugin:** try get typeReference and null check for property assignment ([d447783](https://github.com/nartc/mapper/commit/d447783e846e6a1e2e2b7783b66db1902c078313))

### [6.1.3](https://github.com/nartc/mapper/compare/6.1.2...6.1.3) (2021-08-30)

### Bug Fixes

-   **core:** ensure properties that aren't on destination won't be mapped from forSelf ([390b8bb](https://github.com/nartc/mapper/commit/390b8bb4cd4a7c4cb2170434f1c75a762ce75774))

### [6.1.2](https://github.com/nartc/mapper/compare/6.1.1...6.1.2) (2021-08-30)

### Bug Fixes

-   **nestjs:** make sure to support Nest7 as well ([8235720](https://github.com/nartc/mapper/commit/8235720c93d264154d3c22d7a40a1a034e441025))

### [6.1.1](https://github.com/nartc/mapper/compare/6.1.0...6.1.1) (2021-08-27)

### Bug Fixes

-   **core:** ensure forMember (custom) will always override forSelf ([ef7471a](https://github.com/nartc/mapper/commit/ef7471ac7a5edbd8728b12b21b3df8e370b50b8f))

## [6.1.0](https://github.com/nartc/mapper/compare/6.0.2...6.1.0) (2021-08-26)

### Features

-   **core:** add forSelf ([140a37c](https://github.com/nartc/mapper/commit/140a37c7228aacfbaced12bf8c147e5ea048446b))

### [6.0.2](https://github.com/nartc/mapper/compare/6.0.1...6.0.2) (2021-08-22)

### Bug Fixes

-   **core:** add prototype properties (getters, setters) to destinationPath ([15ad713](https://github.com/nartc/mapper/commit/15ad713fd0acf86ad19124178ce0f18b19bdb1a1)), closes [#334](https://github.com/nartc/mapper/issues/334)

### [6.0.1](https://github.com/nartc/mapper/compare/6.0.0...6.0.1) (2021-08-16)

### Documentations

-   add [@jasonmerino](https://github.com/jasonmerino) as a contributor ([809e447](https://github.com/nartc/mapper/commit/809e4476f0c07c9c13ddcd21389fbb06ac17f581))

### Refactor

-   **classes:** clean up typings ([45edfda](https://github.com/nartc/mapper/commit/45edfdadd133fd9f0cb52b7bae2e0f8623884fdd))
-   **core:** clean up core libs ([ddb11e5](https://github.com/nartc/mapper/commit/ddb11e5e9cf742281d794201dbcae1008fbd896d))
-   **core:** remove some any types ([cdc2f9a](https://github.com/nartc/mapper/commit/cdc2f9a9ebecf37c26788b834ccf319bf4db5a7a))
-   **pojos:** clean up typings ([f43705a](https://github.com/nartc/mapper/commit/f43705a39b7862b2ad9163bd39699aeb4dcd20db))

## [6.0.0](https://github.com/nartc/mapper/compare/5.0.1...6.0.0) (2021-08-02)

### ⚠ BREAKING CHANGES

-   **core:** `mapWith` signature now accepts the models directly instead of a deferred function.
    This allows to use `mapWith` easier

```ts
// before
mapWith(
    () => Dto,
    (s) => s.value,
    () => Source
);

// after
mapWith(Dto, Source, (s) => s.value);
```

-   **classes:** AutoMap only accepts an optional config object now. Positional arguments overload
    has been removed

```ts
// deprecated and removed
@AutoMap(() => Foo)

// please migrate
@AutoMap({typeFn: () => Foo})
```

### Features

-   **classes:** remove AutoMap without config object ([95479ca](https://github.com/nartc/mapper/commit/95479cad401dc81c81aac8da16ff0d84fe8b9372))
-   **core:** add basic TypeConverter for primitives ([83fd239](https://github.com/nartc/mapper/commit/83fd239cbebc48562beebb69c317d616a383e03d))

Sometimes, you need to set a common converter for one type to another when the property names are matching between a `Source` and a `Destination`. For example, suppose we have a `Source` type:

```ts
export class Source {
    @AutoMap()
    value1!: string;
    @AutoMap()
    value2!: string;
    @AutoMap()
    value3!: string;
}
```

and you would like to map it to the following `Destination` type:

```ts
export class Destination {
    @AutoMap()
    value1!: number;
    @AutoMap()
    value2!: Date;
    @AutoMap()
    value3!: boolean;
}
```

If we were to try and map `Source -> Destination` as-is, we would end up with mismatch values and types on the `Destination`. Eg: `Source.value1` will be mapped to `Destination.value1` even though the types of each `value1` are different. `Destination.value1` will end up with `string` value even though it is declared as `number`. This is because AutoMapper does not know anything and will not try to make any assumptions about these value types.

To solve this issue, you must supply **Custom Type Converters** to a specific `Mapper`:

```ts
const mapper = createMapper(/*...*/);

mapper
    .addTypeConverter(String, Number, (str) => parseInt(str))
    .addTypeConverter(String, Date, (str) => new Date(str))
    .addTypeConverter(String, Boolean, (str) => Boolean(str));

mapper.createMap(Source, Destination);
```

Here, we're telling AutoMapper:

-   If you are mapping a `String` to a `Number`, use `parseInt()`
-   If you are mapping a `String` to a `Date`, use `new Date()`
-   If you are mapping a `String` to a `Boolean`, use `Boolean()`

```ts
const source = new Source();
source.value1 = '123';
source.value2 = '10/14/1991';
source.value3 = 'truthy';

const destination = mapper.map(source, Destination, Source);
/**
 * Destination {
    value1: 123, // number
    value2: Mon Oct 14 1991 00:00:00 GMT-0500 (Central Daylight Time), // a Date instance
    value3; true // boolean
 * }
 */
```

-   **core:** adjust mapWith signature ([2df08ac](https://github.com/nartc/mapper/commit/2df08ac629239aece8909e8961dcc977510567d8))

### Bug Fixes

-   **core:** fail fast when mapping is not found ([95a196f](https://github.com/nartc/mapper/commit/95a196f470b401ccb04e612085e83458d0442104))
-   **core:** null check mapping before applying typeConverters ([5d87147](https://github.com/nartc/mapper/commit/5d87147c0aad0c59be7f7f1a3fe789f259df1ce5))
-   **core:** null check mappingProp and nestedMappingPair before continue ([850cafb](https://github.com/nartc/mapper/commit/850cafbe0e659b265ae84a65cb1870560e5a5fd4))

### Refactor

-   **classes:** always add metaResult to nestedConstructible (to account for primitives) ([5717928](https://github.com/nartc/mapper/commit/5717928e8f0126f159db4c3d4a64ff719d7d011d))
-   **core:** clean up createMapper with less null coalescing ([cdcc39a](https://github.com/nartc/mapper/commit/cdcc39af87f7390723ccf053e3c4aac56f9e7a52))
-   **core:** clean up initialize mappings ([8239789](https://github.com/nartc/mapper/commit/82397896a84593142aa8ae4647fd3bc9dc55ff81))
-   **core:** reformat map ([81992a1](https://github.com/nartc/mapper/commit/81992a1367d6bc07601b8eadff8ee4a35b70f93c))
-   **pojos:** always add metaResult to nestedMetadata (to account for primitives) ([00cce02](https://github.com/nartc/mapper/commit/00cce0229b43110f638465f9f0e27e195c4a93cb))

### Documentations

-   add Custom Type Converter ([05f02a5](https://github.com/nartc/mapper/commit/05f02a584c96ac2f921c628cf0c988d6edb0a307))
-   **classes:** add comment about limitation of array properties ([#326](https://github.com/nartc/mapper/issues/326)) ([866e311](https://github.com/nartc/mapper/commit/866e311765ff36e4665220ea02e04fd04b28bff7))
-   **classes:** fix link issue ([#327](https://github.com/nartc/mapper/issues/327)) ([2030b50](https://github.com/nartc/mapper/commit/2030b503e29835d4cd5c2b72cf63313da522d3c6))

### [5.0.1](https://github.com/nartc/mapper/compare/5.0.0...5.0.1) (2021-07-22)

### Bug Fixes

-   **nestjs:** bump peerDeps ([11fbc5c](https://github.com/nartc/mapper/commit/11fbc5cc3a4838792920874a956bad9ebc4eaec9))

## [5.0.0](https://github.com/nartc/mapper/compare/4.2.2...5.0.0) (2021-07-22)

### ⚠ BREAKING CHANGES

-   Cutting a new major version due upgrade to NestJS v8

### Features

-   update Nx ([04e3673](https://github.com/nartc/mapper/commit/04e3673c34fe97bb9ed1c0d4fa189941a9513b40))
-   upgrade nest 8 ([f23ee9a](https://github.com/nartc/mapper/commit/f23ee9a5148886ec1e112572b821164a59cb8c34)), closes [#313](https://github.com/nartc/mapper/issues/313)

### Bug Fixes

-   should not map undefined value when mapMutate ([#317](https://github.com/nartc/mapper/issues/317)) ([416e498](https://github.com/nartc/mapper/commit/416e498c9b7007c313365814c02e6beadf50ef5f))

### Refactor

-   **core:** extract setMemberReturn function ([b67d5ee](https://github.com/nartc/mapper/commit/b67d5ee1d3d8e2bf1a26aafa1a08656c3a8a1282))

### Documentations

-   add [@huybn5776](https://github.com/huybn5776) as a contributor ([2414b79](https://github.com/nartc/mapper/commit/2414b792b739ff799c05ed1d6da3f010f03181b0))
-   update docusaurus and adjust extend plugin example ([023b67d](https://github.com/nartc/mapper/commit/023b67dfcd1938a15fb128bd6059027b187f7f5a)), closes [#320](https://github.com/nartc/mapper/issues/320)

### [4.2.2](https://github.com/nartc/mapper/compare/4.2.1...4.2.2) (2021-07-08)

### Refactor

-   **classes:** use cached length for loops ([21435b7](https://github.com/nartc/mapper/commit/21435b7a8c458cc69138e6931196f318bd9358ab))
-   **core:** use cached length for loops; misc. variable changes ([697ee81](https://github.com/nartc/mapper/commit/697ee8198d7265ac99df25e71c1fd5fbef2a3110))
-   **pojos:** use cached length for loops ([6740a5d](https://github.com/nartc/mapper/commit/6740a5d49084ff3fea947c8532c79e66713f512d))

### [4.2.1](https://github.com/nartc/mapper/compare/4.2.0...4.2.1) (2021-07-02)

### Bug Fixes

-   **core:** only add writable property to unmappedKeys ([aa565aa](https://github.com/nartc/mapper/commit/aa565aab0d55b3a0f474ab5a487f84e256062ab0))

### Documentations

-   add [@robsonhermes](https://github.com/robsonhermes) as a contributor ([04f5755](https://github.com/nartc/mapper/commit/04f57553f42ebef634e9153c99da944d14bad73d))
-   clean up whitespace ([6e7d199](https://github.com/nartc/mapper/commit/6e7d199666672722946cdf87e4c54f059e887c30))
-   **component:** added required tsconfig switches for @AutoMap ([#309](https://github.com/nartc/mapper/issues/309)) ([7d6ab91](https://github.com/nartc/mapper/commit/7d6ab91b4318f5086f37026e21e300ab398a399a)), closes [#307](https://github.com/nartc/mapper/issues/307)

### Refactor

-   **core:** adjust typings ([23f1fa0](https://github.com/nartc/mapper/commit/23f1fa0b932244b7e59bf28c4e544db06f127824))

## [4.2.0](https://github.com/nartc/mapper/compare/4.1.0...4.2.0) (2021-06-15)

### Features

-   use array to store paths ([#303](https://github.com/nartc/mapper/issues/303)) ([d201093](https://github.com/nartc/mapper/commit/d20109363db3549874cc54071f802c747d551de5))

## [4.1.0](https://github.com/nartc/mapper/compare/4.0.0...4.1.0) (2021-06-09)

### Features

-   **core:** use proxy to get members from selector function ([#301](https://github.com/nartc/mapper/issues/301)) ([704c6ad](https://github.com/nartc/mapper/commit/704c6adc984d62c63e179394512762d88777c8aa))

### Documentations

-   add [@micalevisk](https://github.com/micalevisk) as a contributor ([29500ad](https://github.com/nartc/mapper/commit/29500ad0708ad81810c06ad4cf9c558e4c537aa5))
-   add @AliYusuf95 as a contributor ([956aceb](https://github.com/nartc/mapper/commit/956aceb3d2b98c2afb396146348da790f5b31a3a))
-   update docusaurus beta ([9e09d67](https://github.com/nartc/mapper/commit/9e09d6726b82412fe03c6a79aee5528d63166a03))

## [4.0.0](https://github.com/nartc/mapper/compare/3.5.2...4.0.0) (2021-05-18)

### ⚠ BREAKING CHANGES

-   Upgrade to Nx 12.3.3

### Features

-   upgrade Nx ([ea0eff6](https://github.com/nartc/mapper/commit/ea0eff6b34cd79eb9db9492eed2f7b63f58366cc))
-   upgrade packages ([329828e](https://github.com/nartc/mapper/commit/329828e47023eccd3306fa7df9268dcb80ea7975))
-   **core:** add partial support for ES6 computed property names ([#293](https://github.com/nartc/mapper/issues/293)) ([93d3f66](https://github.com/nartc/mapper/commit/93d3f66a97313fdbdb1798d789e366fba4e501ac)), closes [#289](https://github.com/nartc/mapper/issues/289)

### [3.5.2](https://github.com/nartc/mapper/compare/3.5.1...3.5.2) (2021-04-09)

### Bug Fixes

-   **types:** remove all named tuples to support TS <4 ([9de3c72](https://github.com/nartc/mapper/commit/9de3c72284a975538a1f5b3676047b0407690cd9))

### Documentations

-   **classes:** add more comments to AutoMap decorator ([b00a01c](https://github.com/nartc/mapper/commit/b00a01c486da3470676cc24fc35c6ab76339dc36))

### [3.5.1](https://github.com/nartc/mapper/compare/3.5.0...3.5.1) (2021-04-09)

### Bug Fixes

-   **classes:** only save metadata if typeFn is not null ([3f03f8c](https://github.com/nartc/mapper/commit/3f03f8c2ae9ba43e4b545167878c566378dafe39))

## [3.5.0](https://github.com/nartc/mapper/compare/3.4.2...3.5.0) (2021-04-07)

### Features

-   **classes:** add logic to handle getter only properties ([d081ac6](https://github.com/nartc/mapper/commit/d081ac65440ccae0af703ada9354003871305bb3))

#### Deprecations:

-   **classes:** `AutoMap` decorator now accepts an `AutoMapOptions` instead. The other usage have been marked **deprecated**.

```ts
class Foo {
    // before
    @AutoMap(() => Bar)
    bar: Bar;

    // after
    @AutoMap({ typeFn: () => Baz })
    baz: Baz;
}
```

-   **core:** allow mapWithArguments to accept Resolver ([8f1dfc6](https://github.com/nartc/mapper/commit/8f1dfc6f27d829aec16e0ffc79d31edab6316569))

### Refactor

-   **core:** move isResolver to utils ([ea2bc42](https://github.com/nartc/mapper/commit/ea2bc429c3cebe247589778a6ab99a9374d96799))

### Documentations

-   update docs deps and add new docs ([16719ff](https://github.com/nartc/mapper/commit/16719ff596a6a0c1d52ff91d98e13bd7db5d0064))

### [3.4.2](https://github.com/nartc/mapper/compare/3.4.1...3.4.2) (2021-03-22)

### Bug Fixes

-   **core:** pass extraArguments down to nested mapping ([10465be](https://github.com/nartc/mapper/commit/10465be62102f8914eaadc5fe29e6897670b59c7))

### [3.4.1](https://github.com/nartc/mapper/compare/3.4.0...3.4.1) (2021-03-16)

### Bug Fixes

-   **nestjs:** fix memoize util ([e56887b](https://github.com/nartc/mapper/commit/e56887b0a0dacebd7522acd895c7dc9a53b257b4))

## [3.4.0](https://github.com/nartc/mapper/compare/3.3.0...3.4.0) (2021-03-14)

### Features

-   **nestjs:** add MapPipe to transform Query and Body ([d8198e0](https://github.com/nartc/mapper/commit/d8198e00f7874c4324a22d7ef3fbdd3023b23fc6))

### Bug Fixes

-   **core:** add non-null assertion to mapMemberFn[misc] when transformation type is MapFrom/MapWith ([746e94e](https://github.com/nartc/mapper/commit/746e94ec6c9e077fd5000789a2dbf97cb7a79a15))

### Documentations

-   add docs about MapPipe ([8a8d673](https://github.com/nartc/mapper/commit/8a8d673944674f3dd390634f87c2a03e37c7b6d2))

# [3.3.0](https://github.com/nartc/mapper/compare/3.2.2...3.3.0) (2021-03-12)

### Bug Fixes

-   **classes:** expose getMetadataList as public API ([b5bde21](https://github.com/nartc/mapper/commit/b5bde21f49f42d21cb8e2ab1aca48d6a5fbb7ab9))

### Features

-   **classes/mapped-types:** add Mapped Types ([46e02ba](https://github.com/nartc/mapper/commit/46e02ba9fc55f2c9472b53de29dbc831b5b0d846))

## [3.2.2](https://github.com/nartc/mapper/compare/3.2.1...3.2.2) (2021-03-06)

### Bug Fixes

-   **sequelize:** only run intiialize on sequelize model ([05c3d82](https://github.com/nartc/mapper/commit/05c3d825f52944c4b739f2c9cbed1af1e69b658f))

## [3.2.1](https://github.com/nartc/mapper/compare/3.2.0...3.2.1) (2021-03-06)

### Bug Fixes

-   **sequelize:** make options optional ([8355120](https://github.com/nartc/mapper/commit/8355120feeb5a64292980aa9054d547442af6485))

# [3.2.0](https://github.com/nartc/mapper/compare/3.1.0...3.2.0) (2021-03-06)

### Features

-   **core:** use postMap if available ([fb22792](https://github.com/nartc/mapper/commit/fb227929bc47445f0db669a8aa5c36e2b51b5f82))
-   **sequelize:** add postMap to instantiate a Model instance from map result ([9552516](https://github.com/nartc/mapper/commit/9552516db1a73e630d2983789800dd60b1728a99))
-   **types:** add postMap to MapPlugin ([bbdd895](https://github.com/nartc/mapper/commit/bbdd895afaca40238a6affdec1de0fe3f7e99435))

# [3.1.0](https://github.com/nartc/mapper/compare/3.0.11...3.1.0) (2021-03-06)

### Bug Fixes

-   **classes:** move all single functions to exported utils ([219b917](https://github.com/nartc/mapper/commit/219b917de42c90c87a051f555422627c4c094bab))
-   **core:** make sure to bind plugin to preMap this context ([19479a3](https://github.com/nartc/mapper/commit/19479a3d022d598f68e08216f1c97ca30b2401d2))
-   **types:** add instantiate to MapPlugin public API ([53343f9](https://github.com/nartc/mapper/commit/53343f9494c31b6a434ed05e05977b65f1201ced))

### Features

-   **classes:** expose Constructible type ([2c3eaf0](https://github.com/nartc/mapper/commit/2c3eaf0a369892a73f3ec88fcff8aadc3223d054))
-   **classes:** expose instantiate ([b2dd592](https://github.com/nartc/mapper/commit/b2dd59292a1441ec0b4ba4d4893805de680788e7))
-   **pojos:** expose instantiate as public API ([528b193](https://github.com/nartc/mapper/commit/528b193ce579278e152eecd5a4f9b95f9183ff5f))
-   **sequelize:** add sequelize plugin ([b9105bb](https://github.com/nartc/mapper/commit/b9105bb23a8ab3c3970ea29022c14c1a031e813d))

## [3.0.11](https://github.com/nartc/mapper/compare/3.0.10...3.0.11) (2021-03-04)

### Bug Fixes

-   **core:** null check for source selector on MapFrom ([a489d9c](https://github.com/nartc/mapper/commit/a489d9c72f007b3f6e66d2c91d7895a200621410))

## [3.0.10](https://github.com/nartc/mapper/compare/3.0.9...3.0.10) (2021-02-26)

### Bug Fixes

-   **classes:** make sure to reassign metadataList ([ebd53dc](https://github.com/nartc/mapper/commit/ebd53dcf2ddf4562b0645d9f55720f980398e710))

## [3.0.9](https://github.com/nartc/mapper/compare/3.0.8...3.0.9) (2021-02-26)

### Bug Fixes

-   **core:** use isEmpty to check for nested metakey instead of using length ([0329e6e](https://github.com/nartc/mapper/commit/0329e6eab6327f33ffae36177afb18bcd3255055))

## [3.0.8](https://github.com/nartc/mapper/compare/3.0.7...3.0.8) (2021-02-24)

### Bug Fixes

-   **classes:** clean up optional chaining operator on function calls ([e6c3299](https://github.com/nartc/mapper/commit/e6c329908c3133c275c1f69c71303e3ab390733d))
-   **core:** clean up optional chaining ([d223d79](https://github.com/nartc/mapper/commit/d223d791a5ed3de75e47eae87a596ffde77efe82))
-   **core:** run beforeMap in mapArray with an empty array instead ([2975071](https://github.com/nartc/mapper/commit/2975071965b25b814cdee1b13ed7e5faa10b63d3))
-   **nestjs:** revert back to resolved Promise. nextTick seems to run a little behind ([5a91c31](https://github.com/nartc/mapper/commit/5a91c31460c0c3d92f45801cd4d670dbafad0114))
-   **nestjs:** use process.nextTick instead of resolved Promise ([4dd8da6](https://github.com/nartc/mapper/commit/4dd8da60d4c96069b343add34bed15abb2432dfb))
-   **pojos:** clean up optional chaining operator on function calls ([65304a7](https://github.com/nartc/mapper/commit/65304a783a456650031c8685584dd437ac0eb4e7))

## [3.0.7](https://github.com/nartc/mapper/compare/3.0.6...3.0.7) (2021-02-22)

### Bug Fixes

-   **nestjs:** move addProfile code to the micro task queue ([70b268c](https://github.com/nartc/mapper/commit/70b268cd6f93aab4592253eb48a54df10554214c)), closes [#264](https://github.com/nartc/mapper/issues/264)

## [3.0.6](https://github.com/nartc/mapper/compare/3.0.5...3.0.6) (2021-02-21)

### Bug Fixes

-   **experimental/transformer-plugin:** adjust transformer plugin to have a workaround for ESM ([1f862d0](https://github.com/nartc/mapper/commit/1f862d02885f83a58e18705fdbbc45716211a0c0))

## [3.0.5](https://github.com/nartc/mapper/compare/3.0.2...3.0.5) (2021-02-19)

### Bug Fixes

-   **classes:** merge metadata from Reflection and Factory fn ([393a7d3](https://github.com/nartc/mapper/commit/393a7d385a9b843c9f923407895c7ad26d441337))
-   **experimental/transformer-plugin:** fix options ([bac5074](https://github.com/nartc/mapper/commit/bac507469237f299d2f2ea7d2298baed5d2fcbed))
-   **experimental/transformer-plugin:** adjust merging options with default options ([c4c123b](https://github.com/nartc/mapper/commit/c4c123b1058ea317cdc36de612d801d7b595186d))

## [3.0.2](https://github.com/nartc/mapper/compare/3.0.1...3.0.2) (2021-02-19)

### Bug Fixes

-   **experimental/transformer-plugin:** fix publish ([c90047a](https://github.com/nartc/mapper/commit/c90047a88bf22a220a462a39e7e9aadb53e25a4d)), closes [#261](https://github.com/nartc/mapper/issues/261)

## [3.0.1](https://github.com/nartc/mapper/compare/3.0.0...3.0.1) (2021-02-19)

### Bug Fixes

-   **experimental/transformer-plugin:** move into classes ([05aae8a](https://github.com/nartc/mapper/commit/05aae8ab113b31408ef3f6ccdcdb3fd2393eba2a))

# [3.0.0](https://github.com/nartc/mapper/compare/2.2.1...3.0.0) (2021-02-19)

### Bug Fixes

-   **classes:** treat property as primitives if metaResult is null. Default Date to undefined if valueAtKey is undefined ([8e17527](https://github.com/nartc/mapper/commit/8e17527dc27dedfea6060a44f4bb5cbbcd62f224)), closes [#254](https://github.com/nartc/mapper/issues/254)
-   **core:** treat null metadata/Date same as null value aka just map the value. add logic for isNullMetadata to MappingPropert ([97f260d](https://github.com/nartc/mapper/commit/97f260d4507d3829acf5f0b24bc7bc4edd875f83))
-   **pojos:** treat property as primitives if metaResult is null. Date member to be returned as undefined if valueAtKey is undefined ([3e474ab](https://github.com/nartc/mapper/commit/3e474ab4cf5932c2ab34efe88e0cfeaf0c70973f))
-   **types:** add isNullMetadata to MappingTransformation ([a0b39d9](https://github.com/nartc/mapper/commit/a0b39d999baaafd10b77178c346ef58c3ab08a93))

### Features

-   **classes:** add logic to take advantage of transformer plugin if used ([f3aca21](https://github.com/nartc/mapper/commit/f3aca21124424f5effed5a03627bacf52dd1c94f))
-   **experimental/transformer-plugin:** add transformer plugin for classes package ([67cdd29](https://github.com/nartc/mapper/commit/67cdd29a5abee34a977e29b8161dadff14a612b4))
-   **pojos:** allow to pass in null for createMetadataMap to treat something as primitives ([7357ad5](https://github.com/nartc/mapper/commit/7357ad5692c0380eac4ef11a9ef62f14d8392a5e))

### BREAKING CHANGES

-   **pojos:** Previously, `null` was used to **skip** properties. Now, use `false` instead,
    `null` means something else.

## [2.2.1](https://github.com/nartc/mapper/compare/2.2.0...2.2.1) (2021-02-14)

### Bug Fixes

-   **core:** move isDateConstructor and isPrimitiveConstructor from plugins to core ([997528b](https://github.com/nartc/mapper/commit/997528b0c2d8dca5a85c384e40aaf11f4b17d542))
-   **core:** utilize extraArguments in mapArray ([ac5bb40](https://github.com/nartc/mapper/commit/ac5bb4030a9b67fc8c143e3fcd7c8e4550031780))

### Refactor

-   **core**: clean up misc ([61f4f65](https://github.com/nartc/mapper/commit/61f4f65c6a12ff6de7ea963d89f2f8df5e968931))
-   **classes/pojos**: use `isDateConstructor` and `isPrimitiveConstructor` from core ([b1dc211](https://github.com/nartc/mapper/commit/b1dc2112aa3a0084229a1531424084e222748c00), [66a2f33](https://github.com/nartc/mapper/commit/66a2f33528ddbea5ab0fb8cd891a0e9b1ca9a796))

# [2.2.0](https://github.com/nartc/mapper/compare/2.1.1...2.2.0) (2021-02-14)

### Features

-   **core:** add mapWithArguments ([2732300](https://github.com/nartc/mapper/commit/2732300a7454cc9c266d2a2b5e0714d59fd4f1ae))
-   **types:** add mapWithArguments to typing definitions ([4b52da3](https://github.com/nartc/mapper/commit/4b52da34947e8fe6cd74e60e7f14435ad7d6f939))

## [2.1.1](https://github.com/nartc/mapper/compare/2.1.0...2.1.1) (2021-02-06)

### Bug Fixes

-   **core:** null/undefined check for source in map and mapArray ([b37d29a](https://github.com/nartc/mapper/commit/b37d29af616e2bc257a58058acdeab2a5e856710))

# [2.1.0](https://github.com/nartc/mapper/compare/2.0.1...2.1.0) (2021-02-03)

### Bug Fixes

-   adjust config ([b074b21](https://github.com/nartc/mapper/commit/b074b21aeb004dac188c6e93eb99317c5c7710e0))

### Features

-   **classes:** add AUTOMAP_PROPERTIES_METADATA_KEY to public api ([1165380](https://github.com/nartc/mapper/commit/116538006a94e0efa3170c31c859385fca356264))

## [2.0.1](https://github.com/nartc/mapper/compare/2.0.0...2.0.1) (2021-02-02)

### Bug Fixes

-   **core:** ensure to call mapArray with mapWith if sourceValue is an Array ([0eef348](https://github.com/nartc/mapper/commit/0eef348221265869f047339af8422d3292eacee8)), closes [#253](https://github.com/nartc/mapper/issues/253)

# [2.0.0](https://github.com/nartc/mapper/compare/1.2.0...2.0.0) (2021-01-31)

### Features

-   enable strict mode ([6456bec](https://github.com/nartc/mapper/commit/6456bec68becae47509d7d59bb71d24007d07503))
-   **classes:** strict mode friendly ([bac51e9](https://github.com/nartc/mapper/commit/bac51e9dc93090fd7ea4db865f99bb940b572d38))
-   **core:** strict mode friendly ([5178c3c](https://github.com/nartc/mapper/commit/5178c3caa1536aca12a9611a0471a6b2a206d50c))
-   **nestjs:** strict mode friendly ([64abad4](https://github.com/nartc/mapper/commit/64abad4c09d43449108ad63921f0e81ef5cac307))
-   **pojos:** strict mode friendly ([deedc1b](https://github.com/nartc/mapper/commit/deedc1be9bb5dca86dbfa8ad945436ead1ac2c9d))
-   **types:** strict mode friendly ([f8e6211](https://github.com/nartc/mapper/commit/f8e62111ebcfb5422ab3606587fc2288072b91b6))

### BREAKING CHANGES

-   This release enables strict mode for automapper. The type is stricter which might
    affect your current implementations.

# [1.2.0](https://github.com/nartc/mapper/compare/1.1.1...1.2.0) (2021-01-31)

### Features

-   **core:** add logic to run preMapArray if available when invoking mapArray ([f1f97f3](https://github.com/nartc/mapper/commit/f1f97f30c3fd07b573951d8fdc61437ca5264256))
-   **types:** add MapArrayOptions and adjust mapArray signature ([9d2df49](https://github.com/nartc/mapper/commit/9d2df49fa77f8126e431b9ae0b3ecd05ee0f95ab))

### Documentations

-   Add documentation on how to extend a plugin. Please check [Docs](https://automapperts.netlify.app) for more information.

## [1.1.1](https://github.com/nartc/mapper/compare/1.1.0...1.1.1) (2021-01-30)

### Bug Fixes

-   **classes:** ensure to use return value of concat() ([705cbec](https://github.com/nartc/mapper/commit/705cbecee34d935669de4f1678eb980ef7af4fd4))

# [1.1.0](https://github.com/nartc/mapper/compare/1.0.4...1.1.0) (2021-01-30)

### Bug Fixes

-   **classes:** adjust code smell ([cf53a1f](https://github.com/nartc/mapper/commit/cf53a1f0bfcd472105a5f8fe127bd0c2b782ca53))
-   **core:** adjust code smell ([736f58d](https://github.com/nartc/mapper/commit/736f58d94012d901ccc6980c026e06afe75eba98))
-   **pojos:** adjust code smell ([4682fbf](https://github.com/nartc/mapper/commit/4682fbf7ea0f3a18a7c6c32849bf3e0d99c4721b))

### Features

-   **core:** better error message for mapping operation error ([550d8e8](https://github.com/nartc/mapper/commit/550d8e87dbebf8e699b48454f11ef841712d732a))

## [1.0.4](https://github.com/nartc/mapper/compare/1.0.3...1.0.4) (2021-01-29)

### Bug Fixes

-   **nestjs:** ensure mapper is safe for accessing with optional chaining ([83307f5](https://github.com/nartc/mapper/commit/83307f59a510c2b8dfdfa81adbe25e3453ad9a13))

## [1.0.3](https://github.com/nartc/mapper/compare/1.0.2...1.0.3) (2021-01-28)

### Bug Fixes

-   **pojos:** add Array to isPrimitiveConstructor. This is to match with the behavior in `classes` ([6415463](https://github.com/nartc/mapper/commit/64154631ce779121332f2d42aa649c265f497b8f))

## [1.0.2](https://github.com/nartc/mapper/compare/1.0.1...1.0.2) (2021-01-28)

### Bug Fixes

-   **classes:** isPrimitiveConstructor also returns true for Array constructor ([c5d111d](https://github.com/nartc/mapper/commit/c5d111d27a3fa1a81d99837cca665bc985bc2799)), closes [#249](https://github.com/nartc/mapper/issues/249)

## [1.0.1](https://github.com/nartc/mapper/compare/1.0.0...1.0.1) (2021-01-25)

### Bug Fixes

-   **nestjs:** make sure mapOptions passed in as null if it's empty ([93e3761](https://github.com/nartc/mapper/commit/93e37616600e79aea5d04b128d0cfe810aa0fadc)), closes [#247](https://github.com/nartc/mapper/issues/247)

# [1.0.0](https://github.com/nartc/mapper/compare/1.0.0-beta.9...1.0.0) (2021-01-17)

## Official release 1.0.0

Please check out [README](./README.md) for more information

# [1.0.0-beta.9](https://github.com/nartc/mapper/compare/1.0.0-beta.8...1.0.0-beta.9) (2021-01-11)

### Refactor

-   **nestjs:** use `global` options in `DynamicModule` for `forRoot` instead of `@Global` decorator ([8f05d8f](https://github.com/nartc/mapper/commit/8f05d8faaa3520052219b1dd87386246d68e5765))

### Bug Fixes

-   **nestjs:** adjust globalNamingConventions options to also accept a single NamingConvention ([822c790](https://github.com/nartc/mapper/commit/822c7908bea682fff87f00c06d5c88d7e7060480))

### Features

-   **nestjs:** add MapInterceptor ([1a811e5](https://github.com/nartc/mapper/commit/1a811e528fdab2648aa43841ee23661ea9a9c17f))

# [1.0.0-beta.8](https://github.com/nartc/mapper/compare/1.0.0-beta.7...1.0.0-beta.8) (2021-01-09)

### Refactor

-   **core:** adjust public API of core ([d86af1d](https://github.com/nartc/mapper/commit/d86af1d26d7005c0dcba442f0592b42f8fca7e06))

# [1.0.0-beta.7](https://github.com/nartc/mapper/compare/1.0.0-beta.6...1.0.0-beta.7) (2021-01-08)

### Bug Fixes

-   **core:** adjust getFlatteningSourcePath to take into account multiple parts path with naming conventions ([811568e](https://github.com/nartc/mapper/commit/811568ee9aa7da6ae7168a3db535054e7cf317cb))

# [1.0.0-beta.6](https://github.com/nartc/mapper/compare/1.0.0-beta.5...1.0.0-beta.6) (2021-01-07)

### Features

-   **core:** add ability to pass in destinationObj and mutate on map instead of return ([46e920d](https://github.com/nartc/mapper/commit/46e920db51f7c8042926064696dc894a502a509f))
-   **core:** adjust set() to have setMutate() and not return ([bdd6d17](https://github.com/nartc/mapper/commit/bdd6d1767ce74e20853b5f2bd4edaf8d7b996929))

# [1.0.0-beta.5](https://github.com/nartc/mapper/compare/1.0.0-beta.4...1.0.0-beta.5) (2021-01-05)

### Bug Fixes

-   **classes:** rename types.d.ts to types.ts to include with bundle ([3a15f72](https://github.com/nartc/mapper/commit/3a15f7241543c93af7301422428c790eecf5e60e))
-   **pojos:** adjust typings for createMetadataMap ([18cc504](https://github.com/nartc/mapper/commit/18cc5042b529989c00ece99d79c8789e02a43f24))

# [1.0.0-beta.4](https://github.com/nartc/mapper/compare/1.0.0-beta.3...1.0.0-beta.4) (2021-01-05)

### Bug Fixes

-   **core:** remove properties added by istanbul for not failing in test coverage ([1dcdcdb](https://github.com/nartc/mapper/commit/1dcdcdb5a3ba1ebe57ac4314b15ef0c945733aa7))

# [1.0.0-beta.3](https://github.com/nartc/mapper/compare/1.0.0-beta.2...1.0.0-beta.3) (2021-01-04)

### Bug Fixes

-   **classes:** skip empty metadataList before looping ([88ecf9c](https://github.com/nartc/mapper/commit/88ecf9c04b235a6c39fe4c72c5bacabb332c8ea7))
-   **core:** check null and fail fast in getPathRecursive ([449da22](https://github.com/nartc/mapper/commit/449da225695ce75f3e11cc4d7544165c8aa74cb3))

# [1.0.0-beta.2](https://github.com/nartc/mapper/compare/1.0.0-beta.1...1.0.0-beta.2) (2021-01-04)

# [1.0.0-beta.1](https://github.com/nartc/mapper/compare/1.0.0-beta.0...1.0.0-beta.1) (2021-01-04)

# 1.0.0-beta.0 (2021-01-04)

### Bug Fixes

-   **core:** adjust isDefined ([6187453](https://github.com/nartc/mapper/commit/618745362e1252ac4a105d28ec79abcc279bc8f8))

### Features

-   **nestjs:** add nestjs integration package ([db550c3](https://github.com/nartc/mapper/commit/db550c383264979572d15d4d2d61feb0c3a3ae60))
-   add core ([04cd18c](https://github.com/nartc/mapper/commit/04cd18cc3190311bc94e3ef5b07222a9bdaf3b02))
-   prepare for beta ([17e2199](https://github.com/nartc/mapper/commit/17e2199d7c07686a9895a7b3ed4cee392764d81e))
-   start working on some core functionalities ([5d4fe2b](https://github.com/nartc/mapper/commit/5d4fe2bb906120a3c798b0a6aeb78c422db82cd1))