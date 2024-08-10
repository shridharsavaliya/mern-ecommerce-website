const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const router = require('./routes')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const app = express()

app.use(cors({
   origin: "https://mern-ecommerce-website-frontend.vercel.app",
   credentials: true,
   methods: ['POST', 'GET', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
}))

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log("server is running")
})
app.use(express.json({ limit: '10mb' }))

app.use(cookieParser())

connectDB();

app.use("/v1",router)

app.use(()=>{
    throw new Error('Something went wrong')
})
