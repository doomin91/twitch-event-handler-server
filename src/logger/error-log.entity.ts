import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ErrorLog', schema: process.env.DB_SCHEMA_NAME })
class ErrorLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 999999,
    nullable: true,
  })
  ip: string;

  @Column({
    type: 'varchar',
    length: 999999,
    nullable: true,
  })
  protocol: string;

  @Column({
    type: 'varchar',
    length: 999999,
    nullable: true,
  })
  url: string;

  @Column({
    type: 'varchar',
    length: 999999,
    nullable: true,
  })
  method: string;

  @Column({
    type: 'varchar',
    length: 999999,
    nullable: true,
  })
  requestBody: string;

  @Column({
    type: 'varchar',
    length: 999999,
    nullable: true,
  })
  requestQuery: string;

  @Column({
    type: 'varchar',
    length: 999999,
    nullable: true,
  })
  message: string;

  @Column({
    type: 'varchar',
    length: 999999,
    nullable: true,
  })
  callStack: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

export default ErrorLog;
