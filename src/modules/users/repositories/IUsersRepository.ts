import { User } from '../infra/typeorm/entities/User.entity';
import { CreateUserDTO } from '../infra/http/dtos/CreateUserDTO';

export default interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
