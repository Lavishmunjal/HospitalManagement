import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URL, {
        dbName:"Hospital"

    }).then(()=>{
        console.log("connected to db");
        
    }).catch(err=>{
        console.log(`Some error occur while connection to db : ${err}`);
    })
}