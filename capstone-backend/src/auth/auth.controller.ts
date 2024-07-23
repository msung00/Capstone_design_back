import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoService } from 'src/kakao/kakao.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly kakaoService: KakaoService,
    private readonly userService: UserService
  ) {}

  @Post('kakao/callback')
  async kakaoCallback(@Body('code') code: string) {
    try {
      const accessToken = await this.kakaoService.getKakaoAccessToken(code);
      const kakaoUserInfo = await this.kakaoService.getKakaoUserInfo(accessToken);
      const { kakao_account: { email, profile: { nickname }, phone_number } } = kakaoUserInfo;
      let user = await this.userService.getByEmail(email);

      if(!user) {
        const createUserDto: CreateUserDto = {
          name: nickname,
          email,
          phone: phone_number || '',
          school: '',
          major: '',
          studentId: 0
        };

        user = await this.userService.createUser(createUserDto);
      }

      const token = await this.authService.generateToken(user.id);

      return {
        mag: "카카오 사용자 정보를 가져왔습니다.",
        user: user,
        token: token
      };

    } catch(error) {
      console.error('Kakao callback error:', error.message);
    }
  }

}
