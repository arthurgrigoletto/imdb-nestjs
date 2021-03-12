import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { User } from '@modules/users/infra/typeorm/entities/User.entity';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { CreateUserDatabaseDTO } from '../../http/dtos/CreateUserDTO';

@EntityRepository(User)
export class UsersRepository
  extends AbstractRepository<User>
  implements IUsersRepository {
  public async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: { id },
      relations: ['roles'],
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email }, relations: ['roles'] });
  }

  public async create({
    name,
    email,
    password,
    roles,
  }: CreateUserDatabaseDTO): Promise<User> {
    const user = this.repository.create({ email, password, name, roles });

    await this.repository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
