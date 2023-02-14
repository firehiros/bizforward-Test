import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from '@/modules/transactions/entities/transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 128,
  })
  name: string;

  @Column({
    name: 'api_key',
    type: 'varchar',
    length: 256,
    unique: true,
  })
  api_key: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: true,
  })
  @JoinTable()
  transactions?: Transaction[];
}
