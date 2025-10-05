import app from "./app.js";
import connect_DB from "./db/index.js";
import dotenv from 'dotenv'

dotenv.config({path:'./.env'})

const PORT = process.env.PORT || 5000;
connect_DB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running on port: ${PORT}`)
    })
})
.catch((error)=>{
    console.log(`MONGODB CONNECTION FAILED !!! ${error} `)
    process.exit(1);
})