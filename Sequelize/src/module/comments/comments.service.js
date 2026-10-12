import { Comment,User,Post } from "../../DB/model/index.js"
import{Op}from "sequelize"

export let createComments= async (body)=>
{
    let { comments } = body; 
    let result = await Comment.bulkCreate(comments); 
    return result;
}

export let updateComment = async (body,id)=>
{
    let comment = await Comment.findByPk(id)
    if (!comment)
        {
            return "comment not found"
        }
        
    let {userId ,content } = body

if (userId !== comment.userId)
  {
    return "you are not allowed to update this comment"
  }

    let updated = await comment.update({content})

    return updated
}

export let findOrCreate = async (body) => {
  let { postId, userId, content } = body
  let [comment, created] = await Comment.findOrCreate({
    where: { postId, userId, content },
  })
  return { comment, created }
}

export let specificWord = async(query)=>{
    let {count , rows:comments} = await Comment.findAndCountAll({
        where:{
            content:{
                [Op.like]:`%${query}%`
            }
        }
    })
    return {count , comments}
}
export let newest = async(postId)=>{
    let comments = await Comment.findAll({
        where :{postId},
        limit:3,
        order:[['createdAt', 'DESC']]
    })

    return comments

}
export let getCommentDetails = async (id) => {
  let comment = await Comment.findByPk(id, {
    include: [
      { model: User , as :"user" }, 
      { model: Post, as:"post" } 
    ]
  });

  return comment;
};