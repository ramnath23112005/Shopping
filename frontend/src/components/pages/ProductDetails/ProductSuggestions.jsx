import React from 'react';
import './ProductSuggestions.css';

const ProductSuggestions = ({ suggestions }) => (
  <div className="suggestions-section">
    <h2>You May Also Like</h2>
    <div className="suggestions-scroll">
      {suggestions.map((item) => (
        <div key={item._id} className="suggestion-card">
          <img src={item.image} alt={item.name} />
          <p>{item.name}</p>
          <span>{item.price}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ProductSuggestions;
