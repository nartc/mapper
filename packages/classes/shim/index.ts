// This "shim" can be used on the frontend to prevent from errors on undefined
// decorators in the models, when you are sharing same models across backend
// and frontend.
// To use this shim simply configure your bundler configuration to use this file
// instead of the `@automapper/classes` module.

/* eslint-disable @typescript-eslint/no-empty-function */

export function AutoMap(): PropertyDecorator {
    return () => {};
}
