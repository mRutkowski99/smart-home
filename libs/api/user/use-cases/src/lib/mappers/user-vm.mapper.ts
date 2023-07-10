import {Injectable} from "@nestjs/common";
import {User} from "@smart-home/api/user/domain";
import {UserVm} from "@smart-home/shared/user/util-user-vm";

@Injectable()
export class UserVmMapper {
    map(user: User): UserVm {
        return {
            id: user.id.value,
            name: user.name,
            role: user.role,
            hasChangedPassword: user.hasChangedPassword,
            homeId: user.homeId.value,
            login: user.login
        }
    }

    mapAll(users: User[]): UserVm[] {
        return users.map(this.map);
    }
}