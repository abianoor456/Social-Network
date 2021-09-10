import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { UserSchema } from "./users.model";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {}