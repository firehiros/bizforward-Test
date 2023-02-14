import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { CreateTransactionDto } from './dto/create.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Post()
  create(@Body() createTypeDto: CreateTransactionDto) {
    return this.service.create(createTypeDto);
  }
}
