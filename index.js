require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 4000

const productRouter = require('./routes/product')
const authRouter = require('./routes/auth')
const imageUploadRouter = require('./upload/imageUpload')

app.use(express.json())
app.use(cors())

// routes
app.use('/api/auth', authRouter)

// routes
app.use('/api/product', productRouter)

// route upload image
app.use('/api/image', imageUploadRouter)
app.use('/images', express.static('upload/images'))

const link_mongoose = process.env.LINK_MONGOOSE
// Database connect mongoDB
mongoose.connect(link_mongoose)

// connect server
app.listen(port, (error) => {
  if (error) {
    console.log('Server has error', error)
  } else {
    console.log('Server running successly !!!!', port)
  }
})
