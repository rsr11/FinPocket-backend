import mongoose from "mongoose";

const User = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:20,
        validate: {
            validator: function (value){
                return /[!@#$%^&*(),.?":{}|<>]/.test(value);
            },
            message:"Password must include at least one special character"
        }
    },
    MonthlyIncome:Number,
    Profession:String,

},{timestamps:true})


export default mongoose.model('User',User);