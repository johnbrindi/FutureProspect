import express from 'express';
import cors from 'cors'
import route from './routes/userRoutes.js';
// import studroute from './routes/studentRoutes.js';
// import comRoute from './routes/companyRoutes.js';
const app = express()
    const PORT = 5000
    
    app.use(express.json())
    app.use(cors())


app.use('/userRoutes', route)
// app.use('/studentRoutes', studroute)
// app.use('/companyRoutes', comRoute)

app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
})
