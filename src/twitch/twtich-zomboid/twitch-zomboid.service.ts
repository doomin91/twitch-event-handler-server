import { Injectable } from '@nestjs/common';
import { TwitchZomboidLogRepository } from './repositories/twitch-zomboid-log.repository';
import { TwitchZomboidLogDto } from './dtos/twitch-zomboid-log.dto';

@Injectable()
export class TwitchZomboidService {
  constructor(private twitchZomboidLogRepository: TwitchZomboidLogRepository) {}

  async findTwitchZomboidLogByRoomId(roomId: string) {
    return await this.twitchZomboidLogRepository.findTwitchZomboidLogByRoomId(
      roomId,
    );
  }

  async updateTwitchZomboidLogByRoomId(roomId: string) {
    await this.twitchZomboidLogRepository.updateTwitchZomboidLogByRoomId(
      roomId,
    );
  }

  async insertTwitchZomboidLog(twitchZomboidLog: TwitchZomboidLogDto) {
    await this.twitchZomboidLogRepository.insertTwitchZomboidLog(
      twitchZomboidLog,
    );
  }
}
