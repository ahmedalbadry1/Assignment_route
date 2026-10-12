import {Router} from "express"
import { successResponse } from "../../common/index.js"
import * as com from "./comments.service.js"
export let commentsRouter = Router()

commentsRouter.post("/",async(req,res)=>{
    let comments = await com.createComments(req.body)
    successResponse({res,status:200,message:"comments created"})
}) 

commentsRouter.patch("/:id",async(req,res)=>{
    let comment =await com.updateComment(req.body,req.params.id)
    if(comment == "comment not found" )
    {
       return res.status(404).json({message:"comment not found"})
    }
    if(comment == "you are not allowed to update this comment" )
    {
       return  res.status(403).json({message:"you are not allowed to update this comment"})
    }
    successResponse({res,status:201,message:"comment updated"})
})

commentsRouter.post("/find-or-create", async (req, res) => {
  let { comment, created } = await com.findOrCreate(req.body)
  res.status(created ? 201 : 200).json({ comment, created })
})

commentsRouter.get("/search",async(req, res)=>{
    let { count, comments } = await com.specificWord(req.query.word)
    if (count === 0) {
      return res.status(404).json({ message: "no comments found." });
    }
    res.status(200).json({count,comments})
})

commentsRouter.get("/newest/:postId", async (req, res) =>{
    let comments = await com.newest(req.params.postId)
    return res.status(200).json(comments);
})

commentsRouter.get("/details/:id", async (req, res) => {
  
    let { id } = req.params;
    let comment = await com.getCommentDetails(id);

    if (!comment) {
      return res.status(404).json({ message: "no comment found" });
    }

   
    return res.status(200).json(comment);
  
});