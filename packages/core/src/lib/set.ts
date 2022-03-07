export function set<T extends Record<string, unknown>>(
    object: T,
    path: string[],
    value: unknown
): (T & { [p: string]: unknown }) | T {
    const { decomposedPath, base } = decomposePath(path);

    if (base === undefined) {
        return object;
    }

    // assign an empty object in order to spread object
    assignEmpty(object, base);

    // Determine if there is still layers to traverse
    value =
        decomposedPath.length <= 1
            ? value
            : set(
                  object[base] as Record<string, unknown>,
                  decomposedPath.slice(1),
                  value
              );

    return Object.assign(object, { [base]: value });
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
