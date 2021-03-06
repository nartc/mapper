import * as tss from 'typescript/lib/tsserverlibrary';
import type { AutomapperTransformerPluginOptions } from './lib/interfaces';
import { ModelVisitor } from './lib/model-visitor';
import { isFilenameMatched } from './lib/plugin-utils';

const defaultOptions: AutomapperTransformerPluginOptions = {
  modelFileNameSuffix: ['.model.ts', '.dto.ts', '.vm.ts'],
};

export default function automapperTransformerPlugin(
  program: tss.Program,
  options: AutomapperTransformerPluginOptions = {}
) {
  options = { ...defaultOptions, ...options };
  return {
    before(context: tss.TransformationContext) {
      ModelVisitor.reset();
      return (sourceFile: tss.SourceFile): tss.SourceFile => {
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
  program: tss.Program
) => automapperTransformerPlugin(program, options).before;

export * from './lib/constants';
export * from './lib/interfaces';
