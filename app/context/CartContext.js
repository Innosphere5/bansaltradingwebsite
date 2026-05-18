"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage once on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('bansal_trading_cart') || 
                        localStorage.getItem('trading_everywhere_cart') || 
                        localStorage.getItem('bansal_cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes, but only after it's loaded
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('bansal_trading_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    const currentQtyInCart = existingItem ? existingItem.quantity : 0;
    
    if (currentQtyInCart + quantity > product.stock_quantity) {
      toast.error(`Cannot add more. Only ${product.stock_quantity} items available in stock.`);
      return;
    }

    const isExisting = currentQtyInCart > 0;
    
    setCart(prevCart => {
      const isAlreadyIn = prevCart.find(item => item.id === product.id);
      
      if (isAlreadyIn) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    if (isExisting) {
      toast.success(`Updated ${product.product_name} quantity`);
    } else {
      toast.success(`${product.product_name} added to cart`);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && newQuantity > cartItem.stock_quantity) {
      toast.error(`Cannot increase quantity. Only ${cartItem.stock_quantity} items available in stock.`);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    const actualRemoved = cart.find(item => item.id === productId);
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    if (actualRemoved) {
      toast.error(`${actualRemoved.product_name} removed`);
    }
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  // 10% Discount for orders above ₹2,500
  const isDiscountEligible = totalPrice >= 2500;
  const discountAmount = isDiscountEligible ? Math.round(totalPrice * 0.1) : 0;
  const finalPrice = totalPrice - discountAmount;

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      clearCart, 
      totalItems, 
      totalPrice,
      isDiscountEligible,
      discountAmount,
      finalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
