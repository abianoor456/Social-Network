import { Body, Get, Controller, Post, Patch, Param, Delete } from "@nestjs/common";
import { get } from "http";
import { CreatePostDto } from "src/dto/create-post.dto";
import { UpdatePostDto } from "src/dto/update-post.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { User } from "src/users/users.model";
import { PostService } from "./posts.service";

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {
    }

    @Post()
    async addPost(@Body() createPostDto: CreatePostDto) {
        const post = await this.postService.insertPost(createPostDto);
        return post;
    }

    @Get()
    async getPosts() {
        const posts = await this.postService.getPost();
        return posts;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatepostDto: UpdatePostDto) {
        const updatedPost = await this.postService.update(id, updatepostDto);
        return updatedPost;
    }

    @Delete(':id')
    async delete(@Param('id') id: String) {
        const deletedPost = await this.postService.deletePost(id);
        return deletedPost;
    }
}