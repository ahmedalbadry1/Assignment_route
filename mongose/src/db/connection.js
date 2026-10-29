import mongoose from "mongoose"
import { DB_url } from "../config/config.service.js"


export let DBConnection = async()=>{
    try{
        await mongoose.connect(DB_url)
          console.log("db connected")
    }catch(err)
    {
        throw err


    }
}