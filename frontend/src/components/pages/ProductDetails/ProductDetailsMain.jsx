import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailsMain.css';

import ProductMainInfo from './ProductMainInfo';
import ProductDetails from './ProductDetails';
import ProductSuggestions from './ProductSuggestions';
import ProductReviews from './ProductReviews';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [toggleImages, setToggleImages] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);

  // Fetch product details + reviews
  useEffect(() => {
    setLoadingProduct(true);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoadingProduct(false);
      })
      .catch(() => {
        setLoadingProduct(false);
      });
  }, [id]);

  // Fetch toggle images
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/products/${id}/toggle-images`)
      .then(res => res.json())
      .then(images => setToggleImages(images))
      .catch(() => setToggleImages([]));
  }, [id]);

  // Update selected image when images load
  useEffect(() => {
    if (toggleImages.length > 0) {
      setSelectedImage(toggleImages[0]);
    } else if (product?.image) {
      setSelectedImage(product.image);
    }
  }, [toggleImages, product]);

  // Fetch suggestions (excluding current product)
  useEffect(() => {
    setLoadingSuggestions(true);
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(p => String(p.id) !== String(id));
        setSuggestions(filtered);
        setLoadingSuggestions(false);
      })
      .catch(() => setLoadingSuggestions(false));
  }, [id]);

  if (loadingProduct) return <div>Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-details-page">
      <h1 className="product-title">{product.name}</h1>

      <ProductMainInfo
        product={product}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        toggleImages={toggleImages}
      />

      <ProductDetails product={product} />

      {loadingSuggestions ? (
        <div>Loading suggestions...</div>
      ) : (
        <ProductSuggestions suggestions={suggestions} />
      )}

      <ProductReviews reviews={product.reviews} />
    </div>
  );
};

export default ProductDetailsPage;
