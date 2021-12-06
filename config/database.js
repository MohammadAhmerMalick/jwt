const mongoose = require('mongoose')
require('dotenv').config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_CODE)
    console.log('DB connected')
  } catch (error) {
    console.log({ DB_error: error.message })
  }
}

module.exports = connect