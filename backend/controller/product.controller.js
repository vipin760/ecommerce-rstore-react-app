const Product = require('../model/product.model')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middelware/catchAsyncErrors');
const ApiFeature = require('../utils/apiFeatures');

// create product/////////////////////////////////////////////////////////////////////////////////
exports.createProduct= catchAsyncErrors ( async (req,res,next)=>{
    req.body.user = req.user.id
    const product = await Product.create(req.body)
       if(product){
        res.status(201).send({status:true, data:'', message:"product added successfully"})
       } 
})

// get all products/////////////////////////////////////////////////////////////////////////////////
exports.getAllProducts=catchAsyncErrors( async(req,res)=>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments()
    const apifeatures = new ApiFeature(Product.find(),req.query).search().filter().pagination(resultPerPage)
    const productData = await apifeatures.query;
    if(productData){
        res.status(200).send({status:true,data:productData,productCount:productCount,message:"all product get successfully"});
    }
})
// get single product/////////////////////////////////////////////////////////////////////////////////
exports.getSingleProduct= catchAsyncErrors( async(req,res,next) =>{
    let product = await Product.findById(req.params.id)
        if(product){
           return res.status(200).send({status:true,data:product,message:"product fetch sending...."})
        }
        return next (new ErrorHandler('product not found1',404))
})
///update product/////////////////////////////////////////////////////////////////////////////////

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

// delete product/////////////////////////////////////////////////////////////////////////////////

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

///Review section
/////////create new Review///////////////////////////////////////////////////////////////////////////////////////////
exports.createProductRivew=catchAsyncErrors( async( req,res,next)=>{
    const { rating,comment,productId } = req.body
    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString)
    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString()){
                (rev.rating=rating),(rev.comment=comment)
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length
    }
    let avg=0
   const result= product.reviews.reduce((acc,cur)=> acc+cur.rating,0 )
    // product.rating=product.reviews.forEach(rev=>{ avg+=rev.rating})/product.reviews.length
    product.rating=product.reviews.reduce((acc,cur)=> acc+cur.rating,0 )/product.reviews.length
    await product.save()
    res.status(200).send({status:true,message:"successfull reviewed in these product"});
})

////////////////////////////////////////////////////////////////////////////////////

exports.getAllProductReviews = catchAsyncErrors( async (req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }

    res.status(200).send({status:true,data:product.reviews,message:"product reviews fetch successfully"})
})

////////////////////////////////////////////////////////////////////////////////////

exports.deleteProductReviews = catchAsyncErrors( async (req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    const reviews = product.reviews.filter(rev=> rev._id.toString() !== req.query.reviewId.toString());

    // update rating
    let avg=0
    reviews.forEach((rev)=>{
        avg+=rev.rating
    })

    const rating = avg/reviews.length
    const numOfReviews = reviews.length
     await Product.findByIdAndUpdate(req.query.productId,{reviews,rating,numOfReviews},{new:true,runValidators:true,useFindAndModify:false}).then(data=>{
        res.status(200).send({status:true,data:'',message:"product reviews deleted successfully"})
     })
})

////////////////////////////////////////////////////////////////////////////////////

