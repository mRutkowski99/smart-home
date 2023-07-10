export interface ChangePasswordPayload {
    readonly id: string;
    readonly password: string;
    readonly newPassword: string;
}