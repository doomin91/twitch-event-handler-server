import { Module } from '@nestjs/common';
import { TwitchZomboidLog } from './entities/twitch-zomboid-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwitchZomboidService } from './twitch-zomboid.service';
import { TwitchZomboidLogRepository } from './repositories/twitch-zomboid-log.repository';
import { TwitchZomboidController } from './twitch-zomboid.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TwitchZomboidLog])],
  controllers: [TwitchZomboidController],
  providers: [TwitchZomboidService, TwitchZomboidLogRepository],
  exports: [TwitchZomboidService, TwitchZomboidLogRepository],
})
export class TwitchZomboidModule {}
