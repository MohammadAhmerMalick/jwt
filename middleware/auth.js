const jwt = require('jsonwebtoken')
require('dotenv').config()

const verification = (req, res, next) => {

  const token = req.body.token || req.headers['x-access-token']
  if (!token) { return res.json({ msg: 'token missing' }) }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
    req.user = decoded

    return next();
  } catch (error) { console.log({ ver: error.message }) }
}

module.exports = verification