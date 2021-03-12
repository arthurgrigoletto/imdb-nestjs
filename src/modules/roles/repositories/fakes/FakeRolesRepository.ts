import { v4 as uuid } from 'uuid';

import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import { Role } from '@modules/roles/infra/typeorm/entities/Role.entity';
import { Role as UserRole } from '@shared/utils/role.enum';
import { CreateRoleDTO } from '@modules/roles/infra/http/dtos/CreateRoleDTO';

export class FakeRolesRepository implements IRolesRepository {
  private roles: Role[] = [];

  public async findAll(): Promise<Role[]> {
    return this.roles;
  }

  public async findAllByRoleNames(names: UserRole[]): Promise<Role[]> {
    return this.roles.filter((role) => names.includes(role.name));
  }

  public async findByRoleName(name: UserRole): Promise<Role | undefined> {
    return this.roles.find((role) => role.name === name);
  }

  public async create(createData: CreateRoleDTO): Promise<Role> {
    const role = new Role();

    Object.assign(role, { id: uuid() }, createData);

    this.roles.push(role);

    return role;
  }
}
