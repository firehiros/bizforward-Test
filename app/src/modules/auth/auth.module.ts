import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '@/modules/users/users.module';
import { CustomStrategy } from '@/helpers/trategies/custom.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'custom', property: 'user' }),
  ],
  providers: [AuthService, CustomStrategy],
  exports: [AuthService],
})
export class AuthModule {}
