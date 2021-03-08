require('dotenv').config();

Object
  .keys(process.env)
  .forEach(key => {
    global[key] = process.env[key]
  });

const express = require('express');
const app = express();
const user = require('./routes/user');
const log = (...args) => console.log(...args);


const PORT = process.env.PORT || 3000;

const middleware = (options) => {
  return (req, res, nxt) => {
    nxt()
  }
}

app.use(express.json())
app.use(middleware());
app.use('/users', user);


app.use((err, req, res, nxt) => {
  res.status(500).send({
    message: err.message
  })
})


app.listen(3000, () => {
  log(`Service listening at port: ${PORT}`)
})
