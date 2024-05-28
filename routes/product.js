const express = require('express')
const router = express.Router()
const product = require('../controllers/product')
router.post('/add', product.addProduct)

module.exports = router
