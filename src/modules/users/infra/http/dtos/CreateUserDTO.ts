import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';

import { Role as UserRoles } from '@shared/utils/role.enum';
import { OmitType } from '@nestjs/mapped-types';
import { Role } from '@modules/roles/infra/typeorm/entities/Role.entity';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserRoles, {
    each: true,
    message: `Please provide an valid enum: ['users', 'admin']`,
  })
  roles: UserRoles[];

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}

export class CreateUserDatabaseDTO extends OmitType(CreateUserDTO, [
  'roles',
] as const) {
  roles: Role[];
}
