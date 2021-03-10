import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../typeorm/entities/User.entity';
import { CreateUserService } from '@modules/users/services/CreateUserService.service';
import { CreateUserDTO } from './dtos/CreateUserDTO';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return this.createUserService.execute(createUserDto);
  }
}
