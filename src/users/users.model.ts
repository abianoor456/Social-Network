import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;




@Schema({timestamps: true})
export class User {
 
  @Prop({required:true, select:false})
  password: String;

  @Prop({required:true,  unique: true})
  email: String;

  @Prop()
  firstName: String;

  @Prop()
  lastName: String;

  @Prop({ type: mongoose.Schema.Types.ObjectId,
    ref: "Users"})
    following:[mongoose.Schema.Types.ObjectId]
}

export const UserSchema = SchemaFactory.createForClass(User);