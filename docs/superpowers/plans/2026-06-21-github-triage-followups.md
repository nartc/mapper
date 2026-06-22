# GitHub Triage Followups

Created from valid PR work that should not be lost after closing stale or superseded PRs during the `chore/9.0-migrate` triage.

Also includes recent issues reopened after correcting the initial triage pass, where closing under the 9.0 umbrella was too aggressive.

## Followup items

### Async mapping parity

Source PRs/issues: #537, #622

-   Audit async mapping behavior against the closed PRs.
-   Ensure async member resolvers, `beforeMap`, and `afterMap` are awaited consistently.
-   Check whether any PR behavior is still missing from the `chore/9.0-migrate` true async mapping implementation.
-   Add focused regression coverage for any remaining async parity gaps.

Status: partially addressed in this sweep with async `beforeMap` sequencing coverage/fix; broader #622 parity items remain design-sized.

### Similar-prefix flattening

Source issues/PRs: #624, #573, #601

-   Revisit flattening behavior when source member names share similar prefixes.
-   Add regression coverage for nested properties whose names overlap by prefix.
-   Confirm branch behavior does not accidentally bind to the wrong flattened source path.

Status: addressed in this sweep with `getFlatteningPaths` unit coverage and #624 integration coverage.

### Mapping-level array callbacks

Source PR: #618

-   Evaluate whether `beforeMapArray` and `afterMapArray` should be first-class mapping-level callbacks.
-   Decide API shape and consistency with existing `beforeMap` / `afterMap` semantics.
-   If accepted, add implementation and array-specific regression coverage.

Status: addressed in this sweep with `beforeMapArray` / `afterMapArray`, sync/override/async coverage, and mutate-array slot initialization fix.

### Windows transformer path rewriting

Source PR: #619

-   Audit transformer path rewriting on Windows paths.
-   Add path normalization tests for backslash-separated paths.
-   Ensure generated or rewritten import paths remain portable across Windows and POSIX.

Status: addressed in this sweep with focused POSIX/Windows `replaceImportPath` coverage and normalized path rewriting.

### Private constructor / factory construction support

Source issue: #625

-   Investigate type/runtime support for destination classes with private constructors.
-   Determine whether `constructUsing` plus a static factory method can support this without weakening constructor typing too broadly.
-   Add a type-level regression test for classes that cannot be directly constructed but can be produced by a factory.

Status: addressed in this sweep by widening model identifiers and adding #625 coverage.

### Logger output bug

Source issue: #616

-   Fix `AutoMapperLogger` methods so default logging actually invokes `console.*`.
-   Current implementation still uses `console.*.bind(...)` without calling the bound function.
-   Add coverage or a small regression check for default warning/error output.

Status: addressed in this sweep with unit coverage for all default logger methods.

### Abstract constructor typing with `constructUsing`

Source issue: #614

-   Investigate `ModelIdentifier` / `Constructor` typing for abstract destination classes.
-   Ensure `constructUsing` can map to an abstract base type when the callback returns a concrete subclass.
-   Add type-level coverage for abstract base destination identifiers.

Status: addressed in this sweep by widening model identifiers and adding #614 coverage.

### Union-type `@AutoMap()` metadata behavior

Source issue: #600

-   Revisit `@AutoMap()` behavior when `design:type` is `Object` for union types like `string | null`.
-   Decide whether inferred `Object` should remain skipped, emit better guidance, or support a safe fallback.
-   Add docs or regression coverage for nullable/union primitive properties.

Status: intentionally deferred. Runtime `design:type === Object` is ambiguous; a blanket change would also affect arbitrary object/interface fields. Keep issue open for explicit API/docs design.

### Undefined property after mapping with mixed explicit/implicit members

Source issue: #595

-   Reproduce the reported case where an explicitly mapped `Date -> string` member causes another matching `id` member to remain `undefined`.
-   Determine whether this is a configuration gap, metadata issue, or core mapping bug.
-   Add a focused repro before changing behavior.

Status: regression added in this sweep; current behavior already preserves implicit mapping, so no production fix was needed.

### UI/card styling contribution

Source issue: #623

-   Re-evaluate whether the docs/site UI card styling proposal still applies.
-   If accepted, scope it as a separate UI/docs task rather than mixing with 9.0 runtime work.

Status: deferred. Docs UI work should wait until the docs platform direction is decided.
