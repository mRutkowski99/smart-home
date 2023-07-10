import {UserRole} from "@prisma/client";

export interface CreateUserPayload {
    readonly homeId: string;
    readonly login: string;
    readonly name: string;
    readonly role: UserRole
}