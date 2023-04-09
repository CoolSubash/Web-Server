const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  profileimage: {
    type: String,
  },
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile
