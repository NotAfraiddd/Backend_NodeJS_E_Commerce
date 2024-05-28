const Product = require('../models/Product')

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
      const product = new Product({
        name,
        image,
        category,
        new_price,
        old_price
      })

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
  }
}
