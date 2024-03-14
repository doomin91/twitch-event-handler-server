import { Module } from '@nestjs/common';
import { TwitchAuthService } from './twitch-auth.service';
import { ScraperModule } from 'src/scraper/scraper.module';

@Module({
  imports: [ScraperModule],
  providers: [TwitchAuthService],
  exports: [TwitchAuthService],
})
export class TwitchAuthModule {}
