import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from '@prisma/client';
import { ClubRepository } from './repositores/club.repository';

@Injectable()
export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) {}
  // 클럽생성
  async createClub(createClubDto: CreateClubDto): Promise<Club> {
    try{
      //userID adminlist 추가
      const adminList = createClubDto.adminList || [];
      adminList.push(createClubDto.userId);
      createClubDto.adminList = adminList;

      return await this.clubRepository.createClub({
        ...createClubDto,
        adminList: adminList, // JSON 형식으로 변환
      });
    } catch {
      throw new InternalServerErrorException('Failed to create club');
    }
  }
  


}
