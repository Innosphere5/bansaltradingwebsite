"use client";

import React from 'react';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import styles from './offers.module.css';
import { Sparkles, Percent, Gift, ChevronRight, ShoppingBag, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function OffersPage() {
  const { totalPrice, eligibleGroceryTotal, isGiftEligible, giftRemainingAmount } = useCart();
  const goal = 2500;
  const progressPercent = Math.min(100, Math.round((eligibleGroceryTotal / goal) * 100));
  const hasExcludedItems = totalPrice > eligibleGroceryTotal;
  const excludedAmount = totalPrice - eligibleGroceryTotal;

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.badge}><Gift size={16} /> Exclusive Celebration Club</div>
          <h1>Unlock Premium Rewards</h1>
          <p>Maximize your value with our exciting free gift offers.</p>
        </div>

        <div className={styles.offersGrid}>
          {/* Super Interactive Promo Card (₹2500 / Free Gift) */}
          <div className={`${styles.offerCard} ${styles.superOfferCard} ${isGiftEligible ? styles.unlockedCard : ''}`}>
            <div className={styles.superBadge}>
              <Sparkles size={14} style={{ marginRight: '6px' }} /> CELEBRATION GIFT
            </div>
            
            <div className={styles.superCardBody}>
              <div className={styles.mainInfo}>
                <div className={styles.iconWrapper}>
                  <Gift size={32} className={styles.animatedPercent} />
                </div>
                <div className={styles.superText}>
                  <h2 className={styles.superTitle}>Free Attractive Gift on Grocery purchases of ₹2,500!</h2>
                  <p className={styles.superDesc}>
                    Add prime grains, flours, brand items, and detergents to your order. Reach ₹2,500 or more in eligible groceries and get a highly attractive gift absolutely FREE at checkout! (Offer excludes refined oil & oil products from the target).
                  </p>
                </div>
              </div>

              {/* Interactive Progress Tracking */}
              <div className={styles.progressContainer}>
                <div className={styles.progressLabels}>
                  <span className={styles.progressStatus}>
                    {isGiftEligible ? (
                      <span className={styles.unlockedText}>🎉 Success! Free Gift Unlocked!</span>
                    ) : eligibleGroceryTotal > 0 ? (
                      <span>You're only <strong>₹{giftRemainingAmount.toLocaleString('en-IN')}</strong> away!</span>
                    ) : (
                      <span>Start shopping to unlock a Free Gift</span>
                    )}
                  </span>
                  <span className={styles.progressVal}>
                    ₹{eligibleGroceryTotal.toLocaleString('en-IN')} / ₹{goal.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <div className={styles.progressBarBg}>
                  <div 
                    className={`${styles.progressBarFill} ${isGiftEligible ? styles.glowingFill : ''}`} 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {!isGiftEligible && hasExcludedItems && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    fontSize: '0.85rem',
                    color: '#fca5a5',
                    marginTop: '8px'
                  }}>
                    <AlertCircle size={16} style={{ flexShrink: 0, color: '#ef4444' }} />
                    <span>
                      Refined & oil items (worth ₹{excludedAmount.toLocaleString('en-IN')}) in your cart do not count towards the gift offer.
                    </span>
                  </div>
                )}

                {isGiftEligible && (
                  <p className={styles.savingsEstimate}>
                    Attractive Gift Status: <strong style={{ color: '#10b981' }}>Added to Order!</strong>
                  </p>
                )}
              </div>

              {/* Action Button */}
              <div className={styles.superActionWrapper}>
                {isGiftEligible ? (
                  <Link href="/cart" className={styles.superClaimBtnUnlocked}>
                    View Cart & Checkout <ChevronRight size={18} />
                  </Link>
                ) : (
                  <Link href="/" className={styles.superClaimBtn}>
                    {totalPrice > 0 ? 'Add More Items to Cart' : 'Browse Catalog & Unlock'} <ChevronRight size={18} />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className={styles.offerCard}>
            <div className={styles.offerType} style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>Bulk Buy</div>
            <h2>Rice & Flours</h2>
            <p>Save up to 15% on orders above 500kg. Standard Mandi rates apply.</p>
            <Link href="/" className={styles.claimBtn}>Shop Now <ChevronRight size={16} /></Link>
          </div>

          <div className={styles.offerCard}>
            <div className={styles.offerType} style={{ backgroundColor: '#f0f9ff', color: '#0284c7' }}>Combo Deal</div>
            <h2>Spice Station</h2>
            <p>Buy any 5 premium masalas and get 1KG Turmeric absolutely free.</p>
            <Link href="/" className={styles.claimBtn}>View Bundle <ChevronRight size={16} /></Link>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
