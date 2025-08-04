import mongoose from "mongoose";

const Transaction = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    amountPaid:Number,
    date:Date,
    category:{
        type:String,
        enum:['grocery','travel','heathcare','entertainment','shopping','rent/loan','education','other'],
        required:true
    },
},{timestamps:true})



export default mongoose.model("transaction",Transaction);


