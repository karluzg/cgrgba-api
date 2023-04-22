import * as express from "express";
import * as cors from 'cors'
import 'reflect-metadata'
import '../engine-container'
import userIndexRouter from "./routes/shared";
// create and setup express app
const app = express()
app.use(cors())
app.use(express.json())


app.use("", userIndexRouter)


app.listen(3000)