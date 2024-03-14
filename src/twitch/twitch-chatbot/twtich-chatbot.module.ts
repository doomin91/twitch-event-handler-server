import { Module } from '@nestjs/common';
import { TwitchChatbotService } from './services/twtich-chatbot.service';
import { TwitchChatbotGateway } from './gateways/twitch-chatbot.gateway';
import { TwitchAuthModule } from '../twitch-auth/twitch-auth.module';
import { TwitchZomboidModule } from '../twtich-zomboid/twitch-zomboid.module';

@Module({
  imports: [TwitchAuthModule, TwitchZomboidModule],
  providers: [TwitchChatbotService, TwitchChatbotGateway],
})
export class TwitchChatbotModule {}
