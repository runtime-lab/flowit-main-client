export const WORKSPACE_ROUTES = {
    list: '/workspaces',
    dashboard: (workspaceId: number | string) => `/workspaces/${workspaceId}/dashboard`,
    board: (workspaceId: number | string) => `/workspaces/${workspaceId}/board`,
    boardTask: (workspaceId: number | string, taskId: number | string) =>
        `/workspaces/${workspaceId}/board?taskId=${taskId}`,
    members: (workspaceId: number | string) => `/workspaces/${workspaceId}/members`,
    settings: (workspaceId: number | string) => `/workspaces/${workspaceId}/settings`,
    myPage: (workspaceId: number | string) => `/workspaces/${workspaceId}/my-page`,
} as const;
