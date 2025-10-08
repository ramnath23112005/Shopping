import React from 'react';
import './ProductCard.css';

const ProductCardSquare = ({ product }) => {
  return (
    <div className="product-card square">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductCardSquare;
