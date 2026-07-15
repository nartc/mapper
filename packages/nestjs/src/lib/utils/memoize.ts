const defaultKey = 'default';

type AnyFunction = (...args: any[]) => unknown;

export function memoize<TFunction extends AnyFunction>(fn: TFunction): TFunction {
    const cache: Record<string, ReturnType<TFunction>> = {};
    const memoized = (...args: Parameters<TFunction>): ReturnType<TFunction> => {
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

        const result = (n === defaultKey ? fn() : fn(...args)) as ReturnType<
            TFunction
        >;
        cache[n] = result;
        return result;
    };

    return memoized as TFunction;
}
