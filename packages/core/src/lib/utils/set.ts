export function set<T extends Record<string, unknown>>(
    object: T,
    path: string[],
    value: unknown,
    index = 0
): (T & { [p: string]: unknown }) | T {
    const obj = object as Record<string, unknown>;

    // empty path writes the '' key (preserves prior decomposePath base='' behavior)
    if (path.length < 1) {
        obj[''] = value;
        return object;
    }

    const base = path[index];

    // leaf: write directly. Avoids the per-level `Object.assign({[base]: value})`
    // temp object and `path.slice(1)` array allocation of the old recursion
    // (mirrors setMutate, which already does this).
    if (index >= path.length - 1) {
        obj[base] = value;
        return object;
    }

    if (!Object.prototype.hasOwnProperty.call(object, base)) {
        obj[base] = {};
    }
    set(obj[base] as Record<string, unknown>, path, value, index + 1);
    return object;
}

export function setMutate<T extends Record<string, unknown>>(
    object: T,
    path: string[],
    value: unknown
): void {
    const { decomposedPath, base } = decomposePath(path);

    if (base === undefined) {
        return;
    }

    // assign an empty object in order to spread object
    assignEmpty(object, base);

    // Determine if there is still layers to traverse
    if (decomposedPath.length <= 1) {
        (object as Record<string, unknown>)[base] = value;
    } else {
        setMutate(
            object[base] as Record<string, unknown>,
            decomposedPath.slice(1),
            value
        );
    }
}

function decomposePath(path: string[]): {
    decomposedPath: string[];
    base: string;
} {
    if (path.length < 1) {
        return { base: '', decomposedPath: [] };
    }
    const decomposedPath = path;
    const base = path[0];
    return { base, decomposedPath };
}

function assignEmpty(obj: Record<string, unknown>, base: string) {
    if (!obj.hasOwnProperty(base)) {
        obj[base] = {};
    }
}
