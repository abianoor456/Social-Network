import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
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
        return await new this.postModel(post).save();
    }

    async findAll(offset: string, limit: string) {
        try {
           
            const posts = await this.postModel.find()
                .skip(parseInt(offset))
                .limit(parseInt(limit)).exec();

            if (posts.length === 0)
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
            const updatedPost = await this.postModel.findByIdAndUpdate(id, updatePostDto);
            updatedPost.save();
            return updatedPost;
        }
        catch (err) {
            throw new HttpException('Posts not found', HttpStatus.NOT_FOUND)
        }
    }

    async delete(id: String) {
        const result = await this.postModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        else {
            return result;
        }
    }



    async findOne(id: String) {
        try {
            const post = await this.postModel.findById(id);
            return post;
        }
        catch (err) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }

    }

    async userPosts(following: ObjectId[], offset: string, limit: string, searchQuery: string) {

        const posts = await this.postModel
            .find({ user: { $in: following }, $text: {$search: searchQuery}})
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .populate('user', '-_id');

        return posts;
    }


}