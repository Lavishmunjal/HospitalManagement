import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/errorMiddleware.js"
import { User } from "../models/userSchema.js";
// import {comparePassword} from "..models/userSchema.js"
import {generateToken} from "../utils/jwtToken.js"
import cloudinary from "cloudinary"

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
export const getUserDetails = catchAsyncError(async(req, res, next)=>{
    const user = req.user;
    res.status(200)
    .json({
        success:true,
        user, 
    })
})

export const logoutAdmin = catchAsyncError(async(req, res, net)=>{
    res.status(200).cookie("adminToken", "",{
        httpOnly:true,
        expires: new Date(Date.now())
    })
    .json({
        success:true,
        message:"User logged out successfully"
    })
})

export const logoutPatient = catchAsyncError(async(req, res, net)=>{
    res.status(200).cookie("patientToken", "",{
        httpOnly:true,
        expires: new Date(Date.now())
    })
    .json({
        success:true,
        message:"User logged out successfully"
    })
})

export const addNewDoctor = catchAsyncError(async(req, res, next)=>{
    if(!req.files || Object.keys(req.files).length==0) {
        return next (new ErrorHandler("Doctor avatar required", 400))
    }
    const {docAvatar} = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        doctorDepartment,
      } = req.body;
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password ||
        !doctorDepartment ||
        !docAvatar
      ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
      }
      const isRegistered = await User.findOne({ email });
     if (isRegistered) {
        return next(
        new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`, 400)
     );
     }

     const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(
          new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
        );
      }
      const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Doctor",
        doctorDepartment,
        docAvatar: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      })
      res.status(200).json({
        success:true,
        message:"new Doctor registered",
        doctor
      })    
})
