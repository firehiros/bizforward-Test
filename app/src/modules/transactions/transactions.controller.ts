import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { CreateTransactionDto } from './dto/create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @UseGuards(AuthGuard('custom'))
  @Post()
  create(@Body() createTypeDto: CreateTransactionDto, @Request() req) {
    return this.service.create(createTypeDto, req.user);
  }
}
