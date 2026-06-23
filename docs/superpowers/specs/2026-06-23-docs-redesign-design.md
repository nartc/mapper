# AutoMapper TypeScript Docs Redesign

## Context

The docs were migrated from Docusaurus to Astro and Starlight in `packages/docs`.
The first migration preserved content and generated API docs, but the site still
needs a deliberate design and content pass.

Current issues to address:

- The copied logo asset still reads as a Docusaurus-era asset, not an
  AutoMapper TypeScript identity.
- The homepage hero uses a generic programming background image.
- Code examples should follow Starlight and Expressive Code authoring patterns.
- The docs should be rewritten, not only converted, so the new site starts with
  a clearer information architecture and voice.

## Approved Direction

Use a practical, docs-led product homepage and a full content rewrite.

The homepage direction is light-first, professional, and focused on helping
developers reach the right docs path quickly. The main positioning is:

> Map by convention. Configure the exceptions.

The rewrite should use a teacherly but compact voice: explain the reason for a
concept, then show focused TypeScript examples without long essays.

## Homepage

The homepage should feel like the front door to a strong documentation site, not
a marketing splash page.

Hero requirements:

- Use a new custom AutoMapper TypeScript logo.
- Use a typed mapper glyph direction for the mark, based around a compact
  generic-type visual such as `<M>`.
- Use the headline "Map by convention. Configure the exceptions."
- Explain that AutoMapper TypeScript moves data between domain, DTO, and
  persistence shapes without repetitive property assignment.
- Provide a primary CTA for new users, such as "Start mapping".
- Provide a secondary CTA for migration users, such as "Migrate to v9".
- Replace the stock hero image with a custom source-to-target mapping diagram.
- Use real mapping terms in the diagram, such as `User`, `UserDto`,
  `createMap()`, `profile.bio`, and `fullName`.

Below the hero, route users into three clear paths:

- New to AutoMapper: concept, install, and first map.
- Migrating to v9: Node 20, ESM, package exports, removed packages, and peer
  updates.
- Using a framework or strategy: NestJS, classes, POJOs, MikroORM, and
  Sequelize.

Include a compact explanation of why the library exists:

- Convention-based property mapping.
- Explicit member configuration when conventions are not enough.
- Profiles for organizing mappings.
- Strategies for different model styles.

Avoid:

- Generic stock programming imagery.
- Docusaurus visual identity.
- A large marketing-only landing page that hides the docs entry points.

## Documentation Information Architecture

Organize the docs around learning paths first, then reference.

Proposed sidebar:

1. Start Here
   - Overview
   - Install
   - First map
   - Mental model

2. Learn AutoMapper
   - Create a mapper
   - Define mappings
   - Map objects and arrays
   - Profiles
   - Nested mapping
   - Flattening
   - Naming conventions
   - Before/after hooks
   - Mapping arguments

3. Configure Members
   - `forMember()`
   - `mapFrom()`
   - `ignore()`
   - `condition()`
   - `fromValue()`
   - `mapWith()`
   - `convertUsing()`
   - null/undefined substitution
   - deferred mapping

4. Strategies & Integrations
   - Classes
   - POJOs
   - NestJS
   - MikroORM
   - Sequelize
   - mapped types
   - transformer plugin

5. Migration
   - v8 to v9
   - v7 to v8 as legacy migration reference
   - package and runtime changes

6. Reference
   - Concepts glossary
   - Recipes
   - Generated API docs

Generated API docs should remain available but should not carry the learning
experience.

## Content Rewrite Rules

Treat the migrated docs as source material, not final prose.

Each conceptual page should:

- Start with the problem the page solves.
- State the recommended path.
- Show a small, consistent TypeScript example.
- Explain the important details after the example.
- Link to related concepts or reference pages.

Use consistent example names across the docs:

- `User`
- `UserDto`
- `Profile`
- `Address`
- `Bio`

Preserve current v9 branch facts:

- Node.js 20 or newer.
- ESM-only packages.
- Package exports and subpath imports.
- NestJS 10 and 11 peer support.
- `@automapper/zod` removal.
- Current strategy package behavior.

Use Starlight components where they improve scanning:

- `Tabs`
- `Steps`
- `Aside`
- `LinkCard`
- `CardGrid`

## Code Examples

Follow Starlight's Expressive Code syntax for code snippets.

Use:

- language identifiers such as `ts`, `bash`, and `diff lang="ts"`;
- titles such as `title="mapping-profile.ts"`;
- line highlights such as `{3-6}`;
- text highlights such as `"createMap"`;
- inserted and deleted markers for migration snippets;
- terminal-style frames for shell commands.

Avoid custom code block rendering unless the homepage needs a decorative code
panel. Documentation content should rely on Expressive Code.

## Theme And Visual System

The design should feel light-first while preserving Starlight's theme selector.
Do not disable light/dark/auto switching.

Use TypeScript blue as the primary color:

- Primary: `#3178c6`
- Darker accent: `#123b63`
- Light accent: `#dbeafe`

Dark mode should be supported by Starlight variables and Expressive Code themes,
but it should not feel like the only intended experience.

The final visual system should include:

- custom AutoMapper logo SVG;
- favicon derived from the new logo;
- homepage mapping diagram;
- consistent card and CTA styling;
- readable code highlighting in both light and dark themes.

## Implementation Scope

Pass 1: site shell and homepage.

- Replace Docusaurus-era logo assets.
- Add the custom typed mapper mark.
- Replace the external hero image with a custom mapping diagram.
- Confirm Starlight theme switching works.
- Configure Expressive Code explicitly for readable light and dark TypeScript
  examples.
- Make the homepage responsive and stable on mobile and desktop.

Pass 2: content rewrite.

- Rewrite the docs tree into the approved IA.
- Convert examples to consistent TypeScript examples.
- Replace old snippets with Expressive Code syntax.
- Preserve v9 migration facts.
- Keep generated API docs isolated under Reference.
- Keep `starlight-blog` for release notes, but make it secondary.

## Verification

Run:

```bash
pnpm --dir packages/docs check
```

```bash
pnpm --dir packages/docs build
```

The build should pass, generated pages should remain valid, and the
`starlight-links-validator` plugin should not report broken internal links.

For homepage and visual changes, inspect the running site or screenshots across
desktop and mobile viewport sizes.
