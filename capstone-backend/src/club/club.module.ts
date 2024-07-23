import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { PrismaModule } from 'src/prisma.module';
import { ClubRepository } from './repositores/club.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ClubController],
  providers: [ClubService, ClubRepository],
})
export class ClubModule {}
