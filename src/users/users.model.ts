import * as mongoose from 'mongoose'

export const UserSchema= new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {required: true, type: String, unique: true},
    password:{required: true, type: String},
    following:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]
},
{
    timestamps: true
})

export interface User extends mongoose.Document{
     id: String,
     firstName: String,
     lastName: String,
     email: String,
     password: String,
     following: User[]
}