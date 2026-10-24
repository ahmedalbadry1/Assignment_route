import {resolve} from "path"
import { config } from "dotenv"

const envPath = resolve("./.env.dev")

config({
    path:envPath 
})

export const PORT= process.env.PORT ;
export const DB_URL=process.env.DB_URL;
export const DB_NAME=process.env.DB_NAME;
