// middleware/validateUser.js

const validator = require('validator')

const validateUser = async (req, res, next) => {
  if (req.path === '/login') {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' })
    }
    next()
  } else if (req.path === '/register') {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all ok fields' })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' })
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: 'Password is not strong enough' })
    }
    next()
  } else {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all ok fields' })
    }
    if (email && !validator.isEmail(email)) {
      return res.status(400).send('Invalid email address')
    }
    if (password && !validator.isStrongPassword(password)) {
      return res.status(400).send('Password is not strong enough')
    }
    next()
  }
}

module.exports = validateUser
