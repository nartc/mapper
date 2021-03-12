module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        {
          type: 'doc',
          id: 'introduction/what-why',
        },
        {
          type: 'doc',
          id: 'introduction/technical',
        },
        {
          type: 'doc',
          id: 'introduction/alternatives',
        },
      ],
    },
    {
      type: 'doc',
      id: 'architecture',
    },
    {
      type: 'category',
      label: 'Getting started',
      items: [
        { type: 'doc', id: 'getting-started/installation' },
        { type: 'doc', id: 'getting-started/introduce-to-automapper' },
        { type: 'doc', id: 'getting-started/introduce-to-profile' },
      ],
    },
    {
      type: 'doc',
      id: 'fundamentals',
    },
    {
      type: 'category',
      label: 'Mapping Configuration',
      items: [
        { type: 'doc', id: 'mapping-configuration/auto' },
        {
          type: 'category',
          label: 'Custom Configuration',
          items: [
            {
              type: 'doc',
              id: 'mapping-configuration/introduce-to-custom-configuration',
            },
            {
              type: 'doc',
              id: 'mapping-configuration/map-from',
            },
            {
              type: 'doc',
              id: 'mapping-configuration/condition',
            },
            {
              type: 'doc',
              id: 'mapping-configuration/from-value',
            },
            {
              type: 'doc',
              id: 'mapping-configuration/map-with',
            },
            {
              type: 'doc',
              id: 'mapping-configuration/convert-using',
            },
            {
              type: 'doc',
              id: 'mapping-configuration/null-substitution',
            },
            {
              type: 'doc',
              id: 'mapping-configuration/ignore',
            },
            {
              type: 'doc',
              id: 'mapping-configuration/map-with-arguments',
            },
            {
              type: 'doc',
              id: 'mapping-configuration/map-defer',
            },
          ],
        },
        {
          type: 'doc',
          id: 'mapping-configuration/pre-condition',
        },
      ],
    },
    {
      type: 'category',
      label: 'Miscellaneous',
      items: [
        { type: 'doc', id: 'misc/callbacks' },
        { type: 'doc', id: 'misc/map-mutate' },
        { type: 'doc', id: 'misc/error-handler' },
        { type: 'doc', id: 'misc/limitations' },
      ],
    },
    {
      type: 'category',
      label: 'Plugins',
      items: [
        { type: 'doc', id: 'plugins-system/introduce-to-plugins' },
        {
          type: 'category',
          label: 'Classes',
          items: [
            { type: 'doc', id: 'plugins-system/introduce-to-classes' },
            { type: 'doc', id: 'plugins-system/classes-metadata' },
            { type: 'doc', id: 'plugins-system/classes-limitations' },
            { type: 'doc', id: 'plugins-system/classes-transformer-plugin' },
            { type: 'doc', id: 'plugins-system/classes-mapped-types' },
          ],
        },
        {
          type: 'category',
          label: 'POJOs',
          items: [
            { type: 'doc', id: 'plugins-system/introduce-to-pojos' },
            { type: 'doc', id: 'plugins-system/pojos-metadata' },
          ],
        },
        {
          type: 'category',
          label: 'Sequelize',
          items: [{ type: 'doc', id: 'plugins-system/introduce-to-sequelize' }],
        },
        {
          type: 'category',
          label: 'Customization',
          items: [
            {
              type: 'doc',
              id: 'plugins-system/create-plugin',
            },
            {
              type: 'doc',
              id: 'plugins-system/extend-plugin',
            },
          ],
        },
      ],
    },
    {
      type: 'doc',
      id: 'nestjs',
    },
    {
      type: 'doc',
      id: 'migrations',
    },
  ],
  api: [
    {
      type: 'category',
      label: 'Core',
      items: [{ type: 'doc', id: 'api/create-mapper' }],
    },
  ],
};
