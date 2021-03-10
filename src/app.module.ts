import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
