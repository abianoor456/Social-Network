import { Body, Get, Controller, Post, Patch, Param, Delete ,Query} from "@nestjs/common";
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
    async create(@Body() createPostDto: CreatePostDto) {
        const post = await this.postService.create(createPostDto);
        return {Post: post};
    }

    @Get()
    async findAll(@Query('offset') offset: string, @Query('limit') limit: string) {
        const post = await this.postService.findAll(offset,limit);
        return {Post: post};
    }

    @Get(':id')
    async findOne(@Param('id') id:String){
        const post= await this.postService.findOne(id);
        return {Post: post};
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatepostDto: UpdatePostDto) {
        const post = await this.postService.update(id, updatepostDto);
        return {Post: post};
    }

    @Delete(':id')
    async delete(@Param('id') id: String) {
        const post = await this.postService.delete(id);
        return {Post: post};
    }
}