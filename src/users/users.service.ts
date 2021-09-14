import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateuserDto } from "src/dto/create-user.dto";
import { LoginUserDto } from "src/dto/login-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { Post } from "src/posts/posts.model";
import { PostService } from "src/posts/posts.service";
import { User } from "./users.model";

@Injectable()
export class UserService {

    constructor(@InjectModel('Users') private readonly userModel: Model<User>,
       private postService: PostService
    ) {
    }

    async create(user: CreateuserDto) {
        const newUser = new this.userModel(user);
        const userMade = await newUser.save();
        console.log(userMade);
        return userMade;
    }

    async findAll() {
        const users = await this.userModel.find().exec();
        return users;
    }

    async update(id: String, updateUserDto: UpdateUserDto) {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto);
            updatedUser.save();
            return updatedUser;
        }
        catch (err) {
            throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
        }
    }

    async delete(id: String) {
        try {
            const userId = await this.userModel.findById(id).exec();
            const result = await this.userModel.deleteOne({ _id: id }).exec();
            if (result.deletedCount === 0)
                throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            else {
                await this.postService.deleteUserPosts(userId);
                return result;
            }
        }
        catch (err) {
            throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
        }
    }

    async findOne(email: String) {
        try {
            console.log(email)
            const result = await this.userModel.find({ email: email }).exec();
            if (result === null)
                throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
            else
                return result;
        }
        catch (err) {
            throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
        }
    }

    

    async follow(followerId: String, toFollow: String){
        await this.userModel.updateOne({_id:followerId},{
            $push:{following:toFollow}
        })
        
    }

    async unfollow(followerId: String, toFollow: String){
       await this.userModel.updateOne({_id:followerId},{
            $pull:{following:toFollow}
        })

    }
    

    async feed(id: String){
        
        const user = await this.userModel.findById(id);
        console.log(user);
        let posts :Post[];
        posts=[]
          return await Promise.all (user.following.map(async (item, index)=>{
            const userPosts= await this.postService.userPosts(item);
            posts.push(...userPosts);
            return userPosts;
          })
          )
    }

}