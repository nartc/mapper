## CONTRIBUTING

-   Fork this repo and clone the forked on your local environment
-   [Install **pnpm**](https://pnpm.io/installation)
-   Run `pnpm install` to install all dependencies
-   Run `npx husky install` to enable commit hooks
-   Start working on changes

### Structure

```
_packages
 \_classes
 \_core
 \_integration-test
 \_nestjs
 \_pojos
 \_documentations
```

-   `documentations`: This is the documentations site powered by Docusaurus.
-   `classes`: `classes` strategy
-   `core`: `core` package
-   `nestjs`: `nestjs` integration
-   `pojos`: `pojos` strategy
-   `integration-test`: integration tests for all strategies

### Test your changes

-   Run `npm run test` to run all test suites.

### Commit

After you finish with the changes

-   Run `git add .` to stage all changes
-   Run `npm run commit` to start Conventional Commit flow
    -   Pick one of the type of changes from the options: feat, fix, chore, docs etc...
    -   If you modify changes in `core`, `classes`, `nestjs`, `pojos`, or `types`, please include at least one of this as the `scope`. Eg: `feat(classes)`, or `fix(core)` etc...

### Semantic Versioning

`@automapper/*` follows SemVer (`major.minor.patch` versioning) and utilizes `release-it` to semi-automate the release process. The next version will be based on the type of changes from the commits

-   `feat` will issue a `minor` version bump. Eg: `1.0.0` -> `1.1.0`
-   `fix`, `perf`, and `refactor` will issue a `patch` version bump. Eg: `1.0.0` -> `1.0.1`
-   When asked about BREAKING CHANGES during the Conventional Commit flow, the `major` version will be bumped if you answer **YES**. Eg: `1.0.0` -> `2.0.0`

### CHANGELOG

`CHANGELOG` will be generated automatically by `release-it` based on the commits' messages. If you want to be thorough, please include some description of your changes in the PR so that I can manually add that to the `CHANGELOG` when we cut a new release.

### PR

When ready, please submit a PR.
