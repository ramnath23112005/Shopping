import React from 'react';
import './Navbar.css';
import { useCart } from '../Cart/CartContext';

const Navbar = () => {
  const { cart, setCartVisible } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="logo">MyShop</div>
      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <button 
          className="cart-button"
          onClick={() => setCartVisible(true)}
        >
          🛒 {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;