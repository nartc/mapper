// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
                        docId: 'intro',
                        position: 'left',
                        label: 'Tutorial',
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
                        title: 'Docs',
                        items: [
                            {
                                label: 'Tutorial',
                                to: '/docs/intro',
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
        }),
};

module.exports = config;
