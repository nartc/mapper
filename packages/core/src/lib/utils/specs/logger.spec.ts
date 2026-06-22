import { AutoMapperLogger } from '../logger';

describe(AutoMapperLogger.name, () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it.each([
        ['log', 'message'],
        ['warn', 'warning'],
        ['error', 'error'],
        ['info', 'info'],
    ] as const)('should call console.%s', (method, message) => {
        const spy = vi.spyOn(console, method).mockImplementation(() => {
            // noop
        });

        AutoMapperLogger[method](message);

        expect(spy).toHaveBeenCalledWith('[AutoMapper]: ', message);
    });
});
