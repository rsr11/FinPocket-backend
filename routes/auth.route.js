import express from "express";
import { OtpGenrator, OtpSender } from "../utils/otp.utils.js";


const route = express.Router();


route.get("/sendOtp/:gmail",  (req,res)=>{
    
//    console.log("first api : "+ req.params.gmail);

    // OtpGenrator();

   const otp = OtpGenrator();
    
   const gmail = req.params.gmail;
   
   console.log(typeof(gmail));
   
   
     OtpSender(gmail,otp);

    // console.log(otpsended);
    

   res.json({otp: String(otp)});

});


export default route;