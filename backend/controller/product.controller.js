const Product = require('../model/product.model')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middelware/catchAsyncErrors');

// create product
exports.createProduct= catchAsyncErrors ( async (req,res,next)=>{
    const product = await Product.create(req.body)
       if(product){
        console.log(product)
        res.status(201).send({status:true, data:'', message:"product added successfully"})
       } 
})

// get all products
exports.getAllProducts=catchAsyncErrors( async(req,res)=>{
    const productData = await Product.find();
    if(productData){
        res.status(200).send({status:true,data:productData,message:"all product get successfully"});
    }
})
// get single product
exports.getSingleProduct= catchAsyncErrors( async(req,res,next) =>{
    let product = await Product.findById(req.params.id)
        if(product){
           return res.status(200).send({status:true,data:product,message:"product fetch sending...."})
        }
        return next (new ErrorHandler('product not found1',404))
})
///update product

exports.updateProduct= catchAsyncErrors ( async(req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return next (new ErrorHandler("product not found",400));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,runValidators:true,
        useFindAndModify:false
    })
    console.log(product)
    res.status(201).send({status:true,data:product,message:"update successfully"})
}
)

// delete product

exports.deleteProduct = catchAsyncErrors (  async (req,res,next) => {
    await Product.deleteOne({_id:req.params.id}).then((data)=>{
        if(data.deletedCount===1){
            return res.status(201).send({status:true,data:'',message:"product deleted successfully"})
        }
        return next (new ErrorHandler("cannot deleted plase try again",400))
    }).catch(err=>{
        return next (new ErrorHandler("cannot deleted plase try again",400))
    })
})

