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
        'introduction/why',
        'introduction/anti-pitch',
        'introduction/author-use-case',
        'introduction/problems-with-typescript',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['guides/getting-started', 'guides/basic-concept'],
    },
    {
      type: 'category',
      label: 'Usages',
      items: [
        {
          type: 'category',
          label: 'Initialization',
          items: [
            'usages/init/create-map',
            'usages/init/add-profile',
            'usages/init/initialize',
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
                'usages/mapping-configuration/for-member/basic',
                'usages/mapping-configuration/for-member/map-from',
                'usages/mapping-configuration/for-member/condition',
                'usages/mapping-configuration/for-member/from-value',
                'usages/mapping-configuration/for-member/map-with',
                'usages/mapping-configuration/for-member/converter',
                'usages/mapping-configuration/for-member/resolver',
                'usages/mapping-configuration/for-member/null-substitution',
                'usages/mapping-configuration/for-member/ignore',
                'usages/mapping-configuration/for-member/pre-condition',
              ],
            },
            {
              type: 'category',
              label: 'Reverse Mapping',
              items: [
                'usages/mapping-configuration/reverse-map/basic',
                'usages/mapping-configuration/reverse-map/for-path',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Features',
          items: [
            'usages/features/nested-model',
            'usages/features/flattening',
            'usages/features/inheritance',
            'usages/features/plain-object',
            'usages/features/naming-convention',
            'usages/features/getters',
            'usages/features/date-time',
            'usages/features/callbacks',
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
