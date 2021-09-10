import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateuserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { User } from "./users.model";
import { UserService } from "./users.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    async addUser(@Body() createUserDto: CreateuserDto) {
        const user = await this.userService.insertUser(createUserDto);
        return user;
    }

    @Get()
    async getUsers() {
        const users = await this.userService.getUsers();
        return users;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userService.update(id, updateUserDto);
        return updatedUser;
    }

    @Delete(':id')
    async delete(@Param('id') id: String) {
        const deletedUser = await this.userService.deleteUser(id);
        return deletedUser;
    }

}