import {
  PrimaryGeneratedColumn,
  getManager,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CoreHardEntity {
  @ApiProperty({
    description: '데이터 ID(PK)',
    readOnly: true,
  })
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @ApiProperty({
    description: '생성일시',
    readOnly: true,
  })
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'createdAt',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: '수정일시',
    readOnly: true,
  })
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updatedAt',
  })
  @Expose()
  updatedAt: Date;

  static async createSequence(seqName?: string, startNumber = 1) {
    const manager = getManager();
    await manager.query(
      `CREATE SEQUENCE IF NOT EXISTS ${seqName} MINVALUE 1 MAXVALUE 9999999999 START ${startNumber};`,
    );
  }

  static async findNextSequence(seqName: string): Promise<number> {
    const manager = getManager();
    const result: { nextval: string }[] = await manager.query(
      `SELECT nextval('"${seqName}"')`,
    );

    return parseInt(result[0].nextval);
  }

  static async findCurrentSequence(seqName: string): Promise<number> {
    const manager = getManager();
    const result: { currval: string }[] = await manager.query(
      `SELECT currval('"${seqName}"')`,
    );

    return parseInt(result[0].currval);
  }
}
