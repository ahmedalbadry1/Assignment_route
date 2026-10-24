import { MongoClient } from "mongodb";
import { DB_NAME , DB_URL } from "../config/config.service.js";

 let client =new MongoClient(DB_URL)

 export let db = client.db(DB_NAME)

 export const connection = async () =>{
    try{
        await client.connect()
        console.log("DB connected")
        
    }catch{
        
        console.log("cant connect to db")
        throw error;
    }
 } 
