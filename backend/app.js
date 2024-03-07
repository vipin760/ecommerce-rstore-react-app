const express = require('express')
const cors = require('cors')
const app = express()
const errorMiddleare = require('./middelware/error')


app.use(express.json())
app.use(cors());

//routes
const product = require('./routes/product.route');

app.use('/api/user',product);

//error middleware
app.use(errorMiddleare);

module.exports = app