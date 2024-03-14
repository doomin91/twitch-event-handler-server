import { Module } from '@nestjs/common';
import { TwitchController } from './controllers/twitch.controller';
import { TwitchAuthModule } from '../twitch-auth/twitch-auth.module';
import { TwitchService } from './services/twitch.service';

@Module({
  imports: [TwitchAuthModule],
  controllers: [TwitchController],
  providers: [TwitchService],
})
export class TwitchModule {}
