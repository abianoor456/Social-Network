import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateuserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { Post } from "src/posts/posts.model";
import { User } from "./users.model";

@Injectable()
export class UserService {

    constructor(@InjectModel('Users') private readonly userModel: Model<User>,
        @InjectModel('Posts') private readonly postModel: Model<Post>) {
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
            const updatedUser = await this.userModel.findById(id).exec();
            if (updateUserDto.firstName) {
                updatedUser.firstName = updateUserDto.firstName;
            }
            if (updateUserDto.lastName) {
                updatedUser.lastName = updateUserDto.lastName;
            }
            if (updateUserDto.password) {
                updatedUser.password = updateUserDto.password;
            }
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

    async findOne(id: String) {
        try {
            const result = await this.userModel.findById(id).exec();
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

        await this.findOne(followerId).then((res) => {
            follower = res
        }).catch((err) => {
            console.log(err);
        })

        await this.findOne(toFollow).then((res) => {
            tofollow = res
        }).catch((err) => {
            console.log(err);
        })

        let exists= false;
        console.log(`Follower: ${follower._id}`)

        const x=tofollow.followers.filter(x => x._id.toString() === followerId);
        if(x.length>0){
            exists=true;
        }

        if (exists===false){
            tofollow.followers.push(follower);
            tofollow.save();
            return tofollow;
        }
        else{
            console.log(`You are already follwoing this user`);
        }
    
    }

    async unfollow(followerId: String, toFollow: String){

        let tofollow: User;

        await this.findOne(toFollow).then((res) => {
            tofollow = res
        }).catch((err) => {
            console.log(err);
        })
        
        tofollow.followers.forEach( (item, index) => {
            if(item._id.toString() === followerId) tofollow.followers.splice(index,1);
          });
          tofollow.save();
          return tofollow;  
    }

}