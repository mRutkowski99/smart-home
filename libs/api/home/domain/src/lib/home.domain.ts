import {Uuid} from "@smart-home/api/shared/domain";

export class Home {
    constructor(public readonly id: Uuid, public readonly name: string, public readonly city: string) {
    }
}