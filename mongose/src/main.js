import express from 'express'
import { port } from './config/config.service.js'
import { errorHandler } from './common/index.js'
import {DBConnection} from './db/connection.js'
import { userRouter , noteRouter } from './modules/index.js'
const app = express()
await DBConnection()

app.use(express.json())

app.use("/users", userRouter)
app.use("/notes", noteRouter);

app.use(errorHandler)

app.listen(port, () => console.log(`app listening on port ${port}!`))