import {Router} from "express"
import * as us from "./user.service.js"
import { successResponse } from "../../common/index.js"
export let userRouter = Router()

userRouter.post("/signup" ,async(req,res)=>
{
    let user = await us.createUser(req.body)
    
    successResponse({ res, status: 201, message: "User created", data: user })

} )

userRouter.put("/:id", async (req, res) => {
  await us.createOrUpdateUser(req.params.id, req.body)
  successResponse({ res, message: "User created or updated successfully" })
})

userRouter.get("/by-email", async(req,res)=>
{
  let user = await us.FindUserByEmail(req.query.email)
  if (!user) {
    return res.status(404).json({ message: "no user found" })
  }
   res.status(200).json({ user })
})

userRouter.get("/:id", async(req,res)=>
{
  let user = await us.FindUserById(req.params.id)
  if (!user) {
    return res.status(404).json({ message: "no user found" })
  }
   res.status(200).json({ user })
})

