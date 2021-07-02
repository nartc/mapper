import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention } from '@automapper/core';
import { AutomapperModule } from '@automapper/nestjs';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { FooModule } from '../foo/foo.module';
import { BarVm } from '../models/foo';
import { FooExtendVm } from './foo-extend.model';
import { FooExtendModule } from './foo-extend.module';

describe('AppController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          options: [
            {
              name: 'classes',
              pluginInitializer: classes,
              namingConventions: new CamelCaseNamingConvention(),
            },
          ],
          singular: true,
        }),
        FooModule,
        FooExtendModule,
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /', () => {
    const fooExtendVm = new FooExtendVm();
    fooExtendVm.fooFoo = 'fooFoo';
    fooExtendVm.fooVm = 'foo';
    fooExtendVm.barVm = new BarVm();
    fooExtendVm.barVm.barVm = 'bar';

    return request(app.getHttpServer())
      .get('/foo-extend')
      .expect(200)
      .expect(JSON.parse(JSON.stringify(fooExtendVm)));
  });
});
