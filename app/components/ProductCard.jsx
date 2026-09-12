"use client";

import React, { useState, memo } from 'react';
import styles from './ProductCard.module.css';
import { 
  Plus, 
  Minus, 
  ImageIcon,
  ShoppingCart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

function ProductCard({ product, quantity, updateQuantity }) {
  const { addToCart, cart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const cartItem = cart.find(item => item.id === product.id);
  const isInCart = !!cartItem;
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Real-time stock quantity remaining
  const remainingStock = Math.max(0, product.stock_quantity - quantityInCart);

  const m = parseFloat(product.mrp || 0);
  const p = parseFloat(product.price || 0);
  const hasDiscount = m > p;
  const isLowStock = remainingStock < 50;

  const handleAddToCart = () => {
    const nextQty = (quantity || 1);
    if (quantityInCart + nextQty > product.stock_quantity) {
      toast.error(`Only ${product.stock_quantity} available in stock. Cannot add more.`);
      return;
    }
    addToCart(product, nextQty);
  };

  const imageUrl = product.optimized_image_url || product.image_url;
  const hasImage = !!imageUrl && !imageError;

  return (
    <div className={`${styles.productCard} ${isInCart ? styles.isInCart : ''}`}>
      <div className={styles.productImageWrapper}>
        {hasImage ? (
          <>
            {/* Progressive image skeleton shimmer */}
            {!imageLoaded && (
              <div className={styles.imageSkeleton} aria-hidden="true" />
            )}
            <img 
              src={imageUrl} 
              alt={product.product_name}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`${styles.productImage} ${imageLoaded ? styles.imageVisible : styles.imageHidden}`}
            />
          </>
        ) : (
          <ImageIcon size={44} className={styles.placeholderIcon} />
        )}
        
        {isInCart && (
          <div className={styles.inCartBadge}>
            <span>In Cart: {cartItem.quantity}</span>
          </div>
        )}
      </div>
      
      <div className={styles.productInfo}>
        <div className={styles.categoryBadge}>{product.category}</div>
        <h3 className={styles.productTitle} title={product.product_name}>{product.product_name}</h3>
        
        {product.description && (
          <p className={styles.productDescription}>{product.description}</p>
        )}

        <div className={styles.variantRow}>
          <span className={styles.variantText}>{product.unit || 'Per Unit'}</span>
          <div className={`${styles.stockStatus} ${remainingStock === 0 ? styles.outOfStock : isLowStock ? styles.lowStock : styles.inStock}`}>
            <span className={styles.stockDot}></span>
            {remainingStock === 0 ? 'Out of Stock' : isLowStock ? `Only ${remainingStock} left` : `${remainingStock} in stock`}
          </div>
        </div>
        
        <div className={styles.pricingSection}>
          {hasDiscount && (
            <div className={styles.mrpRow}>
              <span className={styles.mrpLabel}>MRP:</span>
              <span className={styles.mrpValue}>₹{m.toLocaleString('en-IN')}</span>
            </div>
          )}
          
          <div className={styles.priceActionRow}>
            <div className={styles.price}>
              <span className={styles.currency}>₹</span>
              {p.toLocaleString('en-IN')}
            </div>
            
            <div className={styles.actionArea}>
              <div className={styles.quantitySelector}>
                <button 
                  className={styles.qtyBtn} 
                  onClick={() => updateQuantity(product.id, -1)}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className={styles.qtyValue}>{quantity || 1}</span>
                <button 
                  className={styles.qtyBtn} 
                  onClick={() => {
                    const currentSelected = quantity || 1;
                    if (quantityInCart + currentSelected + 1 > product.stock_quantity) {
                      toast.error(`Only ${product.stock_quantity} items are available in stock`);
                      return;
                    }
                    updateQuantity(product.id, 1);
                  }}
                  disabled={quantityInCart + (quantity || 1) >= product.stock_quantity}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              
              <button 
                className={`${styles.addBtn} ${isInCart ? styles.addMoreBtn : ''}`} 
                onClick={handleAddToCart}
                disabled={remainingStock === 0}
              >
                {isInCart ? <Plus size={15} /> : <ShoppingCart size={15} />}
                <span>{isInCart ? 'Add More' : 'Add'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);

