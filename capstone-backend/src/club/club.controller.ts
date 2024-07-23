import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  @HttpCode(HttpStatus.CREATED)
  async createClub(@Body() createClubDto: CreateClubDto) {
    return this.clubService.createClub(createClubDto);
  }
}
