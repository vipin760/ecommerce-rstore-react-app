const express = require('express')
const cors = require('cors')
const app = express()
const errorMiddleare = require('./middelware/error')


app.use(express.json())
app.use(cors());

//routes
const product_route = require('./routes/product.route');
const user_route = require('./routes/user.route');

app.use('/api/product',product_route);
app.use('/api/user',user_route)



//error middleware
app.use(errorMiddleare);

module.exports = app