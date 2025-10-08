import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useCart } from '../Cart/CartContext'; // Import useCart hook
import ImageToggle from './ImageToggle';
import './ProductMainInfo.css';

const ProductMainInfo = ({
  product,
  selectedImage,
  setSelectedImage,
  toggleImages = [],
}) => {
  const { addToCart } = useCart(); // Extract addToCart function from useCart context
  const [animating, setAnimating] = useState(false);
  const [prevImage, setPrevImage] = useState(null);
  const timeoutRef = useRef(null);

  const handleToggle = (img) => {
    if (img === selectedImage || animating) return;
    setAnimating(true);
    setPrevImage(selectedImage);

    timeoutRef.current = setTimeout(() => {
      setSelectedImage(img);
      setPrevImage(null);
      setAnimating(false);
    }, 400);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleBuyNow = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/pay', {
        productId: product.id,
        productName: product.name,
        price: product.price,
        user: 'testuser@example.com', // Replace with actual user info if available
      });

      if (response.data?.payment) {
        alert('Purchase successful!');
      } else {
        alert('Purchase failed!');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initiation failed');
    }
  };

  const handleAddToCart = () => {
    addToCart({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price.replace('$', '')),
        image: product.image
    });
};

  if (!product) return <div>Loading product info...</div>;

  const imagesToShow = toggleImages.length > 0 ? toggleImages : [product.image];

  return (
    <div className="main-section">
      <div className="image-left">
        <div className="main-image-container">
          {prevImage && (
            <img
              src={prevImage}
              alt="previous"
              className="main-image slide-out"
            />
          )}
          <img
            src={selectedImage}
            alt={product.name || 'Product image'}
            className={`main-image ${prevImage ? 'slide-in' : ''}`}
          />
        </div>

        <ImageToggle
          images={imagesToShow}
          selectedImage={selectedImage}
          setSelectedImage={handleToggle}
        />
      </div>

      <div className="info-right">
        <h2 className="price">{product.price || 'Price not available'}</h2>
        <h1 className="product-title">{product.name || 'Unnamed product'}</h1>

        <div className="actions">
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart} // Add to cart functionality
            aria-label="Add to cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M0 1a1 1 0 011-1h1.22a.5.5 0 01.485.379L3.89 4H14.5a.5.5 0 01.491.592l-1.5 6A.5.5 0 0113 11H4a.5.5 0 01-.491-.408L1.61 2H1a1 1 0 01-1-1zm4.5 12a1 1 0 100 2 1 1 0 000-2zm7 1a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductMainInfo;
