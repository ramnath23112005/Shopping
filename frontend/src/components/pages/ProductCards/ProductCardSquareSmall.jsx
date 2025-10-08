import React from 'react';
import './ProductCard.css';

const ProductCardSquareSmall = ({ product }) => {
  return (
    <div className="product-card small-square">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductCardSquareSmall;
