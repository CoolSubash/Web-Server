const router = require('express').Router()

const {
  profilelogic,
  profiledeletelogic,
  profileupdatelogic,
} = require('../Controller/profile.controller.js')

const upload = require('../middleware/multer.js')
router.post('/', upload.single('profileimage'), profilelogic)
router.put('/:id', upload.single('profileimage'), profileupdatelogic)
router.delete('/:id', upload.single('profileimage'), profiledeletelogic)

module.exports = router
