import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Period} from "@smart-home/shared/util";
import {usageActions} from "./state/usage.actions";
import {usageSelectors} from "./state/usage.selectors";

@Injectable()
export class UsageFacade {
    constructor(private store: Store<UsageFacade>) {
    }

    usageVm$ = this.store.select(usageSelectors.usageVmSelector)

    getUsage(period: Period = 'month') {
        this.store.dispatch(usageActions.getUsage({period}))
    }
}