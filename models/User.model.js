import mongoose from "mongoose";

const User = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        }
    ,
    MonthlyIncome:Number,
    Profession:String,

},{timestamps:true})


export default mongoose.model('User',User);