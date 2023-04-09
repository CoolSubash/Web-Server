const post = require('../Model/post.model.js')
const path = require('path')
const fs = require('fs')
const moment = require('moment')
// delete Image if post is unsuccesful to update
const deleteFile = async (filePath) => {
  try {
    await fs.promises.unlink(filePath)
  } catch (err) {
    next(err)
  }
}
const postcreatelogic = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.author ||
    !req.file
  ) {
    if (req.file) {
      const url = req.file.destination + '/' + req.file.filename
      await deleteFile(url)
    }

    return res
      .status(400)
      .send('Please fill all required fields and upload an image')
  }
  const file = req.file

  const imagePath = file.destination + '/' + file.filename

  // Create a new image document and save it to MongoDB
  const newPost = new post({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    postimage: imagePath,
  })
  await newPost.save()

  res
    .status(201)
    .send({ status: 'ok', messagee: 'Successfully uploaded ', newPost })
}

// update logic
const postupdatelogic = async (req, res, next) => {
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.author ||
      !req.file
    ) {
      if (req.file) {
        const url = req.file.destination + '/' + req.file.filename
        await deleteFile(url)
      }

      return res
        .status(400)
        .send('Please fill all required fields and upload an image')
    }

    const postnew = await post.findById(req.params.id)

    if (!postnew) {
      if (req.file) {
        const url = req.file.destination + '/' + req.file.filename
        await deleteFile(url)
      }
      return res.status(400).send("post doesn't exits")
    }

    if (req.params.id.toString() !== postnew._id.toString()) {
      if (req.file) {
        const url = req.file.destination + '/' + req.file.filename
        await deleteFile(url)
      }
      return res.status(403).send('Forbidden')
    }

    const imagePath = req.file.destination + '/' + req.file.filename
    const url = postnew.postimage

    const postUpdatelogic = await post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        postimage: imagePath,
        author: req.body.author,
      },
      { new: true },
    )
    //   deleting image from folder

    await deleteFile(url)

    await postUpdatelogic.save()
    return res.status(200).send('successfully updated')
  } catch (err) {
    console.log(err)
    next(err)
  }
}

// delete Post logic
const postdeletelogic = async (req, res, next) => {
  try {
    const postcheck = await post.findById(req.params.id)

    if (!postcheck) {
      return res.status(404).json({ error: 'post not found' })
    }

    if (postcheck._id.toString() !== req.params.id.toString()) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const url = postcheck.postimage
    await deleteFile(url)
    const postdelete = await post.findByIdAndDelete(req.params.id)

    // Return a success response indicating that the user profile has been deleted
    return res.json({ message: 'post deleted' })
  } catch (error) {
    next(error)
  }
}

// get post logic by author,filter

const postgetlogic = async (req, res, next) => {
  try {
    const { author, sortBy } = req.query
    let sortCriteria = { createdAt: -1 }
    let sortname = {}
    if (author) {
      sortname.author = author
    }

    if (sortBy === 'latest') {
      sortCriteria = { createdAt: -1 }
    } else if (sortBy === 'oldest') {
      sortCriteria = { createdAt: 1 }
    } else if (sortBy === 'lastweek') {
      const lastWeek = moment().subtract(1, 'week').toDate()
      console.log(lastWeek)
      sortname.createdAt = { $gte: lastWeek }
    } else if (sortBy === 'lastmonth') {
      const lastMonth = moment().subtract(1, 'month').toDate()
      sortname.createdAt = { $gte: lastMonth }
    }

    // post by date
    const posts = await post.find(sortname).sort(sortCriteria)
    return res.status(200).send(posts)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  postcreatelogic,
  postdeletelogic,
  postupdatelogic,
  postgetlogic,
}
