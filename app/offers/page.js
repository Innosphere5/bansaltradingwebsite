"use client";

import React from 'react';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import styles from './offers.module.css';
import { Sparkles, Percent, Gift, ChevronRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function OffersPage() {
  const { totalPrice } = useCart();
  const goal = 2500;
  const progressPercent = Math.min(100, Math.round((totalPrice / goal) * 100));
  const isUnlocked = totalPrice >= goal;
  const neededAmount = goal - totalPrice;

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.badge}><Percent size={16} /> Exclusive Wholesale Club</div>
          <h1>Unlock Business Savings</h1>
          <p>Maximize your margins with our automatic volume-based deals.</p>
        </div>

        <div className={styles.offersGrid}>
          {/* Super Interactive Promo Card (₹2500 / 10% Off) */}
          <div className={`${styles.offerCard} ${styles.superOfferCard} ${isUnlocked ? styles.unlockedCard : ''}`}>
            <div className={styles.superBadge}>
              <Sparkles size={14} style={{ marginRight: '6px' }} /> BEST VALUE SITEPARTNER
            </div>
            
            <div className={styles.superCardBody}>
              <div className={styles.mainInfo}>
                <div className={styles.iconWrapper}>
                  <Percent size={32} className={styles.animatedPercent} />
                </div>
                <div className={styles.superText}>
                  <h2 className={styles.superTitle}>Shop for ₹2,500, Get 10% OFF Entire Order!</h2>
                  <p className={styles.superDesc}>
                    Scale up your wholesale purchase. Spend ₹2,500 or more in a single order and a flat 10% discount is applied automatically at checkout!
                  </p>
                </div>
              </div>

              {/* Interactive Progress Tracking */}
              <div className={styles.progressContainer}>
                <div className={styles.progressLabels}>
                  <span className={styles.progressStatus}>
                    {isUnlocked ? (
                      <span className={styles.unlockedText}>🎉 Success! 10% Discount Unlocked</span>
                    ) : totalPrice > 0 ? (
                      <span>You're only <strong>₹{neededAmount.toLocaleString('en-IN')}</strong> away!</span>
                    ) : (
                      <span>Start shopping to unlock 10% off</span>
                    )}
                  </span>
                  <span className={styles.progressVal}>
                    ₹{totalPrice.toLocaleString('en-IN')} / ₹{goal.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <div className={styles.progressBarBg}>
                  <div 
                    className={`${styles.progressBarFill} ${isUnlocked ? styles.glowingFill : ''}`} 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {isUnlocked && totalPrice > 0 && (
                  <p className={styles.savingsEstimate}>
                    Instant Savings on checkout: <strong style={{ color: '#10b981' }}>₹{Math.round(totalPrice * 0.1).toLocaleString('en-IN')}</strong>!
                  </p>
                )}
              </div>

              {/* Action Button */}
              <div className={styles.superActionWrapper}>
                {isUnlocked ? (
                  <Link href="/cart" className={styles.superClaimBtnUnlocked}>
                    View Cart & Claim Now <ChevronRight size={18} />
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
