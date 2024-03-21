authentication
npm i jsonwebtoken validator nodemailer cookie-parser body-parser

## product data json format
{
"name":"samsung5",
"price":18000,
"description":"good product",
"category":"Tablet",
"images":{ 
    "public_id":"sample image",
    "url":"sample 1.jpeg"
}
}

## user data
{
    "name":"vipin",
    "email":"vipinm5003@gmail.com",
    "password":"123456789"
}

11a7ad306a03fbb4ca1cf8380a533a0c11f881d16f527f51caa9b5ce646d542b

shippingInfo,paymentInfo,itemsPrice, 
{
    "itemsPrice":200,
    "taxPrice":36,
    "shippingPrice":100,
    "totalPrice":336,
    "orderItem":[
       {
         "product":"65eacf072582b257f79798d7",
        "name":"samsung",
        "price":18000,
        "image":"sample 1.jpeg",
        "quantity":1
       }
    ],
    "shippingInfo":{
        "address":"mappala house",
        "city":"malappuram",
        "state":"kerala",
        "country":"india",
        "pincode":679577,
        "phone":8139886630,
    },
    "paymentInfo":{
        "id":"sample data",
        "status":"success"
    }
}


////order/////////////////
{
    "itemsPrice":18000,
    "taxPrice":36,
    "shippingPrice":100,
    "totalPrice":18136,
    "orderItem":[
       {
         "product":"65eb0fa3a02a936db77c1ea8",
        "name":"samsung",
        "price":18000,
        "image":"sample 1.jpeg",
        "quantity":1
       }
    ],
    "shippingInfo":{
        "address":"mappala house",
        "city":"malappuram",
        "state":"kerala",
        "country":"india",
        "pincode":679577,
        "phone":8139886630
    },
    "paymentInfo":{
        "id":"sample data",
        "status":"success"
    }
}