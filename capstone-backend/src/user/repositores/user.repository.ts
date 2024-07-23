import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { CreateUserDto } from "../dto/create-user.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}
    
    async getByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email
            }
        });        
    }

    async getById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async createUser(userData: CreateUserDto): Promise<User> {
        return this.prisma.user.create({
            data: userData
        });
    }
    
}