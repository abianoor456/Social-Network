import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateuserDto } from "src/dto/create-user.dto";
import { LoginUserDto } from "src/dto/login-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { Post } from "src/posts/posts.model";
import { User } from "./users.model";

@Injectable()
export class UserService {

    constructor(@InjectModel('Users') private readonly userModel: Model<User>,
        @InjectModel('Posts') private readonly postModel: Model<Post>,
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
                await this.postModel.deleteMany({ user: userId }).exec();
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
            const result = await this.userModel.find({email:email}).exec();
            if (result === null)
                throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
            else
                return result;
        }
        catch (err) {
            throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
        }
    }


    async follow(followerId: String, toFollow: String) {

        let follower: User;
        let tofollow: User;

        const result = await this.findOne(followerId);
        follower= result[0]

        const result1= await this.findOne(toFollow);
        tofollow= result1[0]

        let exists = false;
        console.log(`Follower: ${follower}`)
        console.log(`Followed: ${tofollow}`)

        const x = tofollow.followers.filter(x => x._id.toString() === followerId);
        if (x.length > 0) {
            exists = true;
        }

        if (exists === false) {
            this.userModel.update(
                { _id: toFollow },
                { $push: { followers: follower } }
             )
             this.userModel.update(
                 {_id: followerId},
                 {$push:{following:tofollow}}
             )
            tofollow.save();
            follower.save();
            console.log(`${followerId} is following ${toFollow}`)
            console.log('the follower was',follower);
            console.log('followed: ',tofollow);
            
            return tofollow;
        }
        else {
            console.log(`You are already follwoing this user`);
        }

    }

    async unfollow(followerId: String, toFollow: String) {

        let tofollow: User;
        let follower: User;

        const result1= await this.findOne(toFollow);
        tofollow= result1[0]

        const result = await this.findOne(followerId);
        follower= result[0]

        tofollow.followers.forEach((item, index) => {
            if (item.toString() === follower._id.toString()){ 
                tofollow.followers.splice(index, 1)
            };
        });

        follower.following.forEach((item, index) => {
            if (item.toString() === tofollow._id.toString()){ 
                tofollow.followers.splice(index, 1)
            };
        });

        tofollow.save();
        follower.save();
        console.log(`${followerId} is unfollowing ${toFollow}`)
        console.log('the follower was',follower);
        console.log('unfollowed: ',tofollow);
        return tofollow;
    }
   
}