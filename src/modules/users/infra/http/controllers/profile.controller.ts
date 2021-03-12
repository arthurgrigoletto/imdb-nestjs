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

import { HasRoles } from '@shared/infra/http/decorators/roles.decorators';
import { RolesGuard } from '@shared/infra/http/guards/Roles.guard';
import { JwtAuthGuard } from '@shared/infra/http/guards/JwtAuth.guard';
import { Role } from '@shared/utils/role.enum';
import { ShowProfileService } from '@modules/users/services/ShowProfileService.service';
import { User } from '@modules/users/infra/typeorm/entities/User.entity';
import { UpdateUserService } from '@modules/users/services/UpdateUserService.service';
import { UpdateUserDto } from '../dtos/UpdateUserDTO';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly showProfileService: ShowProfileService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
