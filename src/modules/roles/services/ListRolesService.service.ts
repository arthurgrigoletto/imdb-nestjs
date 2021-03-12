import { Injectable } from '@nestjs/common';
import { Role } from '../infra/typeorm/entities/Role.entity';
import { RolesRepository } from '../infra/typeorm/repositories/RolesRepository';

@Injectable()
export class ListRolesService {
  constructor(private rolesRepository: RolesRepository) {}

  public async execute(): Promise<Role[]> {
    const roles = await this.rolesRepository.findAll();

    return roles;
  }
}
