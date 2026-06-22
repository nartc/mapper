export function get<T>(object: T, path: (string | symbol)[] = []): unknown {
    if (!path.length) {
        return;
    }

    // flat-member fast path: the dominant case is a single-segment path (a
    // top-level source/destination member). Skip the loop + the trailing
    // index===length bookkeeping entirely.
    if (path.length === 1) {
        return object == null
            ? undefined
            : (object as Record<string, unknown>)[path[0] as string];
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
