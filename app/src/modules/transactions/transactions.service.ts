import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTransactionDto } from './dto/create.dto';

import { Transaction } from './entities/transaction.entity';
import { MESSAGES } from '@/helpers/messages';
import { RECORDS_LIMIT } from '@/helpers/constants';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async create(dto: CreateTransactionDto) {
    try {
      const [records, numRecords] = await this.transactionRepo.findAndCount();
      if (numRecords >= RECORDS_LIMIT) {
        throw new HttpException(
          MESSAGES.MGS_RECORDS_LIMIT,
          HttpStatus.BAD_REQUEST,
        );
      }
      const transaction = await this.transactionRepo.save({
        ...dto,
      });
      return transaction;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
