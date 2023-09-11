import express from 'express'
import mongoose from 'mongoose'
import appRouter from './src/routers/app.router.js'
import CONFIG from './src/config/config.js'
import nodemailer from 'nodemailer'

const app = express();

app.use(express.json())
app.use(express.urlencoded({express:true}))


app.use('/api',appRouter)

const transpor = nodemailer.createTransport ({
    service:"gmail",
    port:587,
    secure:true,
    auth:{
        user:"sebastianramirezpain@gmail.com",
        pass:"btmlnlaxubovaqdi",

    },
    tls: {
        rejectUnauthorized: false
      }
}) 
app.get('/mail',async(req,res)=>{
    try{
        const mailParams={
            from:"sebastianramirezpain@gmail.com",
            to:"sebastianramirezpain@gmail.com",
            subject: "Test inicial de envio de mail con un perrito ",
            html: `<div>
            Esto es un mail de prueba con un adjunto !!
            </div>`,
            attachments:[{
                filename:"perrito.jpg",
                path: process.cwd()+'/src/public/perrito.jpg',
                cid:'perrito'
            }]
        }
        const result = await transpor.sendMail(mailParams)
        res.send('Mail enviado')
    } catch(error){
        console.log(error)
    }
})


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