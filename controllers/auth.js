const User = require('../models/User')

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

      const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cart: cartData
      })

      await user.save()
    } catch (error) {}
  }
}
