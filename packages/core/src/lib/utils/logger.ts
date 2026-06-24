export type AutoMapperLogFn = (
    message: unknown,
    ...optionalParams: unknown[]
) => void;

export interface AutoMapperLoggerLike {
    log?: AutoMapperLogFn;
    info?: AutoMapperLogFn;
    warn?: AutoMapperLogFn;
    error?: AutoMapperLogFn;
    debug?: AutoMapperLogFn;
    verbose?: AutoMapperLogFn;
    fatal?: AutoMapperLogFn;
    trace?: AutoMapperLogFn;
}

type AutoMapperDefaultLogger = Required<
    Omit<AutoMapperLoggerLike, 'trace'>
> &
    Pick<AutoMapperLoggerLike, 'trace'>;

const AUTO_MAPPER_LOG_LEVELS = [
    'log',
    'info',
    'warn',
    'error',
    'debug',
    'verbose',
    'fatal',
    'trace',
] as const;

export class AutoMapperLogger {
    private static readonly AUTOMAPPER_PREFIX = '[AutoMapper]: ' as const;

    private static readonly defaultLogger: AutoMapperDefaultLogger = {
        log: (message, ...optionalParams) => {
            console.log.call(
                console,
                AutoMapperLogger.AUTOMAPPER_PREFIX,
                message,
                ...optionalParams
            );
        },
        info: (message, ...optionalParams) => {
            console.info.call(
                console,
                AutoMapperLogger.AUTOMAPPER_PREFIX,
                message,
                ...optionalParams
            );
        },
        warn: (message, ...optionalParams) => {
            console.warn.call(
                console,
                AutoMapperLogger.AUTOMAPPER_PREFIX,
                message,
                ...optionalParams
            );
        },
        error: (message, ...optionalParams) => {
            console.error.call(
                console,
                AutoMapperLogger.AUTOMAPPER_PREFIX,
                message,
                ...optionalParams
            );
        },
        debug: (message, ...optionalParams) => {
            console.debug.call(
                console,
                AutoMapperLogger.AUTOMAPPER_PREFIX,
                message,
                ...optionalParams
            );
        },
        verbose: (message, ...optionalParams) => {
            console.debug.call(
                console,
                AutoMapperLogger.AUTOMAPPER_PREFIX,
                message,
                ...optionalParams
            );
        },
        fatal: (message, ...optionalParams) => {
            console.error.call(
                console,
                AutoMapperLogger.AUTOMAPPER_PREFIX,
                message,
                ...optionalParams
            );
        },
        trace: undefined,
    };

    private static currentLogger = AutoMapperLogger.defaultLogger;

    static configure(customLogger: AutoMapperLoggerLike = {}) {
        const previousLogger = this.currentLogger;
        this.currentLogger = this.createLogger(customLogger);

        return () => {
            this.currentLogger = previousLogger;
        };
    }

    static reset() {
        this.currentLogger = this.defaultLogger;
    }

    static log(message: unknown, ...optionalParams: unknown[]) {
        this.currentLogger.log(message, ...optionalParams);
    }

    static warn(message: unknown, ...optionalParams: unknown[]) {
        this.currentLogger.warn(message, ...optionalParams);
    }

    static error(message: unknown, ...optionalParams: unknown[]) {
        this.currentLogger.error(message, ...optionalParams);
    }

    static info(message: unknown, ...optionalParams: unknown[]) {
        this.currentLogger.info(message, ...optionalParams);
    }

    static debug(message: unknown, ...optionalParams: unknown[]) {
        this.currentLogger.debug(message, ...optionalParams);
    }

    static verbose(message: unknown, ...optionalParams: unknown[]) {
        this.currentLogger.verbose(message, ...optionalParams);
    }

    static fatal(message: unknown, ...optionalParams: unknown[]) {
        this.currentLogger.fatal(message, ...optionalParams);
    }

    static get trace() {
        return this.currentLogger.trace;
    }

    private static createLogger(customLogger: AutoMapperLoggerLike) {
        const logger: AutoMapperDefaultLogger = { ...this.defaultLogger };

        for (const logLevel of AUTO_MAPPER_LOG_LEVELS) {
            const logImpl = customLogger[logLevel];

            if (logImpl !== undefined) {
                logger[logLevel] = logImpl;
            }
        }

        return logger;
    }
}
