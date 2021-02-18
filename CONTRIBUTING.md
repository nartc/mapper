## CONTRIBUTING

- Fork this repo and clone the forked on your local environment
- Run `npm install` to install all dependencies
  - Run `npx husky install` to enable commit hooks
- Start working on changes

### Structure

```
_docs-site
_packages
 \_classes
 \_core
 \_integration-test
 \_nestjs
 \_nestjs-integration-test
 \_pojos
 \_types
```

- `docs-site`: This is the documentations site powered by Docusaurus.
- `classes`: `classes` plugin
- `core`: `core` package
- `nestjs`: `nestjs` integration
- `pojos`: `pojos` plugin
- `types`: type definitions
- `integration-test`/`nestjs-integration-test`: tests for both plugins and `nestjs` integration

### Test your changes

- Run `npm run test:all` to run all test suites.

### Commit

After you finish with the changes

- Run `git add .` to stage all changes
- Run `npm run commit` to start Conventional Commit flow
  - Pick one of the type of changes from the options: feat, fix, chore, docs etc...
  - If you modify changes in `core`, `classes`, `nestjs`, `pojos`, or `types`, please include at least one of this as the `scope`. Eg: `feat(classes)`, or `fix(core)` etc...

### Commit Hooks

`pre-commit` hook will run some linting and formatting. Depending on the amount of changes, this might take a while.

### PR

When ready, please submit a PR.
