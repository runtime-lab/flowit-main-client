export function createQueryKeys<T extends string>(scope: T) {
    const root = [scope] as const;

    return {
        all: root,
        lists: () => [...root, 'list'] as const,
        list: <TFilter>(filter: TFilter) => [...root, 'list', filter] as const,
        details: () => [...root, 'detail'] as const,
        detail: <TId>(id: TId) => [...root, 'detail', id] as const,
    };
}
