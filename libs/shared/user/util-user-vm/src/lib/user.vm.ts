import {UserRole} from "@prisma/client";

export interface UserVm {
    readonly login: string;
    readonly homeId: string;
    readonly id: string;
    readonly name: string;
    readonly role: UserRole;
    readonly hasChangedPassword: boolean;
}
