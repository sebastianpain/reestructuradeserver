import express from 'express'
import mongoose from 'mongoose'
import appRouter from './src/routers/app.router.js'
import CONFIG from './src/config/config.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({express:true}))

app.use('/api',appRouter)

//listen
mongoose.connect(CONFIG.MONGO_URL)
.then(()=>{
    console.log("Connect DB")
    const server = app.listen(CONFIG.PORT,()=>{
        console.log("Server Up")
    })
    server.on('error',(error)=>{
        console.log("no connect")
        throw error
    });
    
})
.catch((error)=>{
    console.log("no server up")
    throw error
})