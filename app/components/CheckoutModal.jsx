"use client";

import React, { useState } from 'react';
import styles from './CheckoutModal.module.css';
import { X, User, MapPin, Phone, ShoppingBag, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';

export default function CheckoutModal({ isOpen, onClose, totalPrice, discountAmount = 0, subtotalPrice, cartItems, onSuccess }) {
  const { clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.address || !formData.phone) {
      toast.error('Please fill in all details');
      return;
    }

    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_address: formData.address,
          customer_phone: formData.phone,
          total_amount: totalPrice,
          items: cartItems
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('lastOrderId', data.order.id);
        localStorage.setItem('customerPhone', formData.phone);
        
        // Clear cart IMMEDIATELY
        clearCart();
        
        // Dismiss any existing "free delivery" or other toasts
        toast.dismiss();
        
        // Premium success notification with action
        toast.success((t) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontWeight: '800', fontSize: '1.1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.4rem' }}>🚀</span> Order Sent to Admin!
            </div>
            <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.4' }}>
              We've received your request. Our admin will check and confirm your order shortly.
            </div>
            <button 
              onClick={() => {
                toast.dismiss(t.id);
                window.location.href = '/orders';
              }}
              style={{
                background: '#0f172a',
                color: 'white',
                border: 'none',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: '700',
                marginTop: '4px',
                transition: 'background 0.2s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              Track Order Status
            </button>
          </div>
        ), { 
          duration: 10000,
          position: 'top-center',
          style: {
            background: '#ffffff',
            border: '2px solid #e2e8f0',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            minWidth: '320px',
            padding: '16px'
          }
        });
        
        if (onSuccess) onSuccess(data.order);
        
        setTimeout(() => {
            onClose();
        }, 1000);
      } else {
        throw new Error(data.error || 'Failed to place order');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.header}>
          <div className={styles.iconCircle}>
            <ShoppingBag size={24} />
          </div>
          <div className={styles.headerText}>
            <h2>Complete Your Order</h2>
            <p>Wholesale Delivery within Bassi Pathana</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">
                <User size={16} />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">
                <Phone size={16} />
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="10-digit"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address">
              <MapPin size={16} />
              Delivery Address
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Flat/House No, Street, Landmark..."
              value={formData.address}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div className={styles.orderSummary}>
            {discountAmount > 0 && (
              <>
                <div className={styles.summaryRow} style={{ marginBottom: '6px', fontSize: '0.9rem', color: '#64748b' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotalPrice?.toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.summaryRow} style={{ marginBottom: '6px', fontSize: '0.9rem', color: '#10b981', fontWeight: '600' }}>
                  <span>10% Discount Unlocked</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              </>
            )}
            <div className={styles.summaryRow}>
              <span>Total Amount</span>
              <span className={styles.totalPrice}>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.deliveryBadge}>
              FREE Delivery in Bassi Pathana
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className={styles.spinner} />
                Processing...
              </>
            ) : (
              <>
                Confirm Order
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
