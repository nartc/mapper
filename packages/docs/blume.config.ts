import { defineConfig } from "blume";

export default defineConfig({
  title: "AutoMapper TypeScript",
  description:
    "Convention-based object mapping for TypeScript, with strategies for classes, POJOs, ORMs, and NestJS.",
  github: {
    owner: "nartc",
    repo: "mapper",
    branch: "main",
    dir: "packages/docs",
  },
  lastModified: true,
  theme: {
    accent: {
      light: "#2b70b8",
      dark: "#63a9ea",
    },
    background: {
      light: "#fbfdff",
      dark: "#0b121a",
    },
    mode: "system",
    radius: "md",
  },
  deployment: {
    output: "static",
    site: "https://automapperts.netlify.app",
  },
  navigation: {
    tabs: [
      { label: "Docs", path: "/" },
      { label: "API", path: "/api" },
      { label: "Changelog", path: "/changelog" },
    ],
    sidebar: {
      display: "page",
    },
  },
  redirects: [
    { from: "/docs", to: "/getting-started/overview", status: 301 },
    {
      from: "/docs/getting-started/migrate-to-automapper-v8",
      to: "/getting-started/migrate-v8",
      status: 301,
    },
    {
      from: "/docs/misc/fake-async",
      to: "/misc/async-mapping",
      status: 301,
    },
    {
      from: "/docs/fundamentals/auto-flattening",
      to: "/fundamentals/naming-convention#auto-flattening",
      status: 301,
    },
    {
      from: "/fundamentals/auto-flattening",
      to: "/fundamentals/naming-convention#auto-flattening",
      status: 301,
    },
    { from: "/blog", to: "/changelog", status: 301 },
  ],
});
