import type {
    Program,
    SourceFile,
    TransformationContext,
} from 'typescript/lib/tsserverlibrary';
import { ModelVisitor } from './lib/model-visitor';
import type { AutomapperTransformerPluginOptions } from './lib/options';
import { isFilenameMatched } from './lib/utils';

const defaultOptions: AutomapperTransformerPluginOptions = {
    modelFileNameSuffix: ['.entity.ts', '.model.ts', '.dto.ts', '.vm.ts'],
};

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

export * from './lib/options';
export * from './lib/constants';
