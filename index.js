const express = require('express')
const app = express()
const PORT = 8000
const connect = require('./config/database')
const auth = require("./middleware/auth");

connect()

app.listen(PORT, () => console.log(PORT))
app.use(express.json())


app.post("/welcome", auth, (req, res) => {
  res.send("Welcome 🙌 ");
});


app.use('/', require('./routes'))