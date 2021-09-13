import { User } from "src/users/users.model";

export class UpdateUserDto {
    readonly firstName?: string;
    readonly lastName?: string;
    readonly password?: string;
}