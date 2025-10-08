import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ProductCardSquare from './pages/ProductCards/ProductCardSquare';
import ProductCardRect from './pages/ProductCards/ProductCardRect';
import ProductCardBigRect from './pages/ProductCards/ProductCardBigRect';
import ProductCardSquareSmall from './pages/ProductCards/ProductCardSquareSmall';

import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const renderSlider = (title, filteredProducts) => (
    <div className="product-row">
      <h3>{title}</h3>
      <div className="product-slider">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
            {product.type === 'square' && <ProductCardSquare product={product} />}
            {product.type === 'rect' && <ProductCardRect product={product} />}
            {product.type === 'big-rect' && <ProductCardBigRect product={product} />}
            {product.type === 'square-small' && <ProductCardSquareSmall product={product} />}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="home-page">
      <h2>Our Products</h2>

      {/* Layout 1: All Types */}
      {renderSlider('Layout 1: Mixed Cards', products)}

      {/* Layout 2: Only Square */}
      {renderSlider(
        'Layout 2: Square Cards',
        products.filter(product => product.type === 'square')
      )}

      {/* Layout 3: Only Rect */}
      {renderSlider(
        'Layout 3: Rect Cards',
        products.filter(product => product.type === 'rect')
      )}

      {/* Layout 4: Only Big Rect */}
      {renderSlider(
        'Layout 4: Big Rect Cards',
        products.filter(product => product.type === 'big-rect')
      )}
    </div>
  );
};

export default HomePage;
