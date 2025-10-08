import React, { useEffect, useState } from 'react';
import './SuggestionsPage.css'; // Link the corresponding CSS file
import ProductCard from './ProductCard'; // A simple ProductCard component to display each product

const SuggestionsPage = () => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching suggestions from backend (you can use a mock JSON or an API endpoint)
  useEffect(() => {
    fetch('http://localhost:5000/api/suggested-products')
      .then(response => response.json())
      .then(data => {
        setSuggestedProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching suggested products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading suggestions...</div>;
  }

  return (
    <div className="suggestions-page">
      <h2>Recommended for You</h2>
      <div className="suggestions-grid">
        {suggestedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SuggestionsPage;
