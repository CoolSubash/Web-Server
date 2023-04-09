const { nextTick } = require('process')
const User = require('../Model/auth.model.js')
const bcrypt = require('bcrypt')

const userupdatelogic = async (req, res, next) => {
  const { id } = req.params
  const { email, password, username } = req.body
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).send('User not found')
    }
    if (email) {
      user.email = email
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword
    }
    if (username) {
      user.username = username
    }
    await user.save()
    return res.send(user)
  } catch (err) {
    next(err)
  }
}

const deleteuserlogic = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).send('User not found')
    }

    return res.send('Deleted Successfully')
  } catch (err) {
    next(err)
  }
}

module.exports = { userupdatelogic, deleteuserlogic }
