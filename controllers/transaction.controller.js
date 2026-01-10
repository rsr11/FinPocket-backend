import { transactionTypes } from '../constant/category.constant.js';
import Transaction from '../models/transaction.model.js';



export const transferMoney = async (req,res)=>{
    try {
        // Logic for transferring money between accounts
        const userId = req.user;

        // Get data from request body
        const { amountPaid, category } = req.body;

        // Validate required fields
        if (!amountPaid || !category) {
            return res.status(400).json({ msg: "Amount paid and category are required" });
        }

        // Create new transaction
        const transaction = new Transaction({
            user: userId._id, // Assuming req.user contains the user ID
            amountPaid,
            date:new Date(), // Use provided date or current date
            category
        });

        // Save the transaction
        await transaction.save();

        res.status(201).json({ msg: "Transaction created successfully", transaction });
    
    }catch(error){
        console.error(error);
        res.status(500).json({msg:"Server Error"});
    }
};




export const categoryListing = async (req,res)=>{
    try {
        // Logic for transferring money between accounts
        res.status(200).json({msg:"category list fetched successfully",data:transactionTypes});

    }catch(error){
        console.error(error);
        res.status(500).json({msg:"Server Error"});
    }
}


export const transactionSummary = async (req,res)=>{
    try {
        // Logic for transferring money between accounts
        const userId = req.user;    
        const summary = await Transaction.aggregate([
            { $match: { user: userId._id } },
            { $group: { _id: "$category", totalAmount: { $sum: "$amountPaid" } }},
            { $project:{ category:"$_id", totalAmount:1, _id:0}}
       ]);

        res.status(200).json({msg:"transaction summary fetched successfully",data:summary});

    }catch(error){
        console.error(error);
        res.status(500).json({msg:"Server Error"});
    }
};

