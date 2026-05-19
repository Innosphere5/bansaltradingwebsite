"use client";

import React from 'react';
import { useCart } from '../context/CartContext';
import styles from './SpecialOffer.module.css';
import { Tag, Sparkles, CheckCircle2, ChevronRight, ShoppingBag, Gift, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function SpecialOffer() {
  const { totalPrice, isGiftEligible, giftRemainingAmount, eligibleGroceryTotal } = useCart();

  const targetAmount = 2500;
  const progressPercent = Math.min(100, (eligibleGroceryTotal / targetAmount) * 100);

  // Check if they have oil or refined items in their cart
  const hasExcludedItems = totalPrice > eligibleGroceryTotal;
  const excludedAmount = totalPrice - eligibleGroceryTotal;

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
              <span>WHOLESALE CELEBRATION OFFER</span>
            </div>
            
            <h2 className={styles.title}>
              Shop More, Get Rewarded!<br />
              <span className={styles.discountHighlight}>Get an Attractive Gift FREE!</span>
            </h2>
            
            <p className={styles.description}>
              Unlock a premium, highly attractive corporate gift absolutely <strong>FREE</strong> when your grocery purchase reaches <strong>₹2,500</strong>. Add prime grains, flours, brand items, and detergents to your order!
            </p>

            <p style={{ fontSize: '0.85rem', color: '#fca5a5', marginTop: '-5px', fontWeight: '500' }}>
              *Please note: Refined oil & oil products are excluded from the ₹2,500 threshold calculation.
            </p>

            <ul className={styles.benefitsList}>
              <li className={styles.benefitItem}>
                <CheckCircle2 size={18} className={styles.benefitIcon} />
                <span>Premium corporate quality gift added automatically</span>
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
                  {isGiftEligible ? "🎉 FREE GIFT UNLOCKED" : "GIFT ELIGIBILITY PROGRESS"}
                </span>
                <span className={styles.trackerValue}>
                  ₹{eligibleGroceryTotal.toLocaleString('en-IN')} <span className={styles.targetTotal}>/ ₹2,500</span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className={styles.progressBg}>
                <div 
                  className={`${styles.progressFill} ${isGiftEligible ? styles.glowingFill : ''}`} 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* Interactive Actions & Summary info */}
              <div className={styles.trackerFooter}>
                {isGiftEligible ? (
                  <div className={styles.unlockedBox}>
                    <p className={styles.savingsTxt}>
                      Congratulations! You've unlocked an <strong className={styles.greenText}>Attractive Free Gift</strong> with your order!
                    </p>
                    <Link href="/cart" className={styles.claimBtn}>
                      Go to Cart & Checkout <ChevronRight size={18} />
                    </Link>
                  </div>
                ) : (
                  <div className={styles.lockedBox}>
                    <p className={styles.pendingTxt}>
                      Add just <strong>₹{giftRemainingAmount.toLocaleString('en-IN')}</strong> more eligible groceries to unlock your attractive free gift.
                    </p>
                    {hasExcludedItems && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        fontSize: '0.8rem',
                        color: '#fca5a5',
                        lineHeight: '1.4'
                      }}>
                        <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px', color: '#ef4444' }} />
                        <span>
                          Refined & oil items (worth ₹{excludedAmount.toLocaleString('en-IN')}) in your cart do not count towards the gift offer.
                        </span>
                      </div>
                    )}
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
