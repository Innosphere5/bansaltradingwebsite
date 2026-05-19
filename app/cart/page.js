"use client";

import React from 'react';
import { useCart } from '../context/CartContext';
import styles from './cart.module.css';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import {
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ShoppingCart,
  Package,
  ChevronRight,
  CheckCircle2,
  PhoneCall,
  Clock,
  Truck,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';
import CheckoutModal from '../components/CheckoutModal';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
    isGiftEligible,
    giftRemainingAmount,
    eligibleGroceryTotal,
    finalPrice
  } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [orderConfirmed, setOrderConfirmed] = React.useState(null);

  React.useEffect(() => {
    // Check if there was a very recent order in this session
    const lastOrder = localStorage.getItem('lastOrderId');
    if (lastOrder && !cart.length) {
      // Potentially show status, but we'll let the modal handle the transition
    }
  }, [cart.length]);

  React.useEffect(() => {
    // We already have "Free delivery" in the CheckoutModal and Order Summary, 
    // so we don't need a repetitive toast here.
  }, [cart.length]);

  if (cart.length === 0 && !orderConfirmed) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.emptyCart}>
          <div className={styles.emptyIcon}>
            <ShoppingCart size={64} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart or check your order history.</p>
          <div className={styles.emptyActions}>
            <Link href="/" className={styles.continueShopping}>
              Browse Products
            </Link>
            <Link href="/orders" className={styles.viewHistory}>
              Check Your Orders
            </Link>
          </div>
        </main>
        <MobileNav />
      </div>
    );
  }

  if (orderConfirmed) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.successContainer}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={80} />
            </div>
            <h1>Order Confirmed!</h1>
            <p className={styles.orderId}>Order ID: #{orderConfirmed.id.slice(0, 8).toUpperCase()}</p>

            <div className={styles.statusInfo}>
              <div className={styles.statusRow}>
                <Clock size={20} />
                <span>Our team is preparing your wholesale order.</span>
              </div>
              <div className={styles.statusRow}>
                <PhoneCall size={20} />
                <span>Need help? Call us at <a href="tel:9780748073">+91 97807 48073</a></span>
              </div>
            </div>

            <div className={styles.deliveryNote}>
              <Truck size={20} />
              Soon the product will be delivered to your home!
            </div>

            <Link href="/" className={styles.backHome}>
              Continue Shopping
            </Link>
          </div>
        </main>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.cartHeader}>
          <Link href="/" className={styles.backBtn}>
            <ArrowLeft size={20} />
            <span>Back to Catalog</span>
          </Link>
          <h1 className={styles.title}>Shopping Cart ({totalItems} items)</h1>
        </div>

        <div className={styles.cartContent}>
          <div className={styles.itemsList}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  {item.optimized_image_url || item.image_url ? (
                    <img src={item.optimized_image_url || item.image_url} alt={item.product_name} />
                  ) : (
                    <Package size={32} />
                  )}
                </div>

                <div className={item.id === 'free-gift-promo' ? `${styles.itemDetails} ${styles.giftDetails}` : styles.itemDetails}>
                  <div className={styles.itemMainInfo}>
                    <h3 className={styles.itemName}>{item.product_name}</h3>
                    <p className={styles.itemUnit}>{item.unit || 'Per Unit'}</p>
                  </div>

                  <div className={styles.itemPriceInfo}>
                    <div className={styles.itemPrice}>₹{parseFloat(item.price).toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={styles.qtyBtn}
                    >
                      <Minus size={16} />
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={styles.qtyBtn}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className={styles.itemSubtotal}>
                    ₹{(parseFloat(item.price) * item.quantity).toLocaleString('en-IN')}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeBtn}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className={styles.summary}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>

              {isGiftEligible && (
                <div className={styles.summaryRow} style={{ color: '#10b981', fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px' }}>
                  <span>🎁 Free Attractive Gift</span>
                  <span>INCLUDED</span>
                </div>
              )}

              {!isGiftEligible && (
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: '#475569', 
                  background: '#f1f5f9', 
                  padding: '10px 12px', 
                  borderRadius: '8px', 
                  marginTop: '6px',
                  marginBottom: '10px',
                  lineHeight: '1.4'
                }}>
                  Add <strong>₹{giftRemainingAmount.toLocaleString('en-IN')}</strong> more eligible groceries to unlock your <strong>Free Attractive Gift</strong>!
                </div>
              )}

              {!isGiftEligible && totalPrice > eligibleGroceryTotal && (
                <div style={{
                  fontSize: '0.75rem',
                  color: '#b45309',
                  background: '#fffbeb',
                  border: '1px solid #fef3c7',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  marginBottom: '10px',
                  lineHeight: '1.3'
                }}>
                  * Note: Refined & oil items (₹{(totalPrice - eligibleGroceryTotal).toLocaleString('en-IN')}) do not count towards the gift offer.
                </div>
              )}

              <div className={styles.summaryRow}>
                <span>Delivery Charge</span>
                <span className={styles.free}>FREE</span>
              </div>

              <div className={styles.divider}></div>

              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total Amount</span>
                <span>₹{finalPrice.toLocaleString('en-IN')}</span>
              </div>

              {totalPrice < 500 && (
                <div className={styles.minimumOrderAlert}>
                  <AlertTriangle size={20} />
                  <span>
                    Minimum order amount is <strong>₹500</strong>. Add <strong>₹{500 - totalPrice}</strong> more to place an order.
                  </span>
                </div>
              )}

              <button
                className={`${styles.checkoutBtn} ${totalPrice < 500 ? styles.checkoutBtnDisabled : ''}`}
                onClick={() => {
                  if (totalPrice < 500) {
                    toast.error("Customer can't order less than ₹500. Please add more items.");
                    return;
                  }
                  setIsCheckoutOpen(true);
                }}
              >
                Place Order
                <ChevronRight size={20} />
              </button>

              <p className={styles.securePrompt}>
                Secure wholesale checkout powered by Bansal Trading
              </p>
            </div>
          </aside>
        </div>
      </main>

      <MobileNav />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalPrice={finalPrice}
        discountAmount={0}
        isGiftEligible={isGiftEligible}
        subtotalPrice={totalPrice}
        cartItems={cart}
        onSuccess={(order) => setOrderConfirmed(order)}
      />
      <Toaster />
    </div>
  );
}
