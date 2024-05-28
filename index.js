require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const port = process.env.PORT || 4000

const productRouter = require('./routes/product')

app.use(express.json())
app.use(cors())

// routes
app.use('/api/product', productRouter)

const link_mongoose = process.env.LINK_MONGOOSE
// Database connect mongoDB
mongoose.connect(link_mongoose)

// API
app.get('/', (req, res) => {
  res.send('App is running')
})

// image storage
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, res, cb) => {
    return cb(null, `${res.fieldname}_${Date.now()}${path.extname(res.originalname)}`)
  }
})

const upload = multer({ storage: storage })

app.use('/images', express.static('upload/images'))
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  })
})

// connect server
app.listen(port, (error) => {
  if (error) {
    console.log('Server has error', error)
  } else {
    console.log('Server running successly !!!!', port)
  }
})
