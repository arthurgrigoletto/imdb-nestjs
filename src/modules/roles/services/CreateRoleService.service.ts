import { BadRequestException, Injectable } from '@nestjs/common';

import { RolesRepository } from '@modules/roles/infra/typeorm/repositories/RolesRepository';
import { Role } from '@modules/roles/infra/typeorm/entities/Role.entity';
import { CreateRoleDTO } from '../infra/http/dtos/CreateRoleDTO';

@Injectable()
export class CreateRoleService {
  constructor(private rolesRepository: RolesRepository) {}

  public async execute({ name }: CreateRoleDTO): Promise<Role> {
    const checkRoleExists = await this.rolesRepository.findByRoleName(name);

    if (checkRoleExists) {
      throw new BadRequestException('Role already exists');
    }

    const role = await this.rolesRepository.create({
      name,
    });

    return role;
  }
}
