import { AutoMapperLogger } from '../logger';

describe(AutoMapperLogger.name, () => {
    afterEach(() => {
        AutoMapperLogger.reset();
        vi.restoreAllMocks();
    });

    it.each([
        ['log', 'log', 'message'],
        ['warn', 'warn', 'warning'],
        ['error', 'error', 'error'],
        ['info', 'info', 'info'],
        ['debug', 'debug', 'debug'],
        ['verbose', 'debug', 'verbose'],
        ['fatal', 'error', 'fatal'],
    ] as const)(
        'should route AutoMapperLogger.%s to console.%s',
        (method, consoleMethod, message) => {
            const spy = vi
                .spyOn(console, consoleMethod)
                .mockImplementation(() => {
                    // noop
                });

            AutoMapperLogger[method](message, 'context');

            expect(spy).toHaveBeenCalledWith(
                '[AutoMapper]: ',
                message,
                'context'
            );
        }
    );

    it('should not provide trace by default', () => {
        expect(AutoMapperLogger.trace).toBeUndefined();
    });

    it('should configure trace when provided', () => {
        const trace = vi.fn();

        AutoMapperLogger.configure({ trace });
        AutoMapperLogger.trace?.('diagnostic', { source: 'test' });

        expect(trace).toHaveBeenCalledWith('diagnostic', { source: 'test' });
    });

    it('should override previous custom configuration instead of merging with it', () => {
        const customLog = vi.fn();
        const customWarn = vi.fn();
        const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {
            // noop
        });

        AutoMapperLogger.configure({ log: customLog });
        AutoMapperLogger.log('custom');

        AutoMapperLogger.configure({ warn: customWarn });
        AutoMapperLogger.warn('warning');
        AutoMapperLogger.log('default');

        expect(customLog).toHaveBeenCalledWith('custom');
        expect(customWarn).toHaveBeenCalledWith('warning');
        expect(customLog).not.toHaveBeenCalledWith('default');
        expect(consoleLog).toHaveBeenCalledWith('[AutoMapper]: ', 'default');
    });

    it('should restore the logger state captured before configure', () => {
        const firstLog = vi.fn();
        const secondLog = vi.fn();

        AutoMapperLogger.configure({ log: firstLog });
        const restore = AutoMapperLogger.configure({ log: secondLog });

        AutoMapperLogger.log('second');
        restore();
        AutoMapperLogger.log('first');

        expect(secondLog).toHaveBeenCalledWith('second');
        expect(firstLog).toHaveBeenCalledWith('first');
    });

    it('should reset to the default logger', () => {
        const customError = vi.fn();
        const consoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {
                // noop
            });

        AutoMapperLogger.configure({ error: customError });
        AutoMapperLogger.error('custom');

        AutoMapperLogger.reset();
        AutoMapperLogger.error('default');

        expect(customError).toHaveBeenCalledWith('custom');
        expect(customError).not.toHaveBeenCalledWith('default');
        expect(consoleError).toHaveBeenCalledWith('[AutoMapper]: ', 'default');
    });

    it('should route a previously bound method through the current logger', () => {
        const boundError = AutoMapperLogger.error.bind(AutoMapperLogger);
        const customError = vi.fn();

        AutoMapperLogger.configure({ error: customError });
        boundError('bound');

        expect(customError).toHaveBeenCalledWith('bound');
    });
});
