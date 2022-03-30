export function get<T>(object: T, path: (string | symbol)[] = []): unknown {
    if (!path.length) {
        return;
    }

    let index: number;
    const length = path.length;

    for (index = 0; index < length && object != null; index++) {
        object = (object as Record<string, unknown>)[
            path[index] as string
        ] as T;
    }

    return index && index == length ? object : undefined;
}
