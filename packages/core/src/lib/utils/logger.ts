export class AutoMapperLogger {
    private static readonly AUTOMAPPER_PREFIX = '[AutoMapper]: ' as const;
    private static configured = false;

    static configure(
        customLogger: Partial<
            Pick<typeof AutoMapperLogger, 'log' | 'info' | 'error' | 'warn'>
        > = {}
    ) {
        if (this.configured) return;
        this.configured = true;
        Object.entries(customLogger).forEach(([logLevel, logImpl]) => {
            if (logImpl !== undefined) {
                this[logLevel as 'log' | 'info' | 'error' | 'warn'] = logImpl;
            }
        });
    }

    static log(message: string) {
        console.log.bind(console, this.AUTOMAPPER_PREFIX, message);
    }

    static warn(warning: string) {
        console.warn.bind(console, this.AUTOMAPPER_PREFIX, warning);
    }

    static error(error: string) {
        console.error.bind(console, this.AUTOMAPPER_PREFIX, error);
    }

    static info(info: string) {
        console.info.bind(console, this.AUTOMAPPER_PREFIX, info);
    }
}
