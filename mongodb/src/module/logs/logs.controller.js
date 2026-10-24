import { Router } from "express";
import * as logs from "./logs.service.js";

export const logsRouter = Router();

logsRouter.post("/logs/capped", async (req, res) => {
    const result = await logs.createLogs();
    res.status(201).json(result);
});

logsRouter.post("/logs",async(req,res)=>
{
    let log = await logs.insertLog(req.body);

    res.status(201).json({
        message:"log inserted succesfulls",
        data:log
    })
})

logsRouter.get("/books/aggregate4", async (req, res) => {
    const result = await logs.getLogsWithBooks();

    return res.status(200).json({
        data: result
    });
});