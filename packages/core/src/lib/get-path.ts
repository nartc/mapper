import type { NamingConvention } from './types';

export function getPath(
    path: string[],
    [sourceNamingConvention, destinationNamingConvention]: Readonly<
        [NamingConvention, NamingConvention]
    >
): string[] {
    const keyParts = path
        .map((s) =>
            s
                .split(destinationNamingConvention.splittingExpression)
                .filter(Boolean)
        )
        .filter((p) => p.length > 0);
    return !keyParts.length
        ? path
        : keyParts.map((p) => sourceNamingConvention.transformPropertyName(p));
}

export function getFlatteningPaths(
    src: Record<string, unknown>,
    srcPath: string[],
    namingConventions: [NamingConvention, NamingConvention]
): string[] {
    const [sourceNamingConvention] = namingConventions;
    const splitSourcePaths: string[] = ([] as string[]).concat(
        ...srcPath.map((s) =>
            s.split(sourceNamingConvention.splittingExpression).filter(Boolean)
        )
    );

    const [first, ...paths] = splitSourcePaths.slice(
        0,
        splitSourcePaths.length - 1
    );
    let trueFirstPartOfSource = first;
    let stopIndex = 0;
    let found = Object.prototype.hasOwnProperty.call(
        src,
        trueFirstPartOfSource
    );

    if (!found) {
        for (let i = 0, len = paths.length; i < len; i++) {
            trueFirstPartOfSource =
                sourceNamingConvention.transformPropertyName([
                    trueFirstPartOfSource,
                    paths[i],
                ]);
            if (
                Object.prototype.hasOwnProperty.call(src, trueFirstPartOfSource)
            ) {
                stopIndex = i + 1;
                found = true;
                break;
            }
        }
    }

    if (!found) {
        return srcPath;
    }

    return [
        trueFirstPartOfSource,
        sourceNamingConvention.transformPropertyName(
            splitSourcePaths.slice(stopIndex + 1, splitSourcePaths.length + 1)
        ),
    ];
}
