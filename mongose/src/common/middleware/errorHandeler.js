
export const errorHandler = (err,req,res,next)=>{

    res.status(err.cause || 500).json({
        message :err.message || "un expexted eror"
        
        
    })
    
}