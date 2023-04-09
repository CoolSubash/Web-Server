// multerMiddleware.js
const multer = require('multer')

// Set up Multer middleware to handle file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'image')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, uniqueSuffix + file.originalname)
    },
  }),
})

module.exports = upload
