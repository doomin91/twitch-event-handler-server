import { getManager, DeleteDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CoreHardEntity } from './core-hard.entity';

export class CoreSoftEntity extends CoreHardEntity {
  @ApiProperty({
    description: '삭제일시',
    readOnly: true,
  })
  @DeleteDateColumn({
    type: 'timestamptz',
  })
  @Expose()
  deletedAt: Date;

  static async createSequence(seqName?: string, startNumber = 1) {
    const manager = getManager();
    await manager.query(
      `CREATE SEQUENCE IF NOT EXISTS ${seqName} MINVALUE 1 MAXVALUE 9999999999 START ${startNumber};`,
    );
  }

  static async createCycleSequence(seqName?: string, startNumber = 1) {
    const manager = getManager();
    await manager.query(
      `CREATE SEQUENCE IF NOT EXISTS ${seqName} MINVALUE 1 MAXVALUE 9999 START ${startNumber} CYCLE;`,
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
