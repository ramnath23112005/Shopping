import React from 'react';
import './ProductDetails.css'

const ProductDetails = ({ product }) => (
  <div className="detailed-info-section">
    <h2>About This Product</h2>
    <ul>
      {product.about?.map((point, i) => <li key={i}>{point}</li>)}
    </ul>

    <h3>Product Specifications</h3>
    <table className="details-table">
      <tbody>
        <tr><td>Package Dimensions</td><td>{product.packageDimensions}</td></tr>
        <tr><td>Item Weight</td><td>{product.weight}</td></tr>
        <tr><td>ASIN</td><td>{product.asin}</td></tr>
        <tr><td>Net Quantity</td><td>{product.netQuantity}</td></tr>
        <tr><td>Best Sellers Rank</td><td>{product.bestSellersRank}</td></tr>
        <tr><td>Category Rank</td><td>{product.categoryRank}</td></tr>
      </tbody>
    </table>

    <h3>Manufacturer Info</h3>
    <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
    {product.manufacturerLogo && (
      <img src={product.manufacturerLogo} alt="Manufacturer Logo" className="manufacturer-logo" />
    )}
  </div>
);

export default ProductDetails;
