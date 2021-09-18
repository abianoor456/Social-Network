import { ObjectId } from "mongoose";
import { User } from "src/users/users.model";

export class CreateuserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
   
}