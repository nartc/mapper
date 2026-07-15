/**
 * Base class for all errors thrown by AutoMapper. Lets consumers catch
 * mapper errors selectively: `catch (e) { if (e instanceof AutoMapperError) ... }`.
 */
export class AutoMapperError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AutoMapperError';
        // restore the prototype chain (transpile targets that down-level class
        // extends otherwise break `instanceof`)
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

/** Thrown when `map()` cannot find a mapping for the given identifiers. */
export class MappingNotFoundError extends AutoMapperError {
    constructor(
        public readonly sourceName: string,
        public readonly destinationName: string
    ) {
        super(`Mapping is not found for ${sourceName} and ${destinationName}`);
        this.name = 'MappingNotFoundError';
    }
}

/** Thrown when mapping a single member fails; wraps the original error. */
export class MapMemberError extends AutoMapperError {
    constructor(
        public readonly memberPath: string,
        public readonly destinationName: string,
        public readonly originalError: unknown
    ) {
        super(
            `Error at "${memberPath}" on ${destinationName}\n` +
                `---------------------------------------------------------------------\n` +
                `Original error: ${originalError}`
        );
        this.name = 'MapMemberError';
    }
}
