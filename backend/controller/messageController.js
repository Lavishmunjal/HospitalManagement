import { catchAsyncError } from "../middlewares/catchAsyncError.js";

import { Message } from "../models/messageSchema.js";

import ErrorHandler from "../middlewares/errorMiddleware.js";


export const sendMessage = catchAsyncError(async(req, res, next)=>{
    const {firstName, lastName, email, phone,message} = req.body;
    if ([firstName, lastName, email, phone, message].some(field => !field)) {
        return next (new ErrorHandler("Please fill full form", 400))
    }
    const user = await Message.create({firstName, lastName, email, phone,message})
    res.status(200).json({
        success:true,
        message:"Message Send Successful"
    })
    // console.log(user);
    

})