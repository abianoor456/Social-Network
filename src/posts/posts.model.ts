import * as mongoose from 'mongoose'
import { User } from 'src/users/users.model'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type PostDocument = Post & Document;


// export const PostScehma= new mongoose.Schema({
//     title: {required: true, type: String},
//     description:{required: true, type: String},
//     user:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
// },
// {
//     timestamps:true
// })

// export interface Post extends mongoose.Document{
//      id: String,
//      title: String,
//      description: String,
//      user: User
// }



@Schema({timestamps: true})
export class Post{
  @Prop({required:true})
  title: String;

  @Prop({required:true})
  description: String;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"})
    user: mongoose.Schema.Types.ObjectId
    
}

export const PostScehma = SchemaFactory.createForClass(Post);