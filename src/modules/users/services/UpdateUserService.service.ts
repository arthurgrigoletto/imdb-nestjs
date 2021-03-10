import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { User } from '@modules/users/infra/typeorm/entities/User.entity';
import { RedisCacheProvider } from '@shared/providers/CacheProvider/implementations/RedisCacheProvider.service';
import { BCryptHashProvider } from '../providers/HashProvider/implementations/BCryptHashProvider.service';
import { UpdateUserDto } from '../infra/http/dtos/UpdateUserDTO';

@Injectable()
export class UpdateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly hashProvider: BCryptHashProvider,
    private readonly redisCacheService: RedisCacheProvider,
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
      throw new BadRequestException('Email already in use');
    }

    Object.assign(user, { name, email });

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new BadRequestException('Old Password does not match');
      }

      const newPasswordHash = await this.hashProvider.generateHash(password);

      Object.assign(user, { password: newPasswordHash });
    }

    await this.redisCacheService.invalidate('users-list');

    return this.usersRepository.save(user);
  }
}
