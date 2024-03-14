import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TwitchZomboidService } from './twitch-zomboid.service';
import { ApiDoc } from 'src/common/decorators/swagger/api-doc.decorator';
import { TwitchZomboidLogDto } from './dtos/twitch-zomboid-log.dto';
import { ObjectResponse } from 'src/common/dtos/object-response.dto';
import { ListResponse } from 'src/common/dtos/list-response.dto';

@Controller('twitch-zomboid')
@ApiTags('트위치-좀보이드')
export class TwitchZomboidController {
  constructor(private twitchZomboidService: TwitchZomboidService) {}

  @ApiDoc({
    summary: '',
    responseModel: TwitchZomboidLogDto,
    isArrayResponse: true,
  })
  @Get('logs/:roomId')
  async findTwitchZomboidLog(
    @Param('roomId') roomId: string,
  ): Promise<ListResponse<TwitchZomboidLogDto[]>> {
    const logs = await this.twitchZomboidService.findTwitchZomboidLogByRoomId(
      roomId,
    );

    return new ListResponse(logs, 1);
  }

  @ApiDoc({
    summary: '',
  })
  @Post('logs/:roomId')
  async updateTwitchZomboidLog(@Param('roomId') roomId: string): Promise<void> {
    await this.twitchZomboidService.updateTwitchZomboidLogByRoomId(roomId);
  }
}
