import {UsageLogVm} from "@smart-home/shared/usage/util-usage-vm";

export interface UsageVm {
    readonly logs: UsageLogVm[];
    readonly usage: number
}