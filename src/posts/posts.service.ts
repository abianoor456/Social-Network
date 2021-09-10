import { Injectable } from "@nestjs/common";
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

    async insertPost(post: CreatePostDto) {
        //const user= await this.userModel.findOne({"_id": "613aced1b33490266bc0cb9f"}) ;
        const newPost = new this.postModel(post);
        const NewPost = await newPost.save();
        console.log(NewPost);
        return NewPost;
    }

    async getPost() {
        const posts = await this.postModel.find().exec();
        return posts;
    }

    async update(id: String, updatePostDto: UpdatePostDto) {
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

    async deletePost(id: String) {
        const result = await this.postModel.deleteOne({ _id: id }).exec();
        return result;
    }

}