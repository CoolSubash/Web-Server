const router = require('express').Router()
const searchpostlogic = require('../Controller/search.controller.js')

router.get('/', searchpostlogic)

module.exports = router
