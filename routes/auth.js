const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')

router.post('/signup', auth.signup)
router.post('/login', auth.login)
router.post('/refresh-token', auth.refreshToken)

module.exports = router
