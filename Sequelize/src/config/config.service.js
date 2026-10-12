import {resolve} from "path"
import {config} from "dotenv"

let envPath = resolve("./.env.development") 

config ({
    path:envPath
})

export const PORT = process.env.PORT || 3000;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_HOST = process.env.DB_HOST;
export const DB_DIALECT = process.env.DB_DIALECT;
