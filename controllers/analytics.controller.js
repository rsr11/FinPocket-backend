import { json } from "express";
import transactionModel from "../models/transaction.model.js";
import mongoose from "mongoose";



export const transactionSummary = async (req,res)=>{
    try {
        // Logic for transferring money between accounts
        const userId = req.user;  
        // const userName = await UserModel.findById(userId._id).select("name");

        const summary = await transactionModel.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId._id) } },
            { $group: { _id: "$category", totalAmount: { $sum: "$amountPaid" } }},
            { $project:{ totalAmount:1,category:"$_id", _id:0}}
       ]);

        res.status(200).json({msg:"transaction summary fetched successfully",data:summary});

    }catch(error){
        console.error(error);
        res.status(500).json({msg:"Server Error"});
    }
};




export const Last10DayData = async (req, res) => {
    const userId = req.user;
    try {
        
        const TenDaysData = await transactionModel.aggregate(
            [ {$match:{ user: new mongoose.Types.ObjectId(userId._id), createdAt: { $gte: new Date( Date.now()-10*24*60*60*1000 )  } }},
              {$group:{_id: {$dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, totalAmount: { $sum: "$amountPaid" } } },
              {  $sort:{_id:1 }},
              {$project:{ date:"$_id", totalAmount:1, _id:0 }}
            ]);

        res.status(200).json({msg:"last 10 day data fetched successfully", data: TenDaysData });

    } catch (error) {
        res.status(500).json({msg:"Server Error",error: error.message});
    }

}