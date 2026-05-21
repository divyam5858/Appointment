import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import jobRouter from './routes/jobRoute.js'

dotenv.config()

// app config
const app = express()
const port = process.env.PORT || 4000

// database + cloud connections
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())

app.use(
  cors({
    origin: [
      'https://appointment-admin-srr9.onrender.com',
      'https://divyam5858.github.io'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.use('/api/jobs', jobRouter)

// root route
app.get('/', (req, res) => {
  res.send('API Working')
})

// database status check
app.get('/test-db', (req, res) => {
  const state = mongoose.connection.readyState

  // 0=disconnected,1=connected,2=connecting,3=disconnecting
  if (state === 1) {
    res.send('Database is connected')
  } else {
    res.status(500).send('Database is NOT connected')
  }
})

// optional doctor route test
app.get('/api-test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend routes working'
  })
})

app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`)
})
