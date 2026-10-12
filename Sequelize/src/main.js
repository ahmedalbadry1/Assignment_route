import express from "express"
import { PORT } from "./config/config.service.js";
import { connection , sequelize} from "./DB/connection.js";
import "./DB/model/index.js";
import { userRouter, postRouter,commentsRouter} from "./module/index.js"
const app = express()


app.use(express.json());

await connection()

app.use("/users" ,userRouter)
app.use("/posts" ,postRouter)
app.use("/comments" ,commentsRouter)




    app.use((err, req, res, next) => {
  let status = err.status || 500        
  let message = err.message

  if (err.name === "SequelizeValidationError") {
    status = 400
    message = err.errors.map((e) => e.message)   
  }

  res.status(status).json({ message })
})


app.listen(PORT ,()=>{
    console.log (`Server is running on port ${PORT}`)
})