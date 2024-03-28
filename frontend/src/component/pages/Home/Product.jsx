import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import FiveStarRating from "../../layout/startRating/Star-rating";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  size: window.innerWidth < 600 ? 20 : 5,
  value: 2.5,
  isHalf: true,
};

const Product = ({ product }) => {
  const [rating, setRating] = useState(4.5)
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
      <FiveStarRating count={product.rating}/> <span>Reviews({product.numOfReviews})</span>
      
      </div>
      <span>{`${product.price}`}</span>
    </Link>
  );
};

export default Product;
