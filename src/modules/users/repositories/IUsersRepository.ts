import { User } from '../infra/typeorm/entities/User.entity';
import { CreateUserDatabaseDTO } from '../infra/http/dtos/CreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserDatabaseDTO): Promise<User>;
  save(user: User): Promise<User>;
}
