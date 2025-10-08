import React from 'react';
import './ImageToggle.css';

const ImageToggle = ({ images = [], selectedImage, setSelectedImage }) => {
  return (
    <div className="image-toggle">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`thumb-${idx}`}
          className={`thumbnail ${img === selectedImage ? 'selected' : ''}`}
          onClick={() => setSelectedImage(img)}
        />
      ))}
    </div>
  );
};

export default ImageToggle;
