import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role as UserRole } from '@shared/utils/role.enum';
import { Role } from '@modules/roles/infra/typeorm/entities/Role.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([{ name: UserRole.USER }, { name: UserRole.ADMIN }])
      .execute();
  }
}
