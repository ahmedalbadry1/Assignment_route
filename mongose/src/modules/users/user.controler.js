import { Router } from "express";
import * as us from "./user.service.js" 

export let userRouter = Router()


userRouter.post("/signup",async(req,res,next)=>{
    await us.signup(req.body)
    return res.status(201).json({
            message: "User added successfully",
        });
})

userRouter.post("/login",async(req,res,next)=>{
   let user = await us.signin(req.body)

    return res.status(201).json({
            message: `wellcome ${user.name}`,
        });
})

userRouter.patch("/:id", async (req, res, next) => {
    await us.update(req.query.id, req.body);

    return res.status(200).json({
        message: "User updated",
    });
});

userRouter.delete("/", async (req, res, next) =>{
    await us.deleteUser(req.query.id)
     return res.status(200).json({
        message: "User deleted",
    });
})

userRouter.get("/", async (req, res, next) => {
    const user = await us.getUser(req.query.id);

    return res.status(200).json(user);
});