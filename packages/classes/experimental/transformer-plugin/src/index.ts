import * as tss from 'typescript/lib/tsserverlibrary';
import { AutomapperTransformerPluginOptions } from './lib/interfaces';
import { ModelVisitor } from './lib/model-visitor';
import { isFilenameMatched } from './lib/plugin-utils';

const modelVisitor = new ModelVisitor();
const defaultOptions: AutomapperTransformerPluginOptions = {
  modelFileNameSuffix: ['.model.ts', '.dto.ts', '.vm.ts'],
};

export default function automapperTransformerPlugin(
  program: tss.Program,
  options: AutomapperTransformerPluginOptions = defaultOptions
) {
  return {
    before(context: tss.TransformationContext) {
      modelVisitor.reset();
      return (sourceFile: tss.SourceFile): tss.SourceFile => {
        if (
          isFilenameMatched(
            options.modelFileNameSuffix || [],
            sourceFile.fileName
          )
        ) {
          return modelVisitor.visit(sourceFile, context, program);
        }
        return sourceFile;
      };
    },
  };
}

export const before = (
  options: AutomapperTransformerPluginOptions = defaultOptions,
  program: tss.Program
) => automapperTransformerPlugin(program, options).before;

export * from './lib/constants';
export * from './lib/interfaces';
