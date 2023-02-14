import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MESSAGES } from '@/helpers/messages';
import { RECORDS_LIMIT } from '@/helpers/constants';
import { User } from '@/modules//users/entities/user.entity';
import { CreateTransactionDto } from './dto/create.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async create(dto: CreateTransactionDto, user: User) {
    try {
      const result = await this.transactionRepo
        .createQueryBuilder('transactions')
        .select('SUM(transactions.amount)', 'totalAmount')
        .where({ user })
        .getRawOne();

      if (result?.totalAmount >= RECORDS_LIMIT) {
        throw new HttpException(
          MESSAGES.MGS_RECORDS_LIMIT,
          HttpStatus.PAYMENT_REQUIRED,
        );
      }

      const transaction = await this.transactionRepo.save({
        ...dto,
        user,
      });
      return transaction;
    } catch (e) {
      throw new HttpException(
        e.message,
        e.getStatus() || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
