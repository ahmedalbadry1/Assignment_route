import { fn, col } from "sequelize"

import { Post,User,Comment } from "../../DB/model/index.js"

export let createPost = async(body)=>{
   let {title,content,userId}=body
   let user = await User.findByPk(userId)
  if (!user) return null

   const newPost = new Post({
      title,
      content,
      userId
    });
    await newPost.save()

   return newPost
}

export let deletePost = async(id ,body )=>{
    let post = await Post.findByPk(id)
    let {userId} = body
    if (!post) return "not found"
    if(post.userId != userId)
    {
       return "not owner"
    }
    await post.destroy()
  return "deleted"
}

export let getAllPosts = async () => {
  let posts = await Post.findAll({
    attributes: ["id", "title"],
    include: [
      { model: User, as: "user", attributes: ["id", "name"] },
      { model: Comment, as: "comments", attributes: ["id", "content"] },
    ],
  })
   return posts
}

export let getPostsCommentCount = async () => {
  let posts = await Post.findAll({
    attributes: ["id", "title", [fn("COUNT", col("comments.id")), "commentCount"]],
    include: [{ model: Comment, as: "comments", attributes: [] }],
    group: ["Post.id", "Post.title"],
  })
  return posts
}