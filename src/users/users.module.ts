import { MongooseModule } from "@nestjs/mongoose";
import { forwardRef, Module } from "@nestjs/common";
import { UserSchema } from "./users.model";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { AuthModule } from "src/auth/auth.module";
import { PostModule } from "src/posts/posts.module";

@Module({
    imports: [forwardRef(() => AuthModule), MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
     PostModule],
    controllers: [UserController],
    providers: [UserService],
    exports:[UserService]
})

export class UserModule {}