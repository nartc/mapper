## [5.0.0](https://github.com/nartc/mapper/compare/4.2.2...5.0.0) (2021-07-22)

### ⚠ BREAKING CHANGES

- Cutting a new major version due upgrade to NestJS v8

### Features

- update Nx ([04e3673](https://github.com/nartc/mapper/commit/04e3673c34fe97bb9ed1c0d4fa189941a9513b40))
- upgrade nest 8 ([f23ee9a](https://github.com/nartc/mapper/commit/f23ee9a5148886ec1e112572b821164a59cb8c34)), closes [#313](https://github.com/nartc/mapper/issues/313)

### Bug Fixes

- should not map undefined value when mapMutate ([#317](https://github.com/nartc/mapper/issues/317)) ([416e498](https://github.com/nartc/mapper/commit/416e498c9b7007c313365814c02e6beadf50ef5f))

### Refactor

- **core:** extract setMemberReturn function ([b67d5ee](https://github.com/nartc/mapper/commit/b67d5ee1d3d8e2bf1a26aafa1a08656c3a8a1282))

### Documentations

- add [@huybn5776](https://github.com/huybn5776) as a contributor ([2414b79](https://github.com/nartc/mapper/commit/2414b792b739ff799c05ed1d6da3f010f03181b0))
- update docusaurus and adjust extend plugin example ([023b67d](https://github.com/nartc/mapper/commit/023b67dfcd1938a15fb128bd6059027b187f7f5a)), closes [#320](https://github.com/nartc/mapper/issues/320)

### [4.2.2](https://github.com/nartc/mapper/compare/4.2.1...4.2.2) (2021-07-08)

### Refactor

- **classes:** use cached length for loops ([21435b7](https://github.com/nartc/mapper/commit/21435b7a8c458cc69138e6931196f318bd9358ab))
- **core:** use cached length for loops; misc. variable changes ([697ee81](https://github.com/nartc/mapper/commit/697ee8198d7265ac99df25e71c1fd5fbef2a3110))
- **pojos:** use cached length for loops ([6740a5d](https://github.com/nartc/mapper/commit/6740a5d49084ff3fea947c8532c79e66713f512d))

### [4.2.1](https://github.com/nartc/mapper/compare/4.2.0...4.2.1) (2021-07-02)

### Bug Fixes

- **core:** only add writable property to unmappedKeys ([aa565aa](https://github.com/nartc/mapper/commit/aa565aab0d55b3a0f474ab5a487f84e256062ab0))

### Documentations

- add [@robsonhermes](https://github.com/robsonhermes) as a contributor ([04f5755](https://github.com/nartc/mapper/commit/04f57553f42ebef634e9153c99da944d14bad73d))
- clean up whitespace ([6e7d199](https://github.com/nartc/mapper/commit/6e7d199666672722946cdf87e4c54f059e887c30))
- **component:** added required tsconfig switches for @AutoMap ([#309](https://github.com/nartc/mapper/issues/309)) ([7d6ab91](https://github.com/nartc/mapper/commit/7d6ab91b4318f5086f37026e21e300ab398a399a)), closes [#307](https://github.com/nartc/mapper/issues/307)

### Refactor

- **core:** adjust typings ([23f1fa0](https://github.com/nartc/mapper/commit/23f1fa0b932244b7e59bf28c4e544db06f127824))

## [4.2.0](https://github.com/nartc/mapper/compare/4.1.0...4.2.0) (2021-06-15)

### Features

- use array to store paths ([#303](https://github.com/nartc/mapper/issues/303)) ([d201093](https://github.com/nartc/mapper/commit/d20109363db3549874cc54071f802c747d551de5))

## [4.1.0](https://github.com/nartc/mapper/compare/4.0.0...4.1.0) (2021-06-09)

### Features

- **core:** use proxy to get members from selector function ([#301](https://github.com/nartc/mapper/issues/301)) ([704c6ad](https://github.com/nartc/mapper/commit/704c6adc984d62c63e179394512762d88777c8aa))

### Documentations

- add [@micalevisk](https://github.com/micalevisk) as a contributor ([29500ad](https://github.com/nartc/mapper/commit/29500ad0708ad81810c06ad4cf9c558e4c537aa5))
- add @AliYusuf95 as a contributor ([956aceb](https://github.com/nartc/mapper/commit/956aceb3d2b98c2afb396146348da790f5b31a3a))
- update docusaurus beta ([9e09d67](https://github.com/nartc/mapper/commit/9e09d6726b82412fe03c6a79aee5528d63166a03))

## [4.0.0](https://github.com/nartc/mapper/compare/3.5.2...4.0.0) (2021-05-18)

### ⚠ BREAKING CHANGES

- Upgrade to Nx 12.3.3

### Features

- upgrade Nx ([ea0eff6](https://github.com/nartc/mapper/commit/ea0eff6b34cd79eb9db9492eed2f7b63f58366cc))
- upgrade packages ([329828e](https://github.com/nartc/mapper/commit/329828e47023eccd3306fa7df9268dcb80ea7975))
- **core:** add partial support for ES6 computed property names ([#293](https://github.com/nartc/mapper/issues/293)) ([93d3f66](https://github.com/nartc/mapper/commit/93d3f66a97313fdbdb1798d789e366fba4e501ac)), closes [#289](https://github.com/nartc/mapper/issues/289)

### [3.5.2](https://github.com/nartc/mapper/compare/3.5.1...3.5.2) (2021-04-09)

### Bug Fixes

- **types:** remove all named tuples to support TS <4 ([9de3c72](https://github.com/nartc/mapper/commit/9de3c72284a975538a1f5b3676047b0407690cd9))

### Documentations

- **classes:** add more comments to AutoMap decorator ([b00a01c](https://github.com/nartc/mapper/commit/b00a01c486da3470676cc24fc35c6ab76339dc36))

### [3.5.1](https://github.com/nartc/mapper/compare/3.5.0...3.5.1) (2021-04-09)

### Bug Fixes

- **classes:** only save metadata if typeFn is not null ([3f03f8c](https://github.com/nartc/mapper/commit/3f03f8c2ae9ba43e4b545167878c566378dafe39))

## [3.5.0](https://github.com/nartc/mapper/compare/3.4.2...3.5.0) (2021-04-07)

### Features

- **classes:** add logic to handle getter only properties ([d081ac6](https://github.com/nartc/mapper/commit/d081ac65440ccae0af703ada9354003871305bb3))

#### Deprecations:

- **classes:** `AutoMap` decorator now accepts an `AutoMapOptions` instead. The other usage have been marked **deprecated**.

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

- **core:** allow mapWithArguments to accept Resolver ([8f1dfc6](https://github.com/nartc/mapper/commit/8f1dfc6f27d829aec16e0ffc79d31edab6316569))

### Refactor

- **core:** move isResolver to utils ([ea2bc42](https://github.com/nartc/mapper/commit/ea2bc429c3cebe247589778a6ab99a9374d96799))

### Documentations

- update docs deps and add new docs ([16719ff](https://github.com/nartc/mapper/commit/16719ff596a6a0c1d52ff91d98e13bd7db5d0064))

### [3.4.2](https://github.com/nartc/mapper/compare/3.4.1...3.4.2) (2021-03-22)

### Bug Fixes

- **core:** pass extraArguments down to nested mapping ([10465be](https://github.com/nartc/mapper/commit/10465be62102f8914eaadc5fe29e6897670b59c7))

### [3.4.1](https://github.com/nartc/mapper/compare/3.4.0...3.4.1) (2021-03-16)

### Bug Fixes

- **nestjs:** fix memoize util ([e56887b](https://github.com/nartc/mapper/commit/e56887b0a0dacebd7522acd895c7dc9a53b257b4))

## [3.4.0](https://github.com/nartc/mapper/compare/3.3.0...3.4.0) (2021-03-14)

### Features

- **nestjs:** add MapPipe to transform Query and Body ([d8198e0](https://github.com/nartc/mapper/commit/d8198e00f7874c4324a22d7ef3fbdd3023b23fc6))

### Bug Fixes

- **core:** add non-null assertion to mapMemberFn[misc] when transformation type is MapFrom/MapWith ([746e94e](https://github.com/nartc/mapper/commit/746e94ec6c9e077fd5000789a2dbf97cb7a79a15))

### Documentations

- add docs about MapPipe ([8a8d673](https://github.com/nartc/mapper/commit/8a8d673944674f3dd390634f87c2a03e37c7b6d2))

# [3.3.0](https://github.com/nartc/mapper/compare/3.2.2...3.3.0) (2021-03-12)

### Bug Fixes

- **classes:** expose getMetadataList as public API ([b5bde21](https://github.com/nartc/mapper/commit/b5bde21f49f42d21cb8e2ab1aca48d6a5fbb7ab9))

### Features

- **classes/mapped-types:** add Mapped Types ([46e02ba](https://github.com/nartc/mapper/commit/46e02ba9fc55f2c9472b53de29dbc831b5b0d846))

## [3.2.2](https://github.com/nartc/mapper/compare/3.2.1...3.2.2) (2021-03-06)

### Bug Fixes

- **sequelize:** only run intiialize on sequelize model ([05c3d82](https://github.com/nartc/mapper/commit/05c3d825f52944c4b739f2c9cbed1af1e69b658f))

## [3.2.1](https://github.com/nartc/mapper/compare/3.2.0...3.2.1) (2021-03-06)

### Bug Fixes

- **sequelize:** make options optional ([8355120](https://github.com/nartc/mapper/commit/8355120feeb5a64292980aa9054d547442af6485))

# [3.2.0](https://github.com/nartc/mapper/compare/3.1.0...3.2.0) (2021-03-06)

### Features

- **core:** use postMap if available ([fb22792](https://github.com/nartc/mapper/commit/fb227929bc47445f0db669a8aa5c36e2b51b5f82))
- **sequelize:** add postMap to instantiate a Model instance from map result ([9552516](https://github.com/nartc/mapper/commit/9552516db1a73e630d2983789800dd60b1728a99))
- **types:** add postMap to MapPlugin ([bbdd895](https://github.com/nartc/mapper/commit/bbdd895afaca40238a6affdec1de0fe3f7e99435))

# [3.1.0](https://github.com/nartc/mapper/compare/3.0.11...3.1.0) (2021-03-06)

### Bug Fixes

- **classes:** move all single functions to exported utils ([219b917](https://github.com/nartc/mapper/commit/219b917de42c90c87a051f555422627c4c094bab))
- **core:** make sure to bind plugin to preMap this context ([19479a3](https://github.com/nartc/mapper/commit/19479a3d022d598f68e08216f1c97ca30b2401d2))
- **types:** add instantiate to MapPlugin public API ([53343f9](https://github.com/nartc/mapper/commit/53343f9494c31b6a434ed05e05977b65f1201ced))

### Features

- **classes:** expose Constructible type ([2c3eaf0](https://github.com/nartc/mapper/commit/2c3eaf0a369892a73f3ec88fcff8aadc3223d054))
- **classes:** expose instantiate ([b2dd592](https://github.com/nartc/mapper/commit/b2dd59292a1441ec0b4ba4d4893805de680788e7))
- **pojos:** expose instantiate as public API ([528b193](https://github.com/nartc/mapper/commit/528b193ce579278e152eecd5a4f9b95f9183ff5f))
- **sequelize:** add sequelize plugin ([b9105bb](https://github.com/nartc/mapper/commit/b9105bb23a8ab3c3970ea29022c14c1a031e813d))

## [3.0.11](https://github.com/nartc/mapper/compare/3.0.10...3.0.11) (2021-03-04)

### Bug Fixes

- **core:** null check for source selector on MapFrom ([a489d9c](https://github.com/nartc/mapper/commit/a489d9c72f007b3f6e66d2c91d7895a200621410))

## [3.0.10](https://github.com/nartc/mapper/compare/3.0.9...3.0.10) (2021-02-26)

### Bug Fixes

- **classes:** make sure to reassign metadataList ([ebd53dc](https://github.com/nartc/mapper/commit/ebd53dcf2ddf4562b0645d9f55720f980398e710))

## [3.0.9](https://github.com/nartc/mapper/compare/3.0.8...3.0.9) (2021-02-26)

### Bug Fixes

- **core:** use isEmpty to check for nested metakey instead of using length ([0329e6e](https://github.com/nartc/mapper/commit/0329e6eab6327f33ffae36177afb18bcd3255055))

## [3.0.8](https://github.com/nartc/mapper/compare/3.0.7...3.0.8) (2021-02-24)

### Bug Fixes

- **classes:** clean up optional chaining operator on function calls ([e6c3299](https://github.com/nartc/mapper/commit/e6c329908c3133c275c1f69c71303e3ab390733d))
- **core:** clean up optional chaining ([d223d79](https://github.com/nartc/mapper/commit/d223d791a5ed3de75e47eae87a596ffde77efe82))
- **core:** run beforeMap in mapArray with an empty array instead ([2975071](https://github.com/nartc/mapper/commit/2975071965b25b814cdee1b13ed7e5faa10b63d3))
- **nestjs:** revert back to resolved Promise. nextTick seems to run a little behind ([5a91c31](https://github.com/nartc/mapper/commit/5a91c31460c0c3d92f45801cd4d670dbafad0114))
- **nestjs:** use process.nextTick instead of resolved Promise ([4dd8da6](https://github.com/nartc/mapper/commit/4dd8da60d4c96069b343add34bed15abb2432dfb))
- **pojos:** clean up optional chaining operator on function calls ([65304a7](https://github.com/nartc/mapper/commit/65304a783a456650031c8685584dd437ac0eb4e7))

## [3.0.7](https://github.com/nartc/mapper/compare/3.0.6...3.0.7) (2021-02-22)

### Bug Fixes

- **nestjs:** move addProfile code to the micro task queue ([70b268c](https://github.com/nartc/mapper/commit/70b268cd6f93aab4592253eb48a54df10554214c)), closes [#264](https://github.com/nartc/mapper/issues/264)

## [3.0.6](https://github.com/nartc/mapper/compare/3.0.5...3.0.6) (2021-02-21)

### Bug Fixes

- **experimental/transformer-plugin:** adjust transformer plugin to have a workaround for ESM ([1f862d0](https://github.com/nartc/mapper/commit/1f862d02885f83a58e18705fdbbc45716211a0c0))

## [3.0.5](https://github.com/nartc/mapper/compare/3.0.2...3.0.5) (2021-02-19)

### Bug Fixes

- **classes:** merge metadata from Reflection and Factory fn ([393a7d3](https://github.com/nartc/mapper/commit/393a7d385a9b843c9f923407895c7ad26d441337))
- **experimental/transformer-plugin:** fix options ([bac5074](https://github.com/nartc/mapper/commit/bac507469237f299d2f2ea7d2298baed5d2fcbed))
- **experimental/transformer-plugin:** adjust merging options with default options ([c4c123b](https://github.com/nartc/mapper/commit/c4c123b1058ea317cdc36de612d801d7b595186d))

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
