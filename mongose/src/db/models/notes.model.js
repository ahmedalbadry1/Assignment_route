import mongoose from "mongoose";

let noteSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
        validate:{
            validator: function(value){
                return value !== value.toUpperCase()


            },
            message:"title cannont be all upper case"

        }
    },
    content: {
        type: String,
        required: true
        
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
     
},
{
    timestamps: true,
    optimisticConcurrency: true,
})

export let noteModel = mongoose.model("Note",noteSchema)