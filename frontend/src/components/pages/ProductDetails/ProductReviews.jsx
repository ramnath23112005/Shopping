import React from 'react';
import './ProductReviews.css';

const ProductReviews = ({ reviews }) => (
  <div className="reviews-section">
    <h2>Customer Reviews</h2>
    {reviews?.length > 0 ? (
      reviews.map((review, i) => (
        <div key={i} className="review-card">
          <p><strong>{review.user}</strong>: {review.comment}</p>
          <p>Rating: {review.rating}/5</p>
        </div>
      ))
    ) : (
      <p>No reviews yet. Be the first to review!</p>
    )}
  </div>
);

export default ProductReviews;
