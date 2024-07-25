import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from '@prisma/client';
import { ClubRepository } from './repositores/club.repository';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) {}
  // 클럽생성
  async createClub(createClubDto: CreateClubDto): Promise<Club> {
    return this.clubRepository.createClub(createClubDto);
  }

  async getAllClub(): Promise<Club[]> {
    return this.clubRepository.getAllClub();
  }

  async getClubById(id: number): Promise<Club> {
    const club = await this.clubRepository.getClubById(id);
    if (!club) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
    return club;
  }

  async updateClub(id: number, updateClubDto: UpdateClubDto): Promise<Club> {
    const club = await this.clubRepository.getClubById(id);
    if (!club) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
    return this.clubRepository.updateClub(id, updateClubDto);
  }
}
