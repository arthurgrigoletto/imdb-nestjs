import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import { Role } from '@modules/roles/infra/typeorm/entities/Role.entity';
import { AbstractRepository, EntityRepository, In } from 'typeorm';
import { Role as UserRole } from '@shared/utils/role.enum';
import { CreateRoleDTO } from '../../http/dtos/CreateRoleDTO';

@EntityRepository(Role)
export class RolesRepository
  extends AbstractRepository<Role>
  implements IRolesRepository {
  public async findAll(): Promise<Role[]> {
    return this.repository.find();
  }

  public async findAllByRoleNames(names: UserRole[]): Promise<Role[]> {
    return this.repository.find({ where: { name: In(names) } });
  }

  public async findByRoleName(name: UserRole): Promise<Role | undefined> {
    return this.repository.findOne({ where: { name } });
  }

  public async create({ name }: CreateRoleDTO): Promise<Role> {
    const role = this.repository.create({ name });

    await this.repository.save(role);

    return role;
  }
}
