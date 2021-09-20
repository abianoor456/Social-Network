import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards,Query } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "src/auth/guards/local-auth.guard";
import { CreateuserDto } from "src/dto/create-user.dto";
import { LoginUserDto } from "src/dto/login-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { UserService } from "./users.service";
import { io } from 'socket.io-client';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {
    }

    @Post()
    async create(@Body() createUserDto: CreateuserDto) {
        const user = await this.userService.create(createUserDto);
        return { User: user };
    }

    @Get()
    async findAll() {
        const user = await this.userService.findAll();
        return { User: user }
    }

    @Get('/getOne/:email')
    async findOne(@Param('email') email: String) {
        const user = await this.userService.findOne(email);
        return { User: user }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userService.update(id, updateUserDto);
        return { User: updatedUser };
    }

    @Patch('/follow/:follwerId/:followId')
    async follow(@Param('follwerId') follwerId: String, @Param('followId') followId: String) {
        const user = await this.userService.follow(follwerId, followId);
        
        return { User: user };
    }

    @Patch('/unfollow/:follwerId/:followId')
    async unfollow(@Param('follwerId') follwerId: String, @Param('followId') followId: String) {
        const user = await this.userService.unfollow(follwerId, followId);
        return { User: user };
    }

    @Delete(':id')
    async delete(@Param('id') id: String) {
        const user = await this.userService.delete(id);
        return { User: user }
    }


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() user: LoginUserDto) {
        console.log(user);
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user
    }

    @UseGuards(JwtAuthGuard)
    @Get('/feed')
    @ApiBearerAuth()
    async feed(@Request() req,@Query('offset') offset: string, @Query('limit') limit: string,@Query('query') query: string){
        console.log('in feed controller',req.user);
        const posts= await this.userService.feed(req.user,offset,limit,query)
        return posts;
    }

}