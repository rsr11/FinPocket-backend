

import Transaction from '../models/transaction.model.js';

export const transferMoney = async (req,res)=>{
    try {
        // Logic for transferring money between accounts
        const userId = req.user;

        // Get data from request body
        const { amountPaid, date, category } = req.body;

        // Validate required fields
        if (!amountPaid || !category) {
            return res.status(400).json({ msg: "Amount paid and category are required" });
        }

        // Create new transaction
        const transaction = new Transaction({
            user: userId._id, // Assuming req.user contains the user ID
            amountPaid,
            date: date ? new Date(date) : new Date(), // Use provided date or current date
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


