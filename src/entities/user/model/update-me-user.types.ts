import type { UserStatus } from './user.types';

export type UpdateMeUserRequest = {
    nickname: string;
};

export type UpdateMeUserResponse = {
    id: number;
    email: string;
    nickname: string;
    status: UserStatus;
    profileImageFileId: number | null;
    updatedAt: number;
    extensions: Record<string, unknown>;
};
