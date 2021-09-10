import * as mongoose from 'mongoose'
import { User } from 'src/users/users.model'

export const PostScehma= new mongoose.Schema({
    title: {required: true, type: String},
    description:{required: true, type: String},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
},
{
    timestamps:true
})

export interface Post extends mongoose.Document{
     id: String,
     title: String,
     description: String,
     user: User
}