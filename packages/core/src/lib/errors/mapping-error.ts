import { ModelIdentifier } from '../types';

export class MappingError<S = any, D = any> extends Error {
    override cause?: unknown | undefined;
    source?: ModelIdentifier;
    destination?: ModelIdentifier;
    sourceObject?: S;
    destinationObject?: D;
    constructor(
        message: string,
        data: {
            cause?: unknown;
            source?: ModelIdentifier;
            destination?: ModelIdentifier;
            sourceObject?: S;
            destinationObject?: D;
        } = {}
    ) {
        super(`Mapping Error: ${message}`);
        this.name = 'MappingError';
        this.cause = data.cause;
        this.source = data.source;
        this.destination = data.destination;
        this.sourceObject = data.sourceObject;
        this.destinationObject = data.destinationObject;
    }
}
