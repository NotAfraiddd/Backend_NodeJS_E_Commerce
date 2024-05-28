const Product = require('../models/Product')
const mongoose = require('mongoose')

module.exports = {
  addProduct: async (req, res) => {
    try {
      const { name, image, category, new_price, old_price } = req.body

      // Validate required fields
      if (!name || !image || !category || !new_price || !old_price) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        })
      }

      // Create a new product instance
      const product = new Product(req.body)

      // Save the product to the database
      const savedProduct = await product.save()

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product: savedProduct
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create product',
        error: error.message
      })
    }
  },
  removeProduct: async (req, res) => {
    try {
      const productId = req.params.id
      const deletedProduct = await Product.delete({ id: productId })
      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        })
      }
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        deletedProduct
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete product',
        error: error.message
      })
    }
  }
}
