import { AutoMap, classes } from '@automapper/classes';
import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';

class TransformationAuditGetAllResponseDto {
    @AutoMap()
    id!: string;

    @AutoMap(() => Date)
    transformationDate!: Date;
}

class TransformationAuditGetAllResponseState {
    @AutoMap()
    id!: string;

    @AutoMap()
    transformationDate!: string;
}

describe('Issue 595', () => {
    it('should keep implicit member mapping when another member is explicitly mapped', () => {
        const mapper = createMapper({ strategyInitializer: classes() });

        createMap(
            mapper,
            TransformationAuditGetAllResponseDto,
            TransformationAuditGetAllResponseState,
            forMember(
                (destination) => destination.transformationDate,
                mapFrom((source) => source.transformationDate.toISOString())
            )
        );

        const source = new TransformationAuditGetAllResponseDto();
        source.id = 'audit-id';
        source.transformationDate = new Date('2024-02-06T15:51:43.000Z');

        const destination = mapper.map(
            source,
            TransformationAuditGetAllResponseDto,
            TransformationAuditGetAllResponseState
        );

        expect(destination.id).toEqual('audit-id');
        expect(destination.transformationDate).toEqual(
            '2024-02-06T15:51:43.000Z'
        );
    });
});
