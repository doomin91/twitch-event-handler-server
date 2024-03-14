import { Injectable } from '@nestjs/common';
import { TwitchAuthService } from 'src/twitch/twitch-auth/twitch-auth.service';
import { Client } from 'tmi.js';

@Injectable()
export class TwitchChatbotService {
  client;

  connect() {
    const opts = {
      identity: {
        username: 'kimduumin',
        password: 'hkp954tfaioful55yk8ym2y2t1oi3o',
      },
      channels: ['kimduumin'],
    };
    this.client = new Client(opts);
    this.client.connect();

    return this.client;
    // this.client.on('message', this.onMessageHandler);

    // this.client.on('connected', this.onConnectedHandler);
  }
}
