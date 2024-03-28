import React, { Fragment, useEffect } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../../actions/productAction";
import FiveStarRating from "../../layout/startRating/Star-rating";
import ReviewCard from "../../layout/ReviewCard/ReviewCard";
import Loader from "../../layout/Loader/Loader";
import { CLEAR_ERRORS } from "../../../constants/productContants";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  if (product.data) {
    console.log(product.data);
  }
  useEffect(() => {
    if(error){
        alert(error);
        dispatch(clearErrors())
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id,error]);

  return (
    <Fragment>
      {product.data ? (
        <>
        <div className="container">
          <div className="single-product">
            <div className="row">
              <div className="col-6">
                <div className="product-image">
                  <div className="product-image-main">
                    <img
                      src={product.data.images[0].url}
                      alt=""
                      id="product-main-image"
                    />
                  </div>
                  <div className="product-image-slider">
                    {product.data.images.map((image, index) => {
                      return (
                        <img src={image.url} alt="" id="product-main-image" />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="breadcrumb">
                  <span>
                    <a href="/">Home</a>
                  </span>
                  <span>
                    <a href="/">Product</a>
                  </span>
                  <span className="active">T-shirt</span>
                </div>

                <div className="product">
                  <div className="product-title">
                    <h2>{product.data.name}</h2>
                  </div>
                  <div className="product-rating">
                    <span>
                      <i className="bx bxs-star"></i>
                    </span>
                    <span>
                      <i className="bx bxs-star"></i>
                    </span>
                    <span>
                      <i className="bx bxs-star"></i>
                    </span>
                    <span>
                      <i className="bx bxs-star"></i>
                    </span>
                    <span>
                      <i className="bx bxs-star"></i>
                    </span>
                    <span className="review">
                       {
                        product.data.numOfReviews>=1 ? <p>{product.data.numOfReviews} Review</p> :<p>No Review</p>
                      }
                    </span>
                  </div>
                  <div className="product-price">
                    <span className="offer-price">₹{product.data.price}</span>
                    <span className="sale-price">
                      ₹{parseInt(product.data.price) + 500}
                    </span>
                  </div>
                  <FiveStarRating count={product.data.rating} />
                  <div className="product-details">
                    <div className="stock">
                    <h3>Status :</h3>
                    <b
                      className={
                        product.data.stock < 1 ? "redColor" : "greenColor"
                      }
                    >
                       {product.data.stock < 1 ? "OutOfStock" : "InStock"}
                      {" "}
                    </b>
                    </div>
                  </div>
                  <div className="productDetails-btn">
                  <button className="add-btn">-</button>
                 <input type="number" value="1"/>
                 <button className="add-btn">+</button>
                  </div>
                  <div className="product-details">
                    <h3>Description</h3>
                    <p>{product.data.description}</p>
                  </div>
                  {/* <div className="product-size">
                    <h4>Size</h4>
                    <div className="size-layout">
                      <input
                        type="radio"
                        name="size"
                        value="S"
                        id="1"
                        className="size-input"
                      />
                      <label for="1" className="size">
                        S
                      </label>

                      <input
                        type="radio"
                        name="size"
                        value="M"
                        id="2"
                        className="size-input"
                      />
                      <label for="2" className="size">
                        M
                      </label>

                      <input
                        type="radio"
                        name="size"
                        value="L"
                        id="3"
                        className="size-input"
                      />
                      <label for="3" className="size">
                        L
                      </label>

                      <input
                        type="radio"
                        name="size"
                        value="XL"
                        id="4"
                        className="size-input"
                      />
                      <label for="4" className="size">
                        XL
                      </label>

                      <input
                        type="radio"
                        name="size"
                        value="XXL"
                        id="5"
                        className="size-input"
                      />
                      <label for="5" className="size">
                        XXL
                      </label>
                    </div>
                  </div>
                  <div className="product-color">
                    <h4>Color</h4>
                    <div className="color-layout">
                      <input
                        type="radio"
                        name="color"
                        value="black"
                        className="color-input"
                      />
                      <label for="black" className="black"></label>
                      <input
                        type="radio"
                        name="color"
                        value="red"
                        className="color-input"
                      />
                      <label for="red" className="red"></label>

                      <input
                        type="radio"
                        name="color"
                        value="blue"
                        className="color-input"
                      />
                      <label for="blue" className="blue"></label>
                    </div>
                  </div> */}


                  <span className="divider"></span>

                  <div className="product-btn-group">
                    <div className="button buy-now">
                      <i className="bx bxs-zap"></i> Buy Now
                    </div>
                    <div className="button add-cart">
                      <i className="bx bxs-cart"></i> Add to Cart
                    </div>
                    <div className="button heart">
                      <i className="bx bxs-heart"></i> submit Review
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="reviewHeading">Reviews</h3>
        {
            product.data.reviews && product.data.reviews[0]?(
                <div className="reviews">
                    {product.data.reviews&& product.data.reviews.map((review)=> <ReviewCard review={review} /> )}
                </div>
            ):(
                <p className="noReviews">No Reviews</p>
            )
        }
        </>
      ) : (
        <Loader/>
      )}
    </Fragment>
  );
};

export default ProductDetails;

// {product.data ? (
//     <div className="ProductDetails">
//       <div className="left-card">
//         <div>
//           <img
//             className="CarouselImage"
//             key={product.data.images[0].url}
//             src={product.data.images[0].url}
//             alt=""
//           />
//         </div>
//       </div>
//     <div className="right-card">
//     <div className="detailsBlock-1">
//         <h2>{product.data.name}</h2>
//         <p>product #{product.data._id}</p>
//       </div>
//       <div className="deatilsBlock-2">
//         <FiveStarRating count={product.data.rating} />
//         <span>( {product.data.numOfReviews} Reviews )</span>
//       </div>
//       <div className="deatilsBlock-3">
//         <h1>{`₹${product.data.price}`}</h1>
//         <div className="details-block-3-1">
//             <div className="detailsBlock-3-1-1">
//                 <button>-</button>
//                 <input type="number" value="1"/>
//                 <button>+</button>
//                 <button>Add to Cart</button>
//             </div>
//             <p>Status:{" "}
//             <b className={product.data.stock<1 ? "redColor":"greenColor"}>
//                 {product.data.stock<1?"OutOfStock":"InStock"}
//             </b>
//             </p>
//         </div>
//       </div>
//       <div className="detailsBlock-4">
//         Description: <p>{product.data.description}</p>
//       </div>
//     <button className="submitReview">Submit Review</button>
//     </div>
//     </div>
//   ) : (
//     <div>loading</div>
//   )}
