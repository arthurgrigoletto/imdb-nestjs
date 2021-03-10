import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { RedisCacheModule } from '@shared/providers/CacheProvider/redisCache.module';
import { jwt } from '@config/auth';
import { HashProviderModule } from './providers/HashProvider/hashProvider.module';
import { AuthProviderModule } from './providers/AuthProvider/authProvider.module';

import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import { UsersController } from './infra/http/users.controller';
import { ProfileController } from './infra/http/profile.controller';
import { SessionController } from './infra/http/session.controller';

import { CreateUserService } from './services/CreateUserService.service';
import { UpdateUserService } from './services/UpdateUserService.service';
import { ShowProfileService } from './services/ShowProfileService.service';
import { AuthenticateUserService } from './services/AuthenticateUserService.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    RedisCacheModule,
    HashProviderModule,
    AuthProviderModule,
    PassportModule,
    JwtModule.register({
      secret: jwt.secret,
      signOptions: { expiresIn: jwt.expiresIn },
    }),
  ],
  controllers: [UsersController, ProfileController, SessionController],
  providers: [
    AuthenticateUserService,
    CreateUserService,
    ShowProfileService,
    UpdateUserService,
  ],
})
export class UsersModule {}
