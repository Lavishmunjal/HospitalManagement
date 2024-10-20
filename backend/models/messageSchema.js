import mongoose, { Schema } from "mongoose";
import validator from "validator";

const messageSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3, "FN is required"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3, "LN is required"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail, "Please provide a valid email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[11,"must contains 11 digits"],
        maxLength:[20]
        
    } ,
    message:{
        type:String,
        required:true,
        minLength:[10, "Messgae is required"]
    }
},{
    timestamps:true
});

export const Message  =mongoose.model("Message", messageSchema)