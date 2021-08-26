import { MenuDto } from "src/menu/model/menu.dto";
import { IsAlphanumeric, IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
    id?: number;

    @IsAlphanumeric()
    @IsNotEmpty({ message: 'The username is required' })
    username?: string;

    @IsEmail()
    @IsNotEmpty({ message: 'The email is required' })
    email?: string;

    @IsAlphanumeric()
    @IsNotEmpty({ message: 'The password is required' })
    password?: string;

    role?: UserRole;

    //menuEn?: MenuDto[];
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}