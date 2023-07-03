import {HomeSchema} from "@prisma/client";
import {Home} from "@smart-home/api/home/domain";
import {Uuid} from "@smart-home/api/shared/domain";

export function homeFactory(schema: HomeSchema): Home {
    return new Home(new Uuid(schema.id), schema.name, schema.city)
}