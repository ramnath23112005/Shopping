// components/CartPage.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/pay', {
        // Assuming a mock user for now
        user: 'testuser@example.com',
        products: cart,
      });

      if (response.data?.payment) {
        clearCart(); // Clear the cart after successful payment
        alert('Payment successful! Your order is complete.');
      } else {
        alert('Payment failed. Please try again!');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process payment.');
    }
    setLoading(false);
  };

  if (cart.length === 0) {
    return <div>Your cart is empty!</div>;
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cart.map((product) => (
          <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.name} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>-</button>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                  min="1"
                />
                <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
              </div>
            </div>
            <button onClick={() => removeFromCart(product.id)} className="remove-item-btn">Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h2>
        <button onClick={handleCheckout} disabled={loading}>
          {loading ? 'Processing...' : 'Checkout'}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
