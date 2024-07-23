import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { URLSearchParams } from 'url';

@Injectable()
export class KakaoService {
    async getKakaoAccessToken(code: string): Promise<string> {
        const kakaoTokenUrl = "https://kauth.kakao.com/oauth/token";
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', process.env.KAKAO_ID);
        params.append('redirect_uri', process.env.KAKAO_REDIRECT_URI);
        params.append('code', code);

        try {
            const response = await axios.post(kakaoTokenUrl, params);
            return response.data.access_token;
        } catch (error) {
            console.error('Error fetching Kakao access token:', error.response?.data || error.message);
            throw new Error('Error fetching Kakao access token');
        }
    }

    async getKakaoUserInfo(accessToken: string): Promise<any> {
        const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';

        try {
            const response = await axios.get(kakaoUserInfoUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
        });
            return response.data;
        } catch (error) {
            console.error('Error fetching Kakao user info:', error.response?.data || error.message);
            throw new Error('Error fetching Kakao user info');
        }
    }
}
