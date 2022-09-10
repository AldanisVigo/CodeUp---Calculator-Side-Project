import express from 'express'
import url from 'url'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(express.static(__dirname + 'public')); //Serves resources from public folder


app.listen(process.env.PORT,()=>{
    console.log("Listening on port " + process.env.PORT)
})