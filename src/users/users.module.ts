import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { UserSchema } from "./users.model";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { PostScehma } from "src/posts/posts.model";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [AuthModule, MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Posts', schema: PostScehma }]) ],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {}