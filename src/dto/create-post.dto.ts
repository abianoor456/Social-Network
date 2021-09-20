import { ObjectId } from "mongoose";
import { User } from "src/users/users.model";

export class CreatePostDto {
    readonly title: string;
    readonly description: string;
     user?: ObjectId

}