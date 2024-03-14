import { Column, Entity } from 'typeorm';
import { CoreSoftEntity } from 'src/common/entities/core-soft.entity';
import {
  IsCustomBoolean,
  IsCustomNumber,
  IsCustomString,
} from 'src/common/decorators/dto/dto.decorator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'TwitchZomboidLog', schema: process.env.DB_SCHEMA_NAME })
export class TwitchZomboidLog extends CoreSoftEntity {
  @ApiProperty({
    required: true,
    description: '닉네임',
  })
  @IsCustomString({
    required: true,
    minLength: 1,
    maxLength: 20,
  })
  @Column({ type: 'varchar', length: 20, nullable: false })
  displayName: string;

  @ApiProperty({
    required: false,
    example: true,
    description: '첫 메세지 여부',
  })
  @IsCustomBoolean({ required: false })
  @Column({ type: 'boolean', default: false })
  firstMsg: boolean;

  @ApiProperty({
    required: true,
    description: '방송 ID',
  })
  @IsCustomString({
    required: true,
    minLength: 1,
    maxLength: 20,
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  roomId: string;

  @ApiProperty({
    required: false,
    example: true,
    description: '구독자 여부',
  })
  @IsCustomBoolean({ required: false })
  @Column({ type: 'boolean', default: false })
  subscriber: boolean;

  @ApiProperty({
    required: false,
    example: true,
    description: '터보 여부',
  })
  @IsCustomBoolean({ required: false })
  @Column({ type: 'boolean', default: false })
  turbo: boolean;

  @ApiProperty({
    required: true,
    description: '유저 고유ID',
  })
  @IsCustomString({
    required: true,
    minLength: 1,
    maxLength: 100,
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  userId: string;

  @ApiProperty({
    required: true,
    description: '유저명',
  })
  @IsCustomString({
    required: true,
    minLength: 1,
    maxLength: 100,
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  userName: string;

  @ApiProperty({
    required: false,
    description: '메세지 타입',
  })
  @IsCustomString({
    required: false,
    minLength: 1,
    maxLength: 20,
  })
  @Column({ type: 'varchar', length: 20, nullable: false })
  messageType: string;

  @ApiProperty({
    required: false,
    description: '이벤트 타입',
  })
  @IsCustomString({
    required: false,
    minLength: 1,
    maxLength: 20,
  })
  @Column({ type: 'varchar', length: 20, nullable: false })
  eventType: string;

  @ApiProperty({
    required: false,
    example: true,
    description: '처리 여부',
  })
  @IsCustomBoolean({ required: false })
  @Column({ type: 'boolean', default: false })
  eventExecute: boolean;
}
