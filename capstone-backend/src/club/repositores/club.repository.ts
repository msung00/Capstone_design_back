import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateClubDto } from "../dto/create-club.dto";
import { Club } from "@prisma/client";

@Injectable()
export class ClubRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createClub(clubData: CreateClubDto): Promise<Club> {
        return this.prisma.club.create({
            data: {
                name: clubData.name,
                school: clubData.school,
                location: clubData.location,
                description: clubData.description,
                adminList: [clubData.userId], 
                userId: clubData.userId,
                memberId: clubData.memberId ?? null,
            }
        });
    } 

    async getAllClubs(): Promise<Club[]> {
        return this.prisma.club.findMany();
    }

    async getClubById(id: number): Promise<Club> {
        return this.prisma.club.findUnique({
            where: {
                id,
            }
        });
    }
}