import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TwitchAuthDto } from 'src/twitch/twitch-auth/twitch-auth.dto';
import { TwitchAuthService } from 'src/twitch/twitch-auth/twitch-auth.service';

@Injectable()
export class TwitchService {
  constructor(private twitchAuthService: TwitchAuthService) {}

  async getUsers(userId: string) {
    try {
      const token: TwitchAuthDto = await this.twitchAuthService.getToken();

      const bearerToken = `Bearer ${token.accessToken}`;
      const url = `https://api.twitch.tv/helix/users?login=${userId}`;
      const user = await axios({
        method: 'GET',
        url,
        headers: {
          Authorization: bearerToken,
          'Client-Id': process.env.TWITCH_CLIENT_ID,
        },
      });

      return user.data;
    } catch (e) {
      throw e;
    }
  }

  async createPolls() {
    try {
      const token: TwitchAuthDto = await this.twitchAuthService.getToken();

      const bearerToken = `Bearer ${token.accessToken}`;
      const url = `https://api.twitch.tv/helix/polls`;
      const user = await axios({
        method: 'POST',
        url,
        headers: {
          Authorization: bearerToken,
          'Client-Id': process.env.TWITCH_CLIENT_ID,
          'Content-Type': 'application/json',
        },
        data: {
          broadcaster_id: 'kimduumin',
          title: 'Streaming next Tuesday. Which time works best for you?',
          choices: [
            { title: '9AM' },
            { title: '10AM' },
            { title: '7PM' },
            { title: '8PM' },
            { title: '9PM' },
          ],
          duration: 300,
        },
      });

      return user.data;
    } catch (e) {
      throw e;
    }
  }
}
