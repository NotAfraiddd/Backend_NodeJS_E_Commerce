const express = require('express')
const router = express.Router()
const product = require('../controllers/product')

router.get('/getAllProducts', product.getAllProducts)
router.post('/add', product.addProduct)
router.delete('/:id/delete', product.removeProduct)

module.exports = router
