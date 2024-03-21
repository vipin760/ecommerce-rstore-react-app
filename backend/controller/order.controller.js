const Product = require('../model/product.model')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middelware/catchAsyncErrors');
const Order = require('../model/order.model')

//////create order/////////////////////////////////////////////

exports.newOrder= catchAsyncErrors( async(req,res,next)=>{
    const { shippingInfo,orderItem,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice } = req.body
    await Order.create({ shippingInfo,orderItem,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,paidAt:Date.now(),user:req.user._id }).then((data)=>{
        res.status(201).send({status:true,message:"order created successfull"})
    })

})

//////get single order/////////////////////////////////////////////

exports.getSignleOrder = catchAsyncErrors( async (req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new ErrorHandler("order details not found",404));
    }

    res.status(201).send({status:true,data:order,message:"order data found"})
})

//////get login user order/////////////////////////////////////////////

exports.myOrder = catchAsyncErrors( async (req,res,next)=>{
    const order = await Order.find({user:req.user._id});
    if(!order){
        return next(new ErrorHandler("order details not found",404));
    }

    res.status(201).send({status:true,data:order,message:"order data found"})
})

//////get all orders admin/////////////////////////////////////////////

exports.getAllOrders = catchAsyncErrors( async(req,res,next)=>{

    const orders = await Order.find()
    if(!orders){
        return next(new ErrorHandler("order details not found",404));
    }
    
    let totalAmount = 0
    orders.forEach((order)=>{
        totalAmount += order.totalPrice
    })

    res.status(201).send({status:true,data:orders,totalAmount,message:"orders fetch success"})

})

//////update orders admin/////////////////////////////////////////////

exports.updateOrders = catchAsyncErrors( async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("order details not found",404));
    }
    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("You have already delivered this product",404));
    }
    order.orderItem.forEach(async(order)=>{
        await updateStock(order.product,order.quantity)
    }) 

    order.orderStatus = req.body.status;

    if(req.body.status === 'Delivered'){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false}).then((data)=>{
        res.status(201).send({status:true,data:order,message:"orders Delivered success"})
    })

})

async function updateStock(id,quantity){
    const product = await Product.findById(id)
    product.stock -= quantity

    await product.save({validateBeforeSave:false})
} 

//////delete orders admin/////////////////////////////////////////////

exports.deleteOrder = catchAsyncErrors( async (req,res)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("order details not found",404));
    }
    await Order.deleteOne({_id:req.params.id}).then(data=>{
        if(data.deletedCount===1 ){
            res.status(200).send({status:true, message:"order deleted successfully"})
        }
    })

})