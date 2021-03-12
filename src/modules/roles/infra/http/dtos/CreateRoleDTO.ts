import { Role } from '@shared/utils/role.enum';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class CreateRoleDTO {
  @IsNotEmpty()
  @IsEnum(Role, { message: `Please provide an valid enum: ['users', 'admin']` })
  name: Role;
}
