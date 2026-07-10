export type ActivityRecordTopic = 'ALL' | 'TASK' | 'MEMBER';

export type ActivityRecordDomain = 'TASK' | 'WORKSPACE_MEMBER';

export type ActivityRecordAction =
    | 'CREATED'
    | 'MODIFIED'
    | 'STATUS_CHANGED'
    | 'PROGRESS_CHANGED'
    | 'ROLE_CHANGED'
    | 'REMOVED'
    | 'WITHDRAWN'
    | 'JOINED';

export type ActivityTargetType = 'TASK' | 'WORKSPACE_MEMBER';

export type ActivityChangeElement =
    | 'TITLE'
    | 'DESCRIPTION'
    | 'STATUS'
    | 'ASSIGNEE'
    | 'PRIORITY'
    | 'START_DATE'
    | 'DUE_DATE'
    | 'TAGS'
    | 'PROGRESS'
    | 'ROLE'
    | 'MEMBERSHIP'
    | 'OWNERSHIP_TRANSFER';

export type ActivityRecordActor = {
    memberId: number | null;
    userId: number | null;
    displayName: string | null;
};

export type ActivityRecordTarget = {
    type: ActivityTargetType;
    id: number;
    displayName: string;
};

export type ActivityRecordChange = {
    element: ActivityChangeElement;
    from: unknown | null;
    to: unknown | null;
};

export type ActivityRecord = {
    id: number;
    occurredAt: number;
    domain: ActivityRecordDomain;
    actor: ActivityRecordActor;
    target: ActivityRecordTarget;
    action: ActivityRecordAction;
    changeCount: number;
    changedElements: ActivityChangeElement[];
    changes: ActivityRecordChange[];
};

export type WorkspaceActivityRecordsResponse = {
    items: ActivityRecord[];
    totalCount: number;
};

export type GetWorkspaceActivityRecordsParams = {
    topic?: ActivityRecordTopic;
    rangeDays?: number;
    page?: number;
    size?: number;
};
