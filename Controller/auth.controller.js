const User = require('../Model/auth.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerlogic = async (req, res, next) => {
  const { username, email, password } = req.body

  try {
    // Check if user already exists

    const usernameExists = await User.findOne({ username })
    if (usernameExists) {
      return res
        .status(409)
        .json({ message: 'User with this  username already exists' })
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res
        .status(409)
        .json({ message: 'User with this email already exists' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user object
    const user = new User({
      ...req.body,
      password: hashedPassword,
    })

    // Save the user to the database
    await user.save()

    return res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    next(err)
  }
}

// loginlogic
const loginlogic = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).send('Invalid username or password')
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).send('Invalid username or password')
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN)

    res.cookie('token', token, { httpOnly: true })
    return res.send('Logged in')
  } catch (err) {
    next(err)
  }
}

const logoutlogic = (req, res) => {
  res.clearCookie('token')
  return res.send('Log Out Successfully')
}

module.exports = { registerlogic, loginlogic, logoutlogic }
