const router = require('express').Router()
const express = require('express')
const {
  postcreatelogic,
  postdeletelogic,
  postupdatelogic,
  postgetlogic,
} = require('../Controller/post.controller.js')
const checkForErrorsUpload = require('../utilis/uploadingimageerr.js')
const { userauthenticated } = require('../utilis/userauthenticated.js')
const upload = require('../middleware/multer.js')
router.post(
  '/',
  userauthenticated,

  upload.single('postimage'),
  postcreatelogic,
)
router.delete(
  '/:id',
  userauthenticated,

  postdeletelogic,
)
router.put(
  '/:id',
  userauthenticated,
  upload.single('postimage'),
  postupdatelogic,
)

router.get('/', postgetlogic)

module.exports = router
