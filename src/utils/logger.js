import winston from 'winston';
//1
/*const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:"http"}),
        new winston.transports.File({ filename:'Alertas.log', level: 'warn'})
    ]
})
*/
//2 customize config
const levelOptions={
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        debug:4,

    },
    colors:
    {fatal:'red',error:'green',warning:'yellow',info:'blue',debug:'magenta'}
        
    }

const logger = winston.createLogger({
    levels : levelOptions.levels,
    transports:[
     new winston.transports.Console({
        level:"info",
        format: winston.format.combine(
        winston.format.colorize({colors : levelOptions.colors}),
        winston.format.simple()
        ) 
    }),
    new winston.transports.File({
        filename:'AlertasDoc.log',
        level:'warning',
        format: winston.format.simple()
    })
]
})
export const addLogger=(req,res,next)=>{
    req.logger=logger;
   // req.logger.http(` ${req.method} en ${req.url } - ${new Date().toLocaleTimeString()}`),
    req.logger.warning(`Soy warning ${req.method} en ${req.url } - ${new Date().toLocaleTimeString()}`);
    try {
        req.logger.debug("Debug Test Log");
        req.logger.info("Info Test Log");
        req.logger.error("Error Test Log");
        req.logger.fatal("Fatal Error Test Log");
      } catch (error) {
        req.logger.error(error);
      }
    next();
}
