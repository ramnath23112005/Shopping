import React from 'react';
import { useCart } from './CartContext';
import './Cart.css'; // Make sure to create this CSS file

const Cart = () => {
    const {
        cart,
        cartVisible,
        setCartVisible,
        removeFromCart,
        updateQuantity,
        clearCart
    } = useCart();

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', '')) || 0;
            return total + (price * item.quantity);
        }, 0).toFixed(2);
    };

    const handleCheckout = () => {
        // Here you would typically integrate with a payment processor
        alert(`Checkout complete! Total: $${calculateTotal()}`);
        clearCart();
        setCartVisible(false);
    };

    if (!cartVisible) return null;

    return (
        <div className="cart-overlay">
            <div className="cart-container">
                <div className="cart-header">
                    <h2>Your Cart ({cart.length} items)</h2>
                    <button 
                        onClick={() => setCartVisible(false)}
                        className="close-cart-btn"
                    >
                        ×
                    </button>
                </div>

                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty</p>
                        <button 
                            onClick={() => setCartVisible(false)}
                            className="continue-shopping-btn"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.map(item => (
                                <div key={`${item.id}-${item.quantity}`} className="cart-item">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="cart-item-image" 
                                    />
                                    <div className="cart-item-details">
                                        <h3>{item.name}</h3>
                                        <p>Price: {item.price}</p>
                                        <div className="quantity-control">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                −
                                            </button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="remove-item-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="cart-summary">
                            <div className="total-section">
                                <span>Subtotal:</span>
                                <span>${calculateTotal()}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="checkout-btn"
                                disabled={cart.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;