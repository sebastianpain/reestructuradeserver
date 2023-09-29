import express from 'express';
import compression from 'express-compression';
import mongoose from 'mongoose';
import appRouter from './src/routers/app.router.js';
import CONFIG from './src/config/config.js';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';
//import { addLogger } from './src/utils/logger.js';
import userRouter from './src/routers/users/users.router.js';
import sessionsRouter from './src/routers/orders/sessions.router.js';
import cluster from 'cluster';
import { cpus } from "os"; 
const app = express();
const port = 8081;

app.get('/operacionSencilla',(req,res)=>{
    let sum=0;
    for(let i=0; i<100000; i++){
        sum+=i;
    }
    res.send({message:`Estamos probando un worker ${process.pid} el resultado de la suma ${sum}`})
})
app.get('/operacionCompleja',(req,res)=>{
    let sum=0;
    for(let i=0; i<5e8; i++){
        sum+=i;
    }
    res.send({message:`Estamos probando un worker ${process.pid} el resultado de la suma ${sum}`})
})





app.use('/api/users', userRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use('/api/sessions',sessionsRouter);

//Este endpoint sirve para poder crear el usuario virtual con variables para utilizar en el resto de endpoints
app.get('/api/test/user',(req,res)=>{
    let first_name = faker.name.firstName();
    let last_name = faker.name.lastName();
    let email = faker.internet.email();
    let password =  faker.internet.password();
    res.send({first_name,last_name,email,password})
})

app.get("/primeraPeticion", (req, res) => {
    res.send(
      cadenaCaracteres(
        `Hola chicos estamos probando una cadena ridiculamente grande    `,
        "1e5"
      )
    );
  });
  //app.use(addLogger)
  app.get("/", (req, res) => {
      res.send({mensage:`estamos probando un worker ${process.pid}`});
    });
  app.get("/peticion", (req, res) => {

      res.send({mensage:"estamos probando un winston con logger"});
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
app.get('/peticion2',(req,res)=>{
    req.logger.warning("esto es una alerta")
    res.send("Estamos probando un logger avanzado con file")
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
// cluster
//console.log(cluster.isPrimary)

const numeroDeNucleos = cpus().length;
//console.log(numeroDeNucleos)
if(cluster.isPrimary){
    
    console.log("soy un proceso primario")
    for(let i=1; i<=numeroDeNucleos; i++){
        console.log(i)
        cluster.fork();
        
    }
    //cluster.on('');
}else{
    
    console.log(`Es un proceso hijo osea un worker`)
    console.log(`Soy un numero de identificación es: ${process.pid}`)
   /* cluster.on('message',worker=>{
        console.log(`Mensaje recibido ${worker.process.pid}`)
    })
    */
}
