import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from "src/users/users.model";
import { UserService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private userService: UserService
  ) {}

  async validateUser(username: String, pass: string): Promise<any> {
    console.log(`validate user called ${username}`)
    
      //const user= await this.userModel.find({email: username});
      const user= await this.userService.findOne(username);
      console.log(user[0])

    
    if (user[0] && user[0].password === pass) {
      const { password, ...result } = user[0];
      return result;
    }
     return null;
   }

   async validateuser(email: String){
    const user= await this.userService.findOne(email);
    if(user[0]){
      return true
    }
    else{
      return false
    }

   }

  async login(user: any) {
    console.log(user)
    const payload = { email: user.email, id: user.id };
    console.log(payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
