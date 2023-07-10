import {UserSchema} from "@prisma/client";
import {User} from "@smart-home/api/user/domain";
import {Uuid} from "@smart-home/api/shared/domain";

export function userFactory(schema: UserSchema): User {
    return new User(
        new Uuid(schema.id),
        new Uuid(schema.homeId),
        schema.login,
        schema.passwordHash,
        schema.name,
        schema.role,
        schema.hasChangedPassword
    )
}