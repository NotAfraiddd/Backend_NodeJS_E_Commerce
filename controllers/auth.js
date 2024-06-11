const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
  signup: async (req, res) => {
    try {
      let check = await User.findOne({ email: req.body.email })
      if (check) {
        return res.status(400).json({ success: false, error: 'exist user found with same email address' })
      }
      let cartData = {}
      for (let i = 0; i < 300; i++) {
        cartData[i] = 0
      }

      // Create new user
      const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cart: {}
      })

      await user.save()

      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, 'secret_ecom', { expiresIn: '1h' })

      res.json({ success: true, token })
    } catch (error) {
      console.error('Signup error:', error)
      res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
  }
}
