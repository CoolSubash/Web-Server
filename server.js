const express = require('express')
const app = express()
const port = process.env.PORT || 7000
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const authrouter = require('./Route/auth.route.js')
const userrouter = require('./Route/user.route.js')
const errorHandler = require('./utilis/createerror.js')
const profilerouter = require('./Route/profile.route.js')
const postrouter = require('./Route/post.route.js')
const searchrouter = require('./Route/search.route.js')
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database')
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err)
  })
app.use(cookieParser())
app.use(express.json())
app.use('/image', express.static('image'))
app.use('/api/v1/auth', authrouter)
app.use('/api/v1/users', userrouter)
app.use('/api/v1/profile', profilerouter)
app.use('/api/v1/post', postrouter)
app.use('/api/v1/post/search', searchrouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Server started on port 7000')
})
