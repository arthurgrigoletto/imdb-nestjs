import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { jwt } from '@config/auth';

import { RolesRepository } from './infra/typeorm/repositories/RolesRepository';
import { RolesController } from './infra/http/controllers/role.controller';
import { ListRolesService } from './services/ListRolesService.service';
import { CreateRoleService } from './services/CreateRoleService.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolesRepository]),
    PassportModule,
    JwtModule.register({
      secret: jwt.secret,
      signOptions: { expiresIn: jwt.expiresIn },
    }),
  ],
  controllers: [RolesController],
  providers: [ListRolesService, CreateRoleService],
})
export class RolesModule {}
