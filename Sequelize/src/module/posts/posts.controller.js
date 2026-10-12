import {Router} from "express"
import { successResponse } from "../../common/index.js"
import * as p from "./posts.service.js"
export let postRouter = Router()

postRouter.post("/",async(req,res)=>
{
    let post = await p.createPost(req.body)
    if(!post)
    {
       return res.status(404).json({message:"no user found"})
    }
    successResponse({res ,status:201, message:"post is created succesfully"})
})

postRouter.delete("/:postId",async(req,res)=>
{
    let result = await p.deletePost(req.params.postId, req.body)
     if (result === "not found") {
    return res.status(404).json({ message: "Post not found." })
  }
  if (result === "not owner") {
    return res.status(403).json({ message: "You are not authorized to delete this post." })
  }

  res.status(200).json({ message: "Post deleted." })
})

postRouter.get("/details", async(req,res)=>{
  let posts =await p.getAllPosts()
  res.status(200).json(posts)
})

postRouter.get("/comment-count",async(req,res)=>{
  let posts = await p.getPostsCommentCount()
  res.status(200).json(posts)

})