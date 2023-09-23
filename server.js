import express from 'express'
import mongoose from 'mongoose'
import appRouter from './src/routers/app.router.js'
import CONFIG from './src/config/config.js'
import nodemailer from 'nodemailer'
import twilio from 'twilio'
import dotenv from 'dotenv';
import userRouter from './src/routers/users/users.router.js'

const app = express();
const port = 8081

app.use('/api/users', userRouter)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get("/primeraPeticion", (req, res) => {
    res.send(
      cadenaCaracteres(
        `Hola chicos estamos probando una cadena ridiculamente grande    `,
        "1e5"
      )
    );
  });
  
  

dotenv.config(); 
const cadenaCaracteres =(cadena,tiempo)=>{
    let result=''

    while(tiempo>1){
        if(tiempo & 1) result+=cadena
        tiempo>>=1,cadena +=cadena
}
    return result+cadena
}
app.get('/primeraPeticion',(req,res)=>{
    res.send(cadenaCaracteres(`Hola estamos probando una cadena ridiculamente grande`,'5'))
})


const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
const TWILIO_SMS_NUMBER="+13142829460";
const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_TOKEN)

app.get('/sms',async(req,res)=>{
    let result = await client.messages.create({
        body: 'Pruebas Twilio Coders',
        from: TWILIO_SMS_NUMBER,
        to: '+541156022411'
    })
    res.send({status:"success",result:"Message Enviado"})
})

app.use(express.json())
app.use(express.urlencoded({express:true}))


app.use('/api',appRouter)

const transport = nodemailer.createTransport ({
    service:"gmail",
    port:587,
    secure:true,
    auth:{
        user:"sebastianramirezpain@gmail.com",
        pass:process.env.PASS,

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
        const result = await transport.sendMail(mailParams)
        res.send('Mail enviado')
    } catch(error){
        res.send('Mail no enviado , por favor vuelva a intentarlo')
    }
})


//listen
mongoose.connect(CONFIG.MONGO_URL)
.then(()=>{
    console.log("\u001b[1;35m Connect DB")
    const server = app.listen(CONFIG.PORT,()=>{
        console.log("\u001b[1;32m Server Up")
    })
    server.on('error',(error)=>{
        console.error("Error al iniciar el servidor:",error);
        mongoose.connection.close();//cierra la conexión a la base de datos
        throw error
    });
    
})
.catch((error)=>{
    console.error("Error al conectar a la base de datos:",error);
    throw error
});
