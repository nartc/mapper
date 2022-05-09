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
            navbar: {
                title: 'AutoMapper TypeScript',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg',
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
            hideableSidebar: true,
            algolia: {
                appId: 'X3519DOIGT',
                apiKey: '1e924199f121846bb38de348a2cfe5e3',
                indexName: 'automerts',
                rateLimit: 8,
                startUrls: ['https://automapperts.netlify.app/'],
                sitemaps: ['https://automapperts.netlify.app/sitemap.xml'],
                ignoreCanonicalTo: true,
                discoveryPatterns: ['https://automapperts.netlify.app/**'],
                actions: [
                    {
                        indexName: 'automerts',
                        pathsToMatch: ['https://automapperts.netlify.app/**'],
                        recordExtractor: ({ $, helpers }) => {
                            // priority order: deepest active sub list header -> navbar active item -> 'Documentation'
                            const lvl0 =
                                $(
                                    '.menu__link.menu__link--sublist.menu__link--active, .navbar__item.navbar__link--active'
                                )
                                    .last()
                                    .text() || 'Documentation';

                            return helpers.docsearch({
                                recordProps: {
                                    lvl0: {
                                        selectors: '',
                                        defaultValue: lvl0,
                                    },
                                    lvl1: 'header h1',
                                    lvl2: 'article h2',
                                    lvl3: 'article h3',
                                    lvl4: 'article h4',
                                    lvl5: 'article h5, article td:first-child',
                                    lvl6: 'article h6',
                                    content:
                                        'article p, article li, article td:last-child',
                                },
                                indexHeadings: true,
                                aggregateContent: true,
                            });
                        },
                    },
                ],
                initialIndexSettings: {
                    automerts: {
                        "minWordSizefor1Typo": 3,
                        "minWordSizefor2Typos": 7,
                        "hitsPerPage": 20,
                        "maxValuesPerFacet": 100,
                        "minProximity": 1,
                        "searchableAttributes": [
                          "unordered(hierarchy_radio_camel.lvl0)",
                          "unordered(hierarchy_radio.lvl0)",
                          "unordered(hierarchy_radio_camel.lvl1)",
                          "unordered(hierarchy_radio.lvl1)",
                          "unordered(hierarchy_radio_camel.lvl2)",
                          "unordered(hierarchy_radio.lvl2)",
                          "unordered(hierarchy_radio_camel.lvl3)",
                          "unordered(hierarchy_radio.lvl3)",
                          "unordered(hierarchy_radio_camel.lvl4)",
                          "unordered(hierarchy_radio.lvl4)",
                          "unordered(hierarchy_radio_camel.lvl5)",
                          "unordered(hierarchy_radio.lvl5)",
                          "unordered(hierarchy_radio_camel.lvl6)",
                          "unordered(hierarchy_radio.lvl6)",
                          "unordered(hierarchy_camel.lvl0)",
                          "unordered(hierarchy.lvl0)",
                          "unordered(hierarchy_camel.lvl1)",
                          "unordered(hierarchy.lvl1)",
                          "unordered(hierarchy_camel.lvl2)",
                          "unordered(hierarchy.lvl2)",
                          "unordered(hierarchy_camel.lvl3)",
                          "unordered(hierarchy.lvl3)",
                          "unordered(hierarchy_camel.lvl4)",
                          "unordered(hierarchy.lvl4)",
                          "unordered(hierarchy_camel.lvl5)",
                          "unordered(hierarchy.lvl5)",
                          "unordered(hierarchy_camel.lvl6)",
                          "unordered(hierarchy.lvl6)",
                          "content"
                        ],
                        "numericAttributesToIndex": null,
                        "attributesToRetrieve": [
                          "hierarchy",
                          "content",
                          "anchor",
                          "url",
                          "url_without_anchor",
                          "type"
                        ],
                        "allowTyposOnNumericTokens": false,
                        "ignorePlurals": true,
                        "camelCaseAttributes": [
                          "hierarchy",
                          "hierarchy_radio",
                          "content"
                        ],
                        "advancedSyntax": true,
                        "attributeCriteriaComputedByMinProximity": true,
                        "distinct": true,
                        "unretrievableAttributes": null,
                        "optionalWords": null,
                        "attributesForFaceting": [
                          "type",
                          "lang",
                          "language",
                          "version",
                          "docusaurus_tag"
                        ],
                        "attributesToSnippet": [
                          "content:10"
                        ],
                        "attributesToHighlight": [
                          "hierarchy",
                          "hierarchy_camel",
                          "content"
                        ],
                        "paginationLimitedTo": 1000,
                        "attributeForDistinct": "url",
                        "exactOnSingleWordQuery": "attribute",
                        "ranking": [
                          "words",
                          "filters",
                          "typo",
                          "attribute",
                          "proximity",
                          "exact",
                          "custom"
                        ],
                        "customRanking": [
                          "desc(weight.pageRank)",
                          "desc(weight.level)",
                          "asc(weight.position)"
                        ],
                        "separatorsToIndex": "",
                        "removeWordsIfNoResults": "allOptional",
                        "queryType": "prefixLast",
                        "highlightPreTag": "<span class=\"algolia-docsearch-suggestion--highlight\">",
                        "highlightPostTag": "</span>",
                        "snippetEllipsisText": "",
                        "alternativesAsExact": [
                          "ignorePlurals",
                          "singleWordSynonym"
                        ]
                      },
                },
            },
        }),
};

module.exports = config;
