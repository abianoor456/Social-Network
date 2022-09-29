import { Body, Get, Controller, Post, Patch, Param, Delete, Query, Put, UnauthorizedException, UseGuards, Request } from "@nestjs/common";
import { CreatePostDto } from "src/dto/create-post.dto";
import { UpdatePostDto } from "src/dto/update-post.dto";
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
        const newPost = await this.postService.create(createPostDto);
        if (newPost) {
             const socket = io()
             const payload={Post:newPost, User: req.user}
             socket.emit('msgToServer',payload )
            return { Post: newPost };
        }
        else {
            throw new UnauthorizedException();
        }
    }
    
}