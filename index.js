require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const { type } = require('os')
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

const Product = mongoose.model('Product', {
  id: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  new_price: {
    type: Number,
    require: true
  },
  old_price: {
    type: Number,
    require: true
  },
  date: {
    type: Date,
    require: Date.now()
  },
  available: {
    type: Boolean,
    require: true
  }
})

app.post('/add-product', async (req, res) => {
  const product = new Product({
    id: req.body.id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price
  })
  console.log(product)
  await product.save()
  console.log('save', product)
  res.json({
    success: true,
    name: req.body.name
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
