import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositores/user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  
  async getByEmail(email: string): Promise<User | null> {
    return this.userRepository.getByEmail(email);
  }

  async getById(id: number): Promise<User | null> {
    return this.userRepository.getById(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto); 
  }
  
}
