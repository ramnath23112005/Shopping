import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartVisible, setCartVisible] = useState(false);

    // Fetch cart from backend when component mounts
    const fetchCart = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/cart');
            const data = await response.json();
            setCart(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setCart([]);
        }
    };

    // Add item to cart
    const addToCart = async (product) => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity: 1
                }),
            });
            await fetchCart(); // Refresh cart after adding
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    // Remove item from cart
    const removeFromCart = async (productId) => {
        try {
            await fetch('http://localhost:5000/api/cart/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });
            await fetchCart(); // Refresh cart after removal
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    // Update item quantity
    const updateQuantity = async (productId, newQuantity) => {
        try {
            await fetch('http://localhost:5000/api/cart/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity: newQuantity }),
            });
            await fetchCart(); // Refresh cart after update
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    // Clear entire cart
    const clearCart = async () => {
        try {
            await fetch('http://localhost:5000/api/cart/clear', {
                method: 'POST',
            });
            setCart([]);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartVisible,
                setCartVisible,
                fetchCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);