import { Injectable } from '@nestjs/common';
import { UserService } from '@/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(api_key: string): Promise<any> {
    const user = await this.userService.findOneByApi(api_key);
    return user;
  }
}
