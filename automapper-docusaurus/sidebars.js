/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        {
          type: 'doc',
          id: 'introduction/why',
        },
        {
          type: 'doc',
          id: 'introduction/anti-pitch',
        },
        {
          type: 'doc',
          id: 'introduction/author-use-case',
        },
        {
          type: 'doc',
          id: 'introduction/problems-with-typescript',
        },
        {
          type: 'doc',
          id: 'introduction/async',
        },
        {
          type: 'doc',
          id: 'introduction/alternatives',
        },
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          type: 'doc',
          id: 'guides/getting-started',
        },
        {
          type: 'doc',
          id: 'guides/basic-concept',
        },
      ],
    },
    {
      type: 'category',
      label: 'Usages',
      items: [
        {
          type: 'category',
          label: 'Initialization',
          items: [
            {
              type: 'doc',
              id: 'usages/init/create-map',
            },
            {
              type: 'doc',
              id: 'usages/init/add-profile',
            },
            {
              type: 'doc',
              id: 'usages/init/with-global-settings',
            },
            {
              type: 'doc',
              id: 'usages/init/initialize',
            },
          ],
        },
        {
          type: 'category',
          label: 'Mapping Configuration',
          items: [
            {
              type: 'category',
              label: 'ForMember',
              items: [
                {
                  type: 'doc',
                  id:
                    'usages/mapping-configuration/for-member/basic',
                },
                {
                  type: 'doc',
                  id:
                    'usages/mapping-configuration/for-member/map-from',
                },
                {
                  type: 'doc',
                  id:
                    'usages/mapping-configuration/for-member/condition',
                },
                {
                  type: 'doc',
                  id:
                    'usages/mapping-configuration/for-member/from-value',
                },
                {
                  type: 'doc',
                  id:
                    'usages/mapping-configuration/for-member/map-with',
                },
                {
                  type: 'doc',
                  id:
                    'usages/mapping-configuration/for-member/converter',
                },
                {
                  type: 'doc',
                  id:
                    'usages/mapping-configuration/for-member/resolver',
                },
                {
                  type: 'doc',
                  id:
                    'usages/mapping-configuration/for-member/null-substitution',
                },
                {
                  type: 'doc',
                  id:
                    'usages/mapping-configuration/for-member/ignore',
                },
              ],
            },
            {
              type: 'category',
              label: 'Reverse Mapping',
              items: [
                {
                  type: 'doc',
                  id:
                    'usages/mapping-configuration/reverse-map/basic',
                },
                {
                  type: 'doc',
                  id:
                    'usages/mapping-configuration/reverse-map/for-path',
                },
              ],
            },
            {
              type: 'doc',
              id: 'usages/mapping-configuration/pre-condition',
            },
            {
              type: 'doc',
              id: 'usages/mapping-configuration/map-defer',
            },
          ],
        },
        {
          type: 'category',
          label: 'Features',
          items: [
            {
              type: 'doc',
              id: 'usages/features/nested-model',
            },
            {
              type: 'doc',
              id: 'usages/features/flattening',
            },
            {
              type: 'doc',
              id: 'usages/features/inheritance',
            },
            {
              type: 'doc',
              id: 'usages/features/plain-object',
            },
            {
              type: 'doc',
              id: 'usages/features/naming-convention',
            },
            {
              type: 'doc',
              id: 'usages/features/empty-value',
            },
            {
              type: 'doc',
              id: 'usages/features/getters',
            },
            {
              type: 'doc',
              id: 'usages/features/date-time',
            },
            {
              type: 'doc',
              id: 'usages/features/callbacks',
            },
            {
              type: 'doc',
              id: 'usages/features/javascript-support',
            },
          ],
        },
        {
          type: 'category',
          label: 'Avoids',
          items: [
            {
              type: 'doc',
              id: 'usages/avoids/circular-dependency',
            },
          ],
        },
      ],
    },
    {
      type: 'doc',
      id: 'nest',
    },
    {
      type: 'doc',
      id: 'plugin',
    },
    {
      type: 'link',
      label: 'API Reference',
      href: 'https://nartc.github.io/mapper/',
    },
  ],
};
