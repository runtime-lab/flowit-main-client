import type { ActivityRecord, ActivityRecordAction } from '../model/workspace-activity-records.types';

type FormatActivityRecordMessageParams = {
    record: ActivityRecord;
    unknownActorLabel: string;
    formatAction: (action: ActivityRecordAction, values: { actor: string; target: string }) => string;
};

export function getActivityRecordActorName(record: ActivityRecord, unknownActorLabel: string) {
    return record.actor.displayName?.trim() || unknownActorLabel;
}

export function formatActivityRecordMessage({
    record,
    unknownActorLabel,
    formatAction,
}: FormatActivityRecordMessageParams) {
    const actor = getActivityRecordActorName(record, unknownActorLabel);
    const target = record.target.displayName;

    return formatAction(record.action, { actor, target });
}
