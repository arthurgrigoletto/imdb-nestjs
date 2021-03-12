import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateRoleService } from '@modules/roles/services/CreateRoleService.service';
import { ListRolesService } from '@modules/roles/services/ListRolesService.service';
import { Role } from '../../typeorm/entities/Role.entity';
import { CreateRoleDTO } from '../dtos/CreateRoleDTO';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly listRolesService: ListRolesService,
    private readonly createRoleService: CreateRoleService,
  ) {}

  @Get()
  public async findAll(): Promise<Role[]> {
    return this.listRolesService.execute();
  }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDTO): Promise<Role> {
    return this.createRoleService.execute(createRoleDto);
  }
}
