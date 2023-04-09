const User = require('../Model/auth.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const validateuser = require('../utilis/validation.js')
const {
  userauthorization,
  userauthenticated,
} = require('../utilis/userauthenticated.js')
const router = require('express').Router()
const {
  deleteuserlogic,
  userupdatelogic,
} = require('../Controller/user.controller.js')
router.put(
  '/:id',
  userauthenticated,
  userauthorization,
  validateuser,
  userupdatelogic,
)
router.delete('/:id', userauthenticated, userauthorization, deleteuserlogic)
module.exports = router
