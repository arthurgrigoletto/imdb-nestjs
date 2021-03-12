import { Role } from '../infra/typeorm/entities/Role.entity';
import { Role as UserRole } from '@shared/utils/role.enum';
import { CreateRoleDTO } from '../infra/http/dtos/CreateRoleDTO';

export default interface IUsersRepository {
  findAll(): Promise<Role[]>;
  findAllByRoleNames(names: UserRole[]): Promise<Role[]>;
  findByRoleName(name: UserRole): Promise<Role | undefined>;
  create(createData: CreateRoleDTO): Promise<Role>;
}
