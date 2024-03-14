import { Injectable } from '@nestjs/common';
import { TwitchZomboidLog } from '../entities/twitch-zomboid-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TwitchZomboidLogDto } from '../dtos/twitch-zomboid-log.dto';

@Injectable()
export class TwitchZomboidLogRepository {
  constructor(
    @InjectRepository(TwitchZomboidLog)
    private repository: Repository<TwitchZomboidLog>,
  ) {}

  async findTwitchZomboidLogByRoomId(roomId: string) {
    return await this.repository.find({
      where: {
        roomId,
        eventExecute: false,
      },
    });
  }

  async updateTwitchZomboidLogByRoomId(roomId: string) {
    await this.repository.update(
      { roomId },
      {
        eventExecute: true,
      },
    );
  }

  async insertTwitchZomboidLog(twitchZomboidLog: TwitchZomboidLogDto) {
    await this.repository.save(twitchZomboidLog);
  }
}
