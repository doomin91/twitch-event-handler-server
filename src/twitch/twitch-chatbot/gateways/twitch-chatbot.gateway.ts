import { TwitchZomboidService } from 'src/twitch/twtich-zomboid/twitch-zomboid.service';
import { TwitchChatbotService } from '../services/twtich-chatbot.service';
import { WebSocketGateway } from '@nestjs/websockets';
import { TwitchZomboidLogDto } from 'src/twitch/twtich-zomboid/dtos/twitch-zomboid-log.dto';

@WebSocketGateway()
export class TwitchChatbotGateway {
  client;
  constructor(
    private twtichChatbotService: TwitchChatbotService,
    private twitchZomboidService: TwitchZomboidService,
  ) {}

  afterInit() {
    this.client = this.twtichChatbotService.connect();

    this.client.on('connected', (addr, port) => {
      console.log(`* Connected to ${addr}:${port}`);
    });

    this.client.on('message', (target, context, msg, self) => {
      if (self) {
        return;
      } // Ignore messages from the bot

      const commandName = msg.trim();
      this.onMessageHandler(target, context, commandName);
    });
  }

  onMessageHandler(target, context, commandName) {
    // If the command is known, let's execute it

    console.log(target);
    console.log(context);

    const twitchZomboidLog = new TwitchZomboidLogDto();

    twitchZomboidLog.displayName = context['display-name'];
    twitchZomboidLog.firstMsg = context['first-msg'];
    twitchZomboidLog.roomId = context['room-id'];
    twitchZomboidLog.subscriber = context['subscriber'];
    twitchZomboidLog.turbo = context['turbo'];
    twitchZomboidLog.userId = context['user-id'];
    twitchZomboidLog.userName = context['username'];
    twitchZomboidLog.messageType = context['message-type'];

    switch (commandName) {
      case '!좀비':
        twitchZomboidLog.eventType = '좀비';
        this.twitchZomboidService.insertTwitchZomboidLog(twitchZomboidLog);
        // const num = this.rollDice();
        // this.client.say(target, `You rolled a ${num}`);
        break;
    }
  }
}
