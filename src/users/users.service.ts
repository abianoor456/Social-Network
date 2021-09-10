import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateuserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { User } from "./users.model";

@Injectable()
export class UserService {

    constructor(@InjectModel('Users') private readonly userModel: Model<User>) {
    }

    async insertUser(user: CreateuserDto) {
        const newUser = new this.userModel(user);
        const userMade = await newUser.save();
        console.log(userMade);
        return userMade;
    }

    async getUsers() {
        const users = await this.userModel.find().exec();
        return users;
    }

    async update(id: String, updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userModel.findById(id).exec();
        if (updateUserDto.firstName) {
            updatedUser.firstName = updateUserDto.firstName;
        }
        if (updateUserDto.lastName) {
            updatedUser.lastName = updateUserDto.lastName;
        }
        if (updateUserDto.password) {
            updatedUser.password = updateUserDto.password;
        }
        updatedUser.save();
        return updatedUser;
    }

    async deleteUser(id: String) {
        const result = await this.userModel.deleteOne({ _id: id }).exec();
        return result;
    }
}