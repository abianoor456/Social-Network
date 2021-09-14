import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePostDto } from "src/dto/create-post.dto";
import { UpdatePostDto } from "src/dto/update-post.dto";
import { User } from "src/users/users.model";
import { Post } from "./posts.model";

@Injectable()
export class PostService {

    constructor(@InjectModel('Posts') private readonly postModel: Model<Post>,
        @InjectModel('Users') private readonly userModel: Model<User>) {
    }

    async create(post: CreatePostDto) {
        const newPost = new this.postModel(post);
        const NewPost = await newPost.save();
        console.log(NewPost);
        return NewPost;
    }

    async findAll(offset: string, limit: string) {
        try {
            const posts = await this.postModel.find()
                .skip(parseInt(offset))
                .limit(parseInt(limit)).exec(); 

            if (posts.length===0)
                throw new HttpException('Out of range index', HttpStatus.NOT_FOUND)
            else
                return posts;
        }
        catch (err) {
            throw new HttpException('Posts not found', HttpStatus.NOT_FOUND)
        }
    }

    async update(id: String, updatePostDto: UpdatePostDto) {
        try {
            const updatedPost = await this.postModel.findById(id).exec();
            if (updatePostDto.title) {
                updatedPost.title = updatePostDto.title
            }
            if (updatePostDto.description) {
                updatedPost.description = updatePostDto.description
            }
            updatedPost.save();
            return updatedPost;
        }
        catch (err) {
            throw new HttpException('Posts not found', HttpStatus.NOT_FOUND)
        }
    }

    async delete(id: String) {
            const result = await this.postModel.deleteOne({ _id: id }).exec(); 
            if(result.deletedCount===0)
                throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
            else
                return result;
    }

    async deleteUserPosts(user: User){
        const result= await this.postModel.deleteMany({user: user}).exec();
    }

    async findOne(id: String) {
        try {
            const users= await this.userModel.find();
            console.log(users);

            const post = await this.postModel.find({ _id: id });
            if (post.length===0)
                throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
            else
                return post;
        }
        catch (err) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }

    }

    async userPosts(followers:User[]){
        const posts= await this.postModel.find({user:{$in:followers }}).populate('user')
        return posts;
    }


}