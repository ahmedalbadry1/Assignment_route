import express, { json } from "express"
import { PORT } from "./config/config.service.js";
import { connection } from "./DB/connection.js";
import { booksRouter, authorsRouter,logsRouter } from "./module/index.js";
const app = express();

app.use(express.json())

await connection ()
app.use("/collection", booksRouter);
app.use("/collection", authorsRouter);
app.use("/collection", logsRouter);

app.use((err,req,res,next)=>
{
    let status = err.status||500;
    let message = err.message || "unknown err";
    res.status(status).json({message})
})

app.listen(PORT , ()=>
{
    console.log(`connected on port ${PORT}`)
})



