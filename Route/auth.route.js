const router = require('express').Router()
const {
  registerlogic,
  loginlogic,
  logoutlogic,
} = require('../Controller/auth.controller.js')
const validateuser = require('../utilis/validation.js')
router.post('/register', validateuser, registerlogic)
router.post('/login', validateuser, loginlogic)
router.get('/logout', logoutlogic)

module.exports = router
