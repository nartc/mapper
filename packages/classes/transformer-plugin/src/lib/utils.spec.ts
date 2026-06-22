import { replaceImportPath } from './utils';

describe(replaceImportPath.name, () => {
    it('should rewrite POSIX absolute import references to relative require references', () => {
        expect(
            replaceImportPath(
                'import("/repo/src/models/user.model").UserModel',
                '/repo/src/dtos/user.dto.ts'
            )
        ).toEqual('require("../models/user.model").UserModel');
    });

    it('should rewrite Windows absolute import references to normalized relative require references', () => {
        expect(
            replaceImportPath(
                'import("C:\\repo\\src\\models\\user.model").UserModel',
                'C:\\repo\\src\\dtos\\user.dto.ts'
            )
        ).toEqual('require("../models/user.model").UserModel');
    });

    it('should keep package import references as package specifiers', () => {
        expect(
            replaceImportPath(
                'import("@scope/pkg/models").UserModel',
                '/repo/src/dtos/user.dto.ts'
            )
        ).toEqual('require("@scope/pkg/models").UserModel');
    });
});
