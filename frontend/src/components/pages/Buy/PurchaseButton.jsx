// pages/PaymentPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PaymentPage = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || !productName || !price || !userEmail) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/pay', {
        productId,
        productName,
        price,
        user: userEmail,
      });

      if (response.data?.payment) {
        setMessage('Purchase successful!');
      } else {
        setMessage('Purchase failed!');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setMessage('Failed to process payment.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product ID:<br />
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <label>
          Product Name:<br />
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <label>
          Price (e.g. $19.99):<br />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <label>
          Your Email:<br />
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Make Payment
        </button>
      </form>
      {message && (
        <p style={{ marginTop: 20, fontWeight: 'bold' }}>{message}</p>
      )}
    </div>
  );
};

export default PaymentPage;
