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
        cart: cartData,
        role: req.body.role
      })

      await user.save()

      const data = {
        user: {
          id: user.id
        }
      }
      const accesstoken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' })
      const refreshToken = jwt.sign({ email: req.body.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' })

      res.json({ success: true, accesstoken, refreshToken })
    } catch (error) {
      console.error('Signup error:', error)
      res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
  },
  login: async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        const isPassCompare = req.body.password === user.password
        if (isPassCompare) {
          const data = {
            user: {
              id: user.id
            }
          }
          const accesstoken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' })
          const refreshToken = jwt.sign({ email: req.body.email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1h'
          })
          res.json({ success: true, accesstoken, refreshToken })
        } else {
          res.json({ success: false, error: 'Wrong password' })
        }
      } else {
        res.json({ success: false, error: 'Wrong email' })
      }
    } catch (error) {}
  },
  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) {
        return res.status(401).json({ success: false, error: 'Refresh token is required' })
      }

      const user = await User.findOne({ refreshToken })
      if (!user) {
        return res.status(403).json({ success: false, error: 'Invalid refresh token' })
      }

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ success: false, error: 'Invalid refresh token' })
        }

        const accessToken = jwt.sign({ user: { id: user.id } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        res.json({ success: true, accessToken })
      })
    } catch (error) {
      console.error('Refresh token error:', error)
      res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
  }
}
