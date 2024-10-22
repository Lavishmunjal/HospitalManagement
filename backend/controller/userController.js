import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/errorMiddleware.js"
import { User } from "../models/userSchema.js";
// import {comparePassword} from "..models/userSchema.js"
import {generateToken} from "../utils/jwtToken.js"

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
generateToken(user, "User registered", 200, res)


})
export const login = catchAsyncError(async(req, res, next)=>{
    const {email, password, confirmPassword, role} =req.body;
    if(!email || !password || !confirmPassword || !role) {
         return next (new ErrorHandler("pleaseprovide all details", 400))
    }
    if(password!==confirmPassword) {
        return next (new ErrorHandler("Password and confirmpassword do not match", 400))
    }
    const user = await User.findOne({email}).select("+password")

    if(!user) {
        return next (new ErrorHandler("Invalid pw or email", 400))
    }

    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched) {
        return next (new ErrorHandler("Invalid pw or email", 400))
    }

    if(role!=user.role) {
        return next (new ErrorHandler("user with this role not found", 400))

    }
    generateToken(user, "User login successfully", 200, res)

})

export const addNewAdmin = catchAsyncError(async(req, res, next) =>{
    const {firstName, lastName, email, phone, password, gender, dob, nic} = req.body;

    if ([firstName, lastName, email, gender, phone, password, dob, nic].some(field => !field)) {
        return next(new ErrorHandler("Please fill full form", 400))

    }
    const isRegistered = await User.findOne({email})
    if(isRegistered) {
        return next (new ErrorHandler("Admin with email already exists", 400));
    }
    const admin = await User.create({firstName, lastName, email, phone, password, gender, dob, nic, role:"Admin"});
    res.status(200)
    .json({
        success:true,
        message:"New Admin resgistered!!"
    })
})

export const getAllDoctors = catchAsyncError(async(req, res, next)=>{
    const doctors = await User.find({role:"Doctor"})
    res.status(200)
    .json({
        success:true,
        doctors
    })
})
