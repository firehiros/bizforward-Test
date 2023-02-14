import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, MaxLength } from 'class-validator';
import { MESSAGES } from '@/helpers/messages';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Transaction amount',
    type: Number,
  })
  @IsNumber(
    { allowNaN: false },
    {
      message: MESSAGES.MSG_INVALID_FORMAT('amount'),
    },
  )
  @IsNotEmpty({
    message: MESSAGES.MSG_REQUIRED('amount'),
  })
  amount: number;

  @ApiProperty({
    description: 'Transaction description',
    type: String,
  })
  @IsNotEmpty({
    message: MESSAGES.MSG_REQUIRED('Description'),
  })
  @MaxLength(256, {
    message: MESSAGES.MSG_MAX_LENGTH('Description', 256),
  })
  description: string;

  @ApiProperty({
    description: 'User Id',
    type: String,
  })
  @IsNotEmpty({
    message: MESSAGES.MSG_REQUIRED('description'),
  })
  user_id: string;
}
