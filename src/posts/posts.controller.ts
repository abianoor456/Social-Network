import { Body, Get, Controller, Post, Patch, Param, Delete, Query, Put, UnauthorizedException, UseGuards, Request } from "@nestjs/common";
import { CreatePostDto } from "src/dto/create-post.dto";
import { UpdatePostDto } from "src/dto/update-post.dto";
import { PostService } from "./posts.service";
import { io } from 'socket.io-client';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    async create(@Body() createPostDto: CreatePostDto, @Request() req) {
        createPostDto.user= req.user.userId;
        const post = await this.postService.create(createPostDto);
        if (post) {
             const socket = io('http://localhost:3000')
             const payload={Post:post, User: req.user}
             socket.emit('msgToServer',payload )
            return { Post: post };
        }
        else {
            throw new UnauthorizedException();
        }
    }

    @Get()
    async findAll(@Query('offset') offset: string, @Query('limit') limit: string) {
        const post = await this.postService.findAll(offset, limit);
        return { Post: post };
    }

    @Get(':id')
    async findOne(@Param('id') id: String) {
        const post = await this.postService.findOne(id);
        return { Post: post };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatepostDto: UpdatePostDto) {
        const post = await this.postService.update(id, updatepostDto);
        return { Post: post };
    }

    @Delete(':id')
    async delete(@Param('id') id: String) {
        const post = await this.postService.delete(id);
        return { Post: post };
    }
}