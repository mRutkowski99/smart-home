import {createActionGroup, props} from "@ngrx/store";
import {Period} from "@smart-home/shared/util";
import {UsageVm} from "@smart-home/shared/usage/util-usage-vm";

export const usageActions = createActionGroup({
    source: 'Usage',
    events: {
        'Get Usage': props<{period: Period}>(),
        'Get Usage Success': props<{usage: UsageVm | null}>(),
        'Get Usage Fail': props<{error: string}>()
    }
})