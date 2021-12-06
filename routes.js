const router = require('express').Router()
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) { return res.json({ msg: 'fill all fields' }) }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        { expiresIn: '2hr' }
      )

      user.token = token

      return res.json(user)
    }
    return res.json("bad request")

  } catch (error) {
    console.log({ login: error.message })
  }
})

router.post('/register', async (req, res) => {

  try {
    const { first_name, last_name, email, password } = req.body

    // find
    let user = await User.findOne({ email })
    if (user) { return res.json({ user: 'alreay exist' }) }

    // password encrypt
    const ePass = await bcrypt.hash(password, 10)

    // create
    user = User({ first_name, last_name, email: email.toLowerCase(), password: ePass, })

    // create token
    const token = jwt.sign(
      { user_id: user.id, email },
      process.env.TOKEN_KEY,
      { expiresIn: '2h' }
    )

    user.token = token
    user = await user.save()
    return res.json(user)

  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router
