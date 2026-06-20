import 'reflect-metadata';
import { TextDecoder, TextEncoder } from 'node:util';

// The jsdom test env doesn't provide TextEncoder/TextDecoder, which
// supertest/whatwg-url need at import time in the NestJS controller specs.
const g = globalThis as Record<string, unknown>;
g['TextEncoder'] ??= TextEncoder;
g['TextDecoder'] ??= TextDecoder;
