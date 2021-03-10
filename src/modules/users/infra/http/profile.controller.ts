import {
  Controller,
  Get,
  UseGuards,
  Request,
  Put,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { JwtAuthGuard } from '@modules/users/providers/AuthProvider/guards/JwtAuth.guard';
import { ShowProfileService } from '@modules/users/services/ShowProfileService.service';
import { User } from '../typeorm/entities/User.entity';
import { UpdateUserDto } from './dtos/UpdateUserDTO';
import { UpdateUserService } from '@modules/users/services/UpdateUserService.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly showProfileService: ShowProfileService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async findOne(@Request() req: any): Promise<User> {
    const user = await this.showProfileService.execute({ userId: req.user.id });

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  public async update(
    @Request() req: any,
    @Body() updateuserDto: UpdateUserDto,
  ): Promise<User> {
    const userId = req.user.id;
    const { email, name, password, oldPassword } = updateuserDto;

    const user = await this.updateUserService.execute({
      userId,
      oldPassword,
      password,
      name,
      email,
    });

    return user;
  }
}
