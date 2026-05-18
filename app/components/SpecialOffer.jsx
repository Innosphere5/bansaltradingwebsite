"use client";

import React from 'react';
import { useCart } from '../context/CartContext';
import styles from './SpecialOffer.module.css';
import { Tag, Sparkles, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function SpecialOffer() {
  const { totalPrice, discountAmount, isDiscountEligible } = useCart();

  const targetAmount = 2500;
  const progressPercent = Math.min(100, (totalPrice / targetAmount) * 100);
  const remainingAmount = Math.max(0, targetAmount - totalPrice);

  return (
    <section id="special-offer-section" className={styles.wrapper}>
      <div className={styles.card}>
        {/* Radial Aura Glow */}
        <div className={styles.radialGlow}></div>
        
        <div className={styles.contentGrid}>
          {/* Left Column: Promotion Info */}
          <div className={styles.promoInfo}>
            <div className={styles.badge}>
              <Sparkles size={14} className={styles.badgeIcon} />
              <span>WHOLESALE VOLUME OFFER</span>
            </div>
            
            <h2 className={styles.title}>
              Shop More, Save Bigger!<br />
              <span className={styles.discountHighlight}>Get Flat 10% OFF</span>
            </h2>
            
            <p className={styles.description}>
              Unlock an extra <strong>10% volume discount</strong> on your entire wholesale order when your subtotal reaches <strong>₹2,500</strong>. Shop prime grains, flours, oils, and brand items at lower rates than ever!
            </p>

            <ul className={styles.benefitsList}>
              <li className={styles.benefitItem}>
                <CheckCircle2 size={18} className={styles.benefitIcon} />
                <span>Automatic 10% discount subtracted at checkout</span>
              </li>
              <li className={styles.benefitItem}>
                <CheckCircle2 size={18} className={styles.benefitIcon} />
                <span>Combines perfectly with Mandi-rate pricing</span>
              </li>
              <li className={styles.benefitItem}>
                <CheckCircle2 size={18} className={styles.benefitIcon} />
                <span>100% FREE doorstop wholesale delivery</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Live Tracker */}
          <div className={styles.progressSection}>
            <div className={styles.trackerCard}>
              <div className={styles.trackerHeader}>
                <span className={styles.trackerLabel}>
                  {isDiscountEligible ? "🎉 OFFER UNLOCKED" : "LIVE PROGRESS"}
                </span>
                <span className={styles.trackerValue}>
                  ₹{totalPrice.toLocaleString('en-IN')} <span className={styles.targetTotal}>/ ₹2,500</span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className={styles.progressBg}>
                <div 
                  className={`${styles.progressFill} ${isDiscountEligible ? styles.glowingFill : ''}`} 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* Interactive Actions & Summary info */}
              <div className={styles.trackerFooter}>
                {isDiscountEligible ? (
                  <div className={styles.unlockedBox}>
                    <p className={styles.savingsTxt}>
                      You saved <strong className={styles.greenText}>₹{discountAmount.toLocaleString('en-IN')}</strong> on this order!
                    </p>
                    <Link href="/cart" className={styles.claimBtn}>
                      Go to Cart & Checkout <ChevronRight size={18} />
                    </Link>
                  </div>
                ) : (
                  <div className={styles.lockedBox}>
                    <p className={styles.pendingTxt}>
                      Add just <strong>₹{remainingAmount.toLocaleString('en-IN')}</strong> more to unlock your 10% wholesale discount.
                    </p>
                    <button 
                      className={styles.shopBtn}
                      onClick={() => {
                        const productsSection = document.getElementById('products-start');
                        if (productsSection) {
                          productsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Browse Catalog <ShoppingBag size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
