import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { User } from '@modules/users/infra/typeorm/entities/User.entity';
import { BCryptHashProvider } from '../providers/HashProvider/implementations/BCryptHashProvider.service';
import { RedisCacheProvider } from '@shared/providers/CacheProvider/implementations/RedisCacheProvider.service';
import { CreateUserDTO } from '../infra/http/dtos/CreateUserDTO';

@Injectable()
export class CreateUserService {
  constructor(
    private usersRepository: UsersRepository,

    private readonly hashProvider: BCryptHashProvider,

    private readonly redisCacheService: RedisCacheProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new BadRequestException('Email addess already used');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await this.redisCacheService.invalidate('users-list');

    return user;
  }
}
