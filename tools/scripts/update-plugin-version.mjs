import version from '../../version.json' assert { type: 'json' };
import fs from 'fs-extra';
import path from 'path';

const { ensureDirSync, writeFileSync, readFileSync } = fs;

function updateFile(f, content) {
    ensureDirSync(path.dirname(f));
    if (typeof content === 'string') {
        writeFileSync(f, content);
    } else {
        writeFileSync(f, content(readFileSync(f).toString()));
    }
}

const pluginVersion = Number(version.version.split('.').join(''));

['index.js', 'index.cjs', 'src/lib/version.d.ts'].forEach((file) => {
    const path = `dist/packages/classes/transformer-plugin/${file}`;
    updateFile(path, (content) => {
        return content.replace(/('|\")\{\{REPLACED\}\}('|\")/, pluginVersion);
    });
});
