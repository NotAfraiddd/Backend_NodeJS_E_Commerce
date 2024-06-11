const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')

router.post('/signup', auth.signup)
router.post('/refresh-token', authController.refreshToken)

module.exports = router
