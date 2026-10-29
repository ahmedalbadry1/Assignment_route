import {config} from "dotenv"
import {resolve} from "path"

config({

    path:resolve(`.env.${process.env.NODE_ENV}`)
})

export let port = process.env.port
export let DB_url = process.env.DB_url