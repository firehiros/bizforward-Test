import { MESSAGES } from '@/helpers/messages';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findOneByApi(api_key: string): Promise<User> {
    try {
      const user = await this.userRepo.findOne({
        where: {
          api_key,
        },
      });
      if (!user) {
        throw new HttpException(
          MESSAGES.MSG_NOT_FOUND('User'),
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
