export const LOGIN_FORM_FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password',
} as const;

export type LoginFormField = (typeof LOGIN_FORM_FIELDS)[keyof typeof LOGIN_FORM_FIELDS];

export type LoginFormValues = {
    email: string;
    password: string;
};

export const INITIAL_LOGIN_FORM_VALUES: LoginFormValues = {
    email: '',
    password: '',
};

export function isLoginFormField(name: string): name is LoginFormField {
    return name in INITIAL_LOGIN_FORM_VALUES;
}
