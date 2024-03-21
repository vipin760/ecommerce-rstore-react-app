import React from "react";
import { Link } from "react-router-dom";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  size: window.innerWidth < 600 ? 20 : 5,
  value: 2.5,
  isHalf: true,
};

const Product = ({ product }) => {
  return (
    <Link className="productCard" to={Product._id}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        
        <span>(256 Reviews)</span>
      </div>
      <span>{product.price}</span>
    </Link>
  );
};

export default Product;
