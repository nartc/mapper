export function isSamePath(target: string[], value: string[]): boolean {
    if (target.length !== value.length) {
        return false;
    }
    for (let i = 0, targetLen = target.length; i < targetLen; i++) {
        if (target[i] !== value[i]) {
            return false;
        }
    }
    return true;
}
