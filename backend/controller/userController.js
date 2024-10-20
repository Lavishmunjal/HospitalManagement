import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import ErrorHandler, { errorMiddleware } from "../middlewares/errorMiddleware.js"
import { User } from "../models/userSchema.js";

export const patientregister = catchAsyncError(async(req, res, next)=>{
const {firstName, lastName, email, gender, phone, password, dob, nic, role}=req.body;
if ([firstName, lastName, email, gender, phone, password, dob, nic, role].some(field => !field)) {
    return next(new ErrorHandler("Please fill full form", 400))
}
let user = await User.findOne({email});
if(user) {
    return next(new ErrorHandler("User Already register", 400))

}
user  = await User.create({firstName, lastName, email, gender, phone, password, dob, nic, role})
res.status(200)
.json({
    success:true,
    message:"User registered"
})

})
export const login = catchAsyncError(async(req, res, next)=>{
    const {email, password, confirmPassword, role} =req.body;
    if(email || !password || !confirmPassword || !role) {
         return next (new ErrorHandler("pleaseprovide all details", 400))
    }
    if(password!==confirmPassword) {
        return next (new ErrorHandler("Password and confirmpassword do not match", 400))
    }

})
