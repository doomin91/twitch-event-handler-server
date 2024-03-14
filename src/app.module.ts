import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import envFilePath from 'envs/env';
import * as Joi from 'joi';
import { WebtoonModule } from './webtoon/webtoon.module';
import { ScraperModule } from './scraper/scraper.module';
import { WebtoonScraperModule } from './webtoon-scraper/webtoon-scraper.module';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { ClsMiddleware, ClsModule, ClsService } from 'nestjs-cls';
import { v4 as uuidv4 } from 'uuid';
import packageJson from 'package.json';
import LoggerMiddleware from './logger/logger.middleware';
import { TwitchModule } from './twitch/twitch/twitch.module';
import { TwitchChatbotModule } from './twitch/twitch-chatbot/twtich-chatbot.module';
import { TwitchZomboidModule } from './twitch/twtich-zomboid/twitch-zomboid.module';
import { KakaoChatBotModule } from './kakao-chatbot/kakao-chatbot.module';
import { LoggerModule } from './logger/logger.module';

const envValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().valid('dev', 'staging', 'prod', 'test'),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  // JWT_SECRET: Joi.string().required(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: envValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA_NAME,
      synchronize: true,
      logging: process.env.DB_LOGGING === 'true' ? true : false,
      autoLoadEntities: true,
      // logger: new CustomDbLogger(),
      ssl: process.env.DB_SSL === 'true' ? true : false,
    }),
    ClsModule.forRoot({
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => {
          if (!req.headers['X-Request-Id']) {
            req.headers['X-Request-Id'] = uuidv4();
          }
          return req.headers['X-Request-Id'];
        },
      },
    }),
    WinstonModule.forRootAsync({
      imports: [ClsModule],
      inject: [ClsService],
      useFactory: async (cls: ClsService) => ({
        transports: [
          new winston.transports.Console({
            level:
              process.env.NODE_ENV === 'qa' ||
              process.env.NODE_ENV === 'staging'
                ? 'info'
                : 'silly',
            format: winston.format.combine(
              winston.format.timestamp({
                format: () => {
                  const now = new Date().toISOString();
                  return now;
                },
              }),
              nestWinstonModuleUtilities.format.nestLike(packageJson.name),
              winston.format((info) => {
                info.traceId = cls.getId();
                return info;
              })(),
              process.env.NODE_ENV === 'prod' ||
                process.env.NODE_ENV === 'qa' ||
                process.env.NODE_ENV === 'staging'
                ? winston.format.json()
                : winston.format.colorize(),
            ),
          }),
        ],
      }),
    }),
    LoggerModule,
    ScraperModule,
    TwitchModule,
    TwitchChatbotModule,
    TwitchZomboidModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(ClsMiddleware, LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
