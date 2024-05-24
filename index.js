require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

const link_mongoose = process.env.LINK_MONGOOSE
// Database connect mongoDB
mongoose.connect(link_mongoose)

// API
app.get('/', (req, res) => {
  res.send('App is running')
})

// image storage
const storage = multer.diskStorage({
  destination: './upload',
  filename: (req, res, cb) => {
    return cb(null, `${res.fieldname}_${Date.now()}${path.extname(res.originalname)}`)
  }
})

const upload = multer({ storage: storage })

// connect server
app.listen(port, (error) => {
  if (error) {
    console.log('Server has error', error)
  } else {
    console.log('Server running successly !!!!', port)
  }
})
