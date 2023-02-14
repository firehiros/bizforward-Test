import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  static key = 'custom';

  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request) {
    const api_key = req.headers['apikey'];
    const user = await this.authService.validateUser(api_key);
    if (!user) {
      throw new UnauthorizedException();
    }
    // req.user = user;
    return user;
  }
}
