const express = require('express')
const router = express.Router()
const product = require('../controllers/product')
const authenticateToken = require('../middleware/auth')

router.use(authenticateToken)
router.get('/getAllProducts', product.getAllProducts)
router.post('/add', product.addProduct)
router.post('/:id/update', product.udpateProduct)
router.delete('/:id/delete', product.removeProduct)

module.exports = router
