import automapperTransformerPlugin, {
    before,
} from '@automapper/classes/transformer-plugin';
import type { CompilerOptions } from 'typescript/lib/tsserverlibrary';
import {
    createProgram,
    ModuleKind,
    ScriptTarget,
    transpileModule,
} from 'typescript/lib/tsserverlibrary';
import {
    compiledCreateSkillRequestDto,
    compiledSkillEntity,
    createSkillRequestDtoText,
    skillEntityText,
} from './issues/486/models';

import {
    userModelText,
    userModelTextStrict,
    userModelTranspiledText,
    userModelTranspiledTextESM,
} from './model';

describe('Classes - Transformer Plugin', () => {
    describe('named before import', () => {
        it('should compile', () => {
            const tsConfig: CompilerOptions = {
                module: ModuleKind.CommonJS,
                target: ScriptTarget.ESNext,
                noEmitHelpers: true,
            };

            const fileName = 'user.model.ts';
            const programFixture = createProgram([fileName], tsConfig);

            const result = transpileModule(userModelText, {
                compilerOptions: tsConfig,
                fileName,
                transformers: {
                    before: [before({}, programFixture)],
                },
            });

            expect(result.outputText).toBeTruthy();
            expect(result.outputText).toEqual(userModelTranspiledText);
        });
    });
    describe('default import', () => {
        it('should compile', () => {
            const tsConfig: CompilerOptions = {
                module: ModuleKind.CommonJS,
                target: ScriptTarget.ESNext,
                noEmitHelpers: true,
            };

            const fileName = 'user.model.ts';
            const programFixture = createProgram([fileName], tsConfig);

            const result = transpileModule(userModelText, {
                compilerOptions: tsConfig,
                fileName,
                transformers: {
                    before: [
                        automapperTransformerPlugin(programFixture).before,
                    ],
                },
            });

            expect(result.outputText).toBeTruthy();
            expect(result.outputText).toEqual(userModelTranspiledText);
        });

        it('should compile for es2015', () => {
            const tsConfig: CompilerOptions = {
                module: ModuleKind.ES2015,
                target: ScriptTarget.ESNext,
                noEmitHelpers: true,
            };

            const fileName = 'user.model.ts';
            const programFixture = createProgram([fileName], tsConfig);

            const result = transpileModule(userModelText, {
                compilerOptions: tsConfig,
                fileName,
                transformers: {
                    before: [
                        automapperTransformerPlugin(programFixture).before,
                    ],
                },
            });

            expect(result.outputText).toBeTruthy();
            expect(result.outputText).toEqual(userModelTranspiledTextESM);
        });

        it('should compile strict mode', () => {
            const tsConfig: CompilerOptions = {
                module: ModuleKind.CommonJS,
                target: ScriptTarget.ESNext,
                noEmitHelpers: true,
                strict: true,
            };

            const fileName = 'user.model.ts';
            const programFixture = createProgram([fileName], tsConfig);

            const result = transpileModule(userModelTextStrict, {
                compilerOptions: tsConfig,
                fileName,
                transformers: {
                    before: [
                        automapperTransformerPlugin(programFixture).before,
                    ],
                },
            });

            expect(result.outputText).toBeTruthy();
            expect(result.outputText).toEqual(userModelTranspiledText);
        });

        it('should compile strict mode for es2015', () => {
            const tsConfig: CompilerOptions = {
                module: ModuleKind.ES2015,
                target: ScriptTarget.ESNext,
                noEmitHelpers: true,
                strict: true,
            };

            const fileName = 'user.model.ts';
            const programFixture = createProgram([fileName], tsConfig);

            const result = transpileModule(userModelTextStrict, {
                compilerOptions: tsConfig,
                fileName,
                transformers: {
                    before: [
                        automapperTransformerPlugin(programFixture).before,
                    ],
                },
            });

            expect(result.outputText).toBeTruthy();
            expect(result.outputText).toEqual(userModelTranspiledTextESM);
        });
    });
    describe('issue 486', () => {
        it('should compile', () => {
            const tsConfig: CompilerOptions = {
                module: ModuleKind.CommonJS,
                target: ScriptTarget.ESNext,
                noEmitHelpers: true,
            };

            const createSkillFileName = 'create-skill.dto.ts';
            const createSkillProgramStructure = createProgram(
                [createSkillFileName],
                tsConfig
            );
            const createSkillResult = transpileModule(
                createSkillRequestDtoText,
                {
                    compilerOptions: tsConfig,
                    fileName: createSkillFileName,
                    transformers: {
                        before: [
                            automapperTransformerPlugin(
                                createSkillProgramStructure
                            ).before,
                        ],
                    },
                }
            );
            expect(createSkillResult.outputText).toBeTruthy();
            expect(createSkillResult.outputText).toEqual(
                compiledCreateSkillRequestDto
            );

            const skillEntityFileName = 'skill.entity.ts';
            const skillEntityProgramStructure = createProgram(
                [skillEntityFileName],
                tsConfig
            );
            const skillEntityResult = transpileModule(skillEntityText, {
                compilerOptions: tsConfig,
                fileName: skillEntityFileName,
                transformers: {
                    before: [
                        automapperTransformerPlugin(skillEntityProgramStructure)
                            .before,
                    ],
                },
            });
            expect(skillEntityResult.outputText).toBeTruthy();
            expect(skillEntityResult.outputText).toEqual(compiledSkillEntity);
        });
    });
});
