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
    async create(@Body() createUserDto: CreateuserDto) {
        const user = await this.userService.create(createUserDto);
        return {User: user};
    }

    @Get()
    async findAll() {
        const user = await this.userService.findAll();
        return {User: user}
    }

    @Get(':id')
    async findOne(@Param('id') id:String){
        const user= await this.userService.findOne(id);
        return {User: user}
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userService.update(id, updateUserDto);
        return updatedUser;
    }

    @Patch('/follow/:follwerId/:followId')
    async follow(@Param('follwerId') follwerId: String,@Param('followId') followId: String){
        const user=await this.userService.follow(follwerId,followId);
        return user;
    }

    @Patch('/unfollow/:follwerId/:followId')
    async unfollow(@Param('follwerId') follwerId: String,@Param('followId') followId: String){
        const user=await this.userService.unfollow(follwerId,followId);
        return user;
    }

    @Delete(':id')
    async delete(@Param('id') id: String) {
        const user = await this.userService.delete(id);
        return {User: user}
    }

}