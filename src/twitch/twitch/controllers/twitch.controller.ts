import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDoc } from 'src/common/decorators/swagger/api-doc.decorator';
import { TwitchAuthService } from 'src/twitch/twitch-auth/twitch-auth.service';
import { TwitchService } from '../services/twitch.service';

@Controller('twitch')
@ApiTags('트위치')
export class TwitchController {
  constructor(private twitchService: TwitchService) {}

  @ApiDoc({
    summary: 'Get Twitch User',
  })
  @Get('/users/:userId')
  async getUsers(@Param('userId') userId: string) {
    return await this.twitchService.getUsers(userId);
  }

  @ApiDoc({
    summary: 'Create Poll',
  })
  @Post('/polls/')
  async createPolls() {
    return await this.twitchService.createPolls();
  }
}
