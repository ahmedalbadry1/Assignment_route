import { Router } from "express";
import * as author from "./authors.service.js";

export const authorsRouter = Router();

authorsRouter.post("/authors", async (req, res) => {
    const result = await author.createAuthor(req.body);
    res.status(201).json(result);
});