import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { KakaoModule } from 'src/kakao/kakao.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '60m'},
    }),
    UserModule,
    KakaoModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})

export class AuthModule {}
 