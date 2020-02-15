module.exports = {
  title: '@nartc/automapper',
  tagline: 'An object-object automapper written in TypeScript',
  url: 'https://github.com/nartc/mapper',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'nartc', // Usually your GitHub org/user name.
  projectName: '@nartc/mapper', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '@nartc/automapper',
      links: [
        {
          href: 'https://github.com/nartc/mapper',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/doc1',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2',
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
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/nartc/automapper',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/nartc1410',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} @nartc/automapper, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
