import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention } from '@automapper/core';
import { AutomapperModule } from '@automapper/nestjs';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { BarDto } from '../foo/foo';
import { FooModule } from '../foo/foo.module';
import { FooExtendDto } from './foo-extend';
import { FooExtendModule } from './foo-extend.module';

describe('AppController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                AutomapperModule.forRoot({
                    strategyInitializer: classes(),
                    namingConventions: new CamelCaseNamingConvention(),
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
        const fooExtendDto = new FooExtendDto();
        fooExtendDto.fooFoo = 'fooFoo';
        fooExtendDto.fooDto = 'foo';
        fooExtendDto.barDto = new BarDto();
        fooExtendDto.barDto.barDto = 'bar';

        return request(app.getHttpServer())
            .get('/foo-extend')
            .expect(200)
            .expect(JSON.parse(JSON.stringify(fooExtendDto)));
    });
});
