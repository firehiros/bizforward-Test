import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true });
  }

  async validate(req: Request): Promise<any> {
    const api_key = req.headers['apikey'];
    console.log(api_key);
    const user = await this.authService.validateUser(api_key);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
