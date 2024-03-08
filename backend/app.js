const express = require('express')
const cors = require('cors')
const app = express()
const errorMiddleare = require('./middelware/error')
const cookieParser = require('cookie-parser');


app.use(express.json())
app.use(cors());
app.use(cookieParser())

//routes
const product_route = require('./routes/product.route');
const user_route = require('./routes/user.route');
const order_route = require('./routes/order.route');

app.use('/api/product',product_route);
app.use('/api/user',user_route)
app.use('/api/order',order_route);


//error middleware
app.use(errorMiddleare);

module.exports = app