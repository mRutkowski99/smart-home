import {Home} from "@smart-home/api/home/domain";
import {HomeVm} from "@smart-home/shared/home/util-home-vm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class HomeVmMapper {
    map(domain: Home): HomeVm {
        return {
            id: domain.id.value,
            city: domain.city,
            name: domain.name
        }
    }

    mapAll(domain: Home[]): HomeVm[] {
        return domain.map(this.map)
    }
}