const jwt = require('jsonwebtoken')

const userauthenticated = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).send('Unauthorized')
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN)
    req.user = payload
    next()
  } catch (error) {
    return res.status(401).send('Unauthorized')
  }
}

const userauthorization = async (req, res, next) => {
  const userid = req.user.userId
  if (req.params.id != userid) {
    return res.status(403).send('forbidden')
  }
  next()
}

module.exports = { userauthenticated, userauthorization }
