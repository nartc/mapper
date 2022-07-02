const AUTOMAPPER_PREFIX = '[AutoMapper]: ';

export const AutoMapperLogger = {
    log: console.log.bind(console, AUTOMAPPER_PREFIX),
    warn: console.warn.bind(console, AUTOMAPPER_PREFIX),
    error: console.error.bind(console, AUTOMAPPER_PREFIX),
    info: console.info.bind(console, AUTOMAPPER_PREFIX),
};

export function configureLogger(logger: Partial<typeof AutoMapperLogger> = {}) {
    Object.entries(logger).forEach(([logLevel, logImpl]) => {
        if (logImpl !== undefined) {
            AutoMapperLogger[logLevel as keyof typeof AutoMapperLogger] =
                logImpl;
        }
    });
}
