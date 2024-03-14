import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ErrorLog from './error-log.entity';

@Global()
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ErrorLog])],
  controllers: [],
  providers: [],
})
export class LoggerModule {}
