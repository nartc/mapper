// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/oceanicNext');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'AutoMapper TypeScript',
    tagline: 'An object-object mapping solution by convention in TypeScript',
    url: 'https://automapperts.netlify.app/',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'nartc',
    projectName: 'mapper',
    trailingSlash: false, // remove trailing slashes from URLs/links
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    editUrl:
                        'https://github.com/nartc/mapper/tree/main/packages/documentations',
                },
                blog: {
                    showReadingTime: true,
                    editUrl:
                        'https://github.com/nartc/mapper/tree/main/packages/documentations',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],
    plugins: [
        [
            'docusaurus-plugin-typedoc',
            {
                id: 'api-core',
                entryPoints: ['../core/src/index.ts'],
                tsconfig: '../core/tsconfig.lib.json',
                sidebar: {
                    fullNames: true,
                    readmeLabel: 'README',
                },
                out: './api/core',
            },
        ],
        [
            'docusaurus-plugin-typedoc',
            {
                id: 'api-classes',
                entryPoints: ['../classes/src/index.ts'],
                tsconfig: '../classes/tsconfig.lib.json',
                sidebar: {
                    fullNames: true,
                    readmeLabel: 'README',
                },
                out: './api/classes',
            },
        ],
        [
            'docusaurus-plugin-typedoc',
            {
                id: 'api-pojos',
                entryPoints: ['../pojos/src/index.ts'],
                tsconfig: '../pojos/tsconfig.lib.json',
                sidebar: {
                    fullNames: true,
                    readmeLabel: 'README',
                },
                out: './api/pojos',
            },
        ],
        [
            'docusaurus-plugin-typedoc',
            {
                id: 'api-mikro',
                entryPoints: ['../mikro/src/index.ts'],
                tsconfig: '../mikro/tsconfig.lib.json',
                sidebar: {
                    fullNames: true,
                    readmeLabel: 'README',
                },
                out: './api/mikro',
            },
        ],
        [
            'docusaurus-plugin-typedoc',
            {
                id: 'api-sequelize',
                entryPoints: ['../sequelize/src/index.ts'],
                tsconfig: '../sequelize/tsconfig.lib.json',
                sidebar: {
                    fullNames: true,
                    readmeLabel: 'README',
                },
                out: './api/sequelize',
            },
        ],
        [
            'docusaurus-plugin-typedoc',
            {
                id: 'api-nestjs',
                entryPoints: ['../nestjs/src/index.ts'],
                tsconfig: '../nestjs/tsconfig.lib.json',
                sidebar: {
                    fullNames: true,
                    readmeLabel: 'README',
                },
                out: './api/nestjs',
            },
        ],
    ],
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            docs: {
                sidebar: {
                    hideable: true,
                },
            },
            navbar: {
                title: 'AutoMapper TypeScript',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.png',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'getting-started/overview',
                        position: 'left',
                        label: 'Documentation',
                    },
                    {
                        type: 'doc',
                        docId: 'api/core/index',
                        label: 'API',
                        position: 'left',
                    },
                    { to: '/blog', label: 'Blog', position: 'left' },
                    {
                        href: 'https://github.com/nartc/mapper',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Documentation',
                        items: [
                            {
                                label: 'Tutorial',
                                to: '/docs/tutorial/preface',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Stack Overflow',
                                href: 'https://stackoverflow.com/questions/tagged/automapper',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/nartc1410',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                to: '/blog',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/nartc/mapper',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} AutoMapper TypeScript, Inc. Built with Docusaurus.`,
            },
            prism: {
                additionalLanguages: ['csharp'],
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
            algolia: {
                appId: 'X3519DOIGT',
                apiKey: '1e924199f121846bb38de348a2cfe5e3',
                indexName: 'automerts',
            },
        }),
};

module.exports = config;
