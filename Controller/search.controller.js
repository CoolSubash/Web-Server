const post = require('../Model/post.model.js')

const searchpostlogic = async (req, res, next) => {
  const query = req.query.q
  console.log(query)
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required.' })
  }

  try {
    const posts = await post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ],
    })

    return res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}
module.exports = searchpostlogic
