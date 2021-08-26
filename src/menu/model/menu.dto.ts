import { UserDto, UserRole } from "src/user/models/user.dto";
import { IsAlphanumeric, IsEmail, IsNotEmpty } from "class-validator";

export class MenuDto {
  id?: number;

  @IsNotEmpty({ message: 'The menuname is required' })
  menuname?: string;

  role?: UserRole;

  //userEn?: UserDto;
}