import type {
    Program,
    SourceFile,
    TransformationContext,
} from 'typescript/lib/tsserverlibrary';
import { ModelVisitor } from './lib/model-visitor';
import type { AutomapperTransformerPluginOptions } from './lib/options';
import { isFilenameMatched } from './lib/utils';
import { version as pluginVersion } from './lib/version';

const defaultOptions: AutomapperTransformerPluginOptions = {
    modelFileNameSuffix: ['.entity.ts', '.model.ts', '.dto.ts', '.vm.ts'],
};

/**
 * Remember to increase the version whenever transformer's content is changed. This is to inform Jest to not reuse
 * the previous cache which contains old transformer's content
 */
export const version = pluginVersion;

// Used for constructing cache key
export const name = 'automapper-transformer-plugin';

export default function automapperTransformerPlugin(
    program: Program,
    options: AutomapperTransformerPluginOptions = {}
) {
    options = { ...defaultOptions, ...options };
    return {
        before(context: TransformationContext) {
            // Reset ModelVisitor before going into a new file
            ModelVisitor.reset();
            return (sourceFile: SourceFile): SourceFile => {
                // only check files that contain models
                if (
                    isFilenameMatched(
                        options.modelFileNameSuffix || [],
                        sourceFile.fileName
                    )
                ) {
                    return ModelVisitor.visit(sourceFile, context, program);
                }

                return sourceFile;
            };
        },
    };
}

export const before = (
    options: AutomapperTransformerPluginOptions,
    program: Program
) => automapperTransformerPlugin(program, options).before;

export const tspBefore = (
  program: Program,
  options: AutomapperTransformerPluginOptions
) => automapperTransformerPlugin(program, options).before;

export * from './lib/options';
export * from './lib/constants';
