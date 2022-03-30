export const DEFAULT_MAPPER_TOKEN = 'automapper:nestjs:default';

export function getMapperToken(name?: string) {
    return name ? `automapper:nestjs:${name}` : DEFAULT_MAPPER_TOKEN;
}
