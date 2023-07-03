import { PrismaService } from '@smart-home/api/shared/infrastructure';
import {Home} from "@smart-home/api/home/domain";
import {homeFactory} from "./home.factory";
import {Injectable} from "@nestjs/common";

@Injectable()
export class HomeRepository {
    constructor(private prisma: PrismaService) {
    }

    async getAll(): Promise<Home[]> {
        const homes = await this.prisma.homeSchema.findMany()
        return homes.map(homeFactory)
    }

    async create(city: string, name: string) {
        await this.prisma.homeSchema.create({data: {city, name}})
    }

    async delete(id: string) {
        await this.prisma.homeSchema.delete({where: {id}})
    }
}