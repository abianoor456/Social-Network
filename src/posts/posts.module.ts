import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { PostScehma } from "./posts.model";
import { PostController } from "./posts.controller";
import { PostService } from "./posts.service";
import { UserSchema } from "src/users/users.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Posts', schema: PostScehma }]),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
    controllers: [PostController],
    providers: [PostService],
    exports:[PostService]
})

export class PostModule { }