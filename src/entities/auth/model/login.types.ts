import type { AuthTokenData } from './auth-token.types';

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = AuthTokenData;
