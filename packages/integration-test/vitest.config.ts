import { vitestConfig } from '../../vitest.shared';

// supertest is a bare CommonJS function export (module.exports = fn, no
// `.default`); vite's SSR interop otherwise leaves the default import as a
// non-callable namespace. Inlining lets vitest re-bundle it with proper interop.
export default vitestConfig({
    server: { deps: { inline: ['supertest'] } },
});
