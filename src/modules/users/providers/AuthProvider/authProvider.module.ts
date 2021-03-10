import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { JwtStrategy } from './implementations/JwtStrategyService.service';
import { LocalStrategy } from './implementations/LocalStrategyService.service';
import { HashProviderModule } from '../HashProvider/hashProvider.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), HashProviderModule],
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthProviderModule {}
