import type { Mapper } from '@automapper/core';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { lastValueFrom, of } from 'rxjs';
import { MapInterceptor } from './map.interceptor';
import { MapPipe } from './map.pipe';

class Source {
    value!: string;
}

class Destination {
    value!: string;
}

const context = {} as ExecutionContext;

function handler<T>(value: T): CallHandler<T> {
    return { handle: () => of(value) };
}

describe(MapPipe.name, () => {
    it('awaits asynchronous object mapping', async () => {
        const source = { value: 'source' } as Source;
        const destination = { value: 'destination' } as Destination;
        const mapAsync = vi.fn().mockResolvedValue(destination);
        const mapper = { mapAsync } as unknown as Mapper;
        const Pipe = MapPipe(Source, Destination);
        const pipe = new Pipe(mapper);

        await expect(pipe.transform(source, { type: 'body' })).resolves.toBe(
            destination
        );
        expect(mapAsync).toHaveBeenCalledWith(
            source,
            Source,
            Destination,
            undefined
        );
    });

    it('awaits asynchronous array mapping', async () => {
        const source = [{ value: 'source' }] as Source[];
        const destination = [{ value: 'destination' }] as Destination[];
        const mapArrayAsync = vi.fn().mockResolvedValue(destination);
        const mapper = { mapArrayAsync } as unknown as Mapper;
        const Pipe = MapPipe(Source, Destination, { isArray: true });
        const pipe = new Pipe(mapper);

        await expect(pipe.transform(source, { type: 'body' })).resolves.toBe(
            destination
        );
        expect(mapArrayAsync).toHaveBeenCalledWith(
            source,
            Source,
            Destination,
            undefined
        );
    });

    it('propagates asynchronous mapping errors', async () => {
        const error = new Error('mapping failed');
        const mapper = {
            mapAsync: vi.fn().mockRejectedValue(error),
        } as unknown as Mapper;
        const Pipe = MapPipe(Source, Destination);
        const pipe = new Pipe(mapper);

        await expect(
            pipe.transform({ value: 'source' } as Source, { type: 'body' })
        ).rejects.toBe(error);
    });
});

describe(MapInterceptor.name, () => {
    it('flattens asynchronous object mapping into the response stream', async () => {
        const source = { value: 'source' } as Source;
        const destination = { value: 'destination' } as Destination;
        const mapAsync = vi.fn().mockResolvedValue(destination);
        const mapper = { mapAsync } as unknown as Mapper;
        const Interceptor = MapInterceptor(Source, Destination);
        const interceptor = new Interceptor(mapper);

        const response = await lastValueFrom(
            await interceptor.intercept(context, handler(source))
        );

        expect(response).toBe(destination);
        expect(mapAsync).toHaveBeenCalledWith(
            source,
            Source,
            Destination,
            undefined
        );
    });

    it('flattens asynchronous array mapping into the response stream', async () => {
        const source = [{ value: 'source' }] as Source[];
        const destination = [{ value: 'destination' }] as Destination[];
        const mapArrayAsync = vi.fn().mockResolvedValue(destination);
        const mapper = { mapArrayAsync } as unknown as Mapper;
        const Interceptor = MapInterceptor(Source, Destination, {
            isArray: true,
        });
        const interceptor = new Interceptor(mapper);

        const response = await lastValueFrom(
            await interceptor.intercept(context, handler(source))
        );

        expect(response).toBe(destination);
        expect(mapArrayAsync).toHaveBeenCalledWith(
            source,
            Source,
            Destination,
            undefined
        );
    });

    it('propagates asynchronous mapping errors through the response stream', async () => {
        const error = new Error('mapping failed');
        const mapper = {
            mapAsync: vi.fn().mockRejectedValue(error),
        } as unknown as Mapper;
        const Interceptor = MapInterceptor(Source, Destination);
        const interceptor = new Interceptor(mapper);
        const response = await interceptor.intercept(
            context,
            handler({ value: 'source' } as Source)
        );

        await expect(lastValueFrom(response)).rejects.toBe(error);
    });
});
