import { PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMPZ', type: 'timestamptz' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMPZ', type: 'timestamptz' })
  updated_at: Date;
}
