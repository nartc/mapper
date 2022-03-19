const defaultKey = 'default';

// eslint-disable-next-line @typescript-eslint/ban-types
export function memoize(fn: Function) {
    const cache: Record<string, unknown> = {};
    return (...args: any[]) => {
        const n =
            args.reduce((key, arg) => {
                const argToConcat =
                    typeof arg === 'string'
                        ? arg
                        : typeof arg === 'object'
                        ? JSON.stringify(arg)
                        : arg.toString();
                return key.concat('|', argToConcat);
            }, '') || defaultKey;
        if (n in cache) {
            return cache[n];
        }

        const result = n === defaultKey ? fn() : fn(...args);
        cache[n] = result;
        return result;
    };
}
