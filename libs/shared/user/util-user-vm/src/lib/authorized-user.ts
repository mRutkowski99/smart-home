import {UserRole} from "@prisma/client";

export interface AuthorizedUser {
    readonly homeId: string;
    readonly id: string;
    readonly name: string;
    readonly role: UserRole;
    readonly hasChangedPassword: boolean;
}