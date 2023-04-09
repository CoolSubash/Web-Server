const { isBuffer } = require('util')
const Profile = require('../Model/profile.model.js')
const fs = require('fs')
const path = require('path')
const profilelogic = async (req, res, next) => {
  try {
    const { fullName, description, profileimage } = req.body
    const imageUrl = req.file ? req.file.path : undefined
    if (fullName & description && profileimage) {
      return res.status(400).send('Please fill the required fields')
    }

    const profile = new Profile({
      fullName,
      description,
      profileimage: imageUrl,
    })
    const profileuser = await profile.save()
    return res.status(201).send('Successfully created')
  } catch (err) {
    console.log(err)
    next(err)
  }
}

// update profile

const profileupdatelogic = async (req, res, next) => {
  try {
    const { fullName, description } = req.body
    const file = req.file

    if (fullName && description && file) {
      const profilenew = await Profile.findById(req.params.id)

      if (!profilenew) {
        return res.status(400).send("profile doesn't exits")
      }
      const imagename = profilenew.profileimage.split('\\')

      if (req.params.id.toString() !== profilenew._id.toString()) {
        return res.status(403).send('Forbidden')
      }
      const url = path.join(__dirname, '..', 'image', `${imagename[1]}`)
      console.log(url)
      const profileupdatelogic = await Profile.findByIdAndUpdate(
        req.params.id,
        {
          description,
          fullName,
          profileimage: file ? file.path : undefined,
        },
        { new: true },
      )
      //   deleting image from floder

      try {
        await fs.promises.unlink(url)
      } catch (err) {
        console.error(err)
      }
      await profileupdatelogic.save()
      return res.status(200).send('successfully updated')
    } else {
      return res.status(400).send('Please fill the required field')
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const profiledeletelogic = async (req, res, next) => {
  try {
    const user = await Profile.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (user._id.toString() !== req.params.id.toString()) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const imagename = user.profileimage.split('\\')
    const url = path.join(__dirname, '..', 'image', `${imagename[1]}`)
    try {
      await fs.promises.unlink(url)
    } catch (err) {
      console.error(err)
    }
    const profiledelete = await Profile.findByIdAndDelete(req.params.id)

    // Return a success response indicating that the user profile has been deleted
    return res.json({ message: 'User profile deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = { profilelogic, profiledeletelogic, profileupdatelogic }
