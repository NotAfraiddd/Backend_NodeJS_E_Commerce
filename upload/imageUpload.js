const express = require('express')
const multer = require('multer')
const path = require('path')
const port = process.env.PORT || 4000

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage: storage })

const router = express.Router()

router.use('/images', express.static(path.join(__dirname, '../upload/images')))

router.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  })
})

module.exports = router
