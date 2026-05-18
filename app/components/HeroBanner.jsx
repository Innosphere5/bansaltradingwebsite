"use client";
import React from 'react';
import styles from './HeroBanner.module.css';
import Link from 'next/link';

const HeroBanner = ({ onShopWholesale }) => {
  const handleShopClick = () => {
    if (onShopWholesale) {
      onShopWholesale();
    } else {
      const productsSection = document.getElementById('products-start');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOffersClick = () => {
    const section = document.getElementById('special-offer-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
        <div className={styles.textSide}>
          <h1 className={styles.title}>
            Premium Quality.<br />
            <span className={styles.highlight}>Unbeatable Wholesale Rates.</span>
          </h1>
          <p className={styles.subtitle}>
            Your preferred source for daily essentials, prime grains, and name-brand household goods.
          </p>
          <div className={styles.ctaWrapper}>
            <button className={styles.primaryBtn} onClick={handleShopClick}>Shop Wholesale</button>
            <button className={styles.secondaryBtn} onClick={handleOffersClick}>View Offers</button>
          </div>
        </div>
        <div className={styles.imageSide}>
          {/* We use a div with background for better control, or an img tag */}
          <div className={styles.heroImage}></div>
        </div>
        
        {/* Decorative Elements */}
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>✨</span>
          <span className={styles.badgeText}>Best Price Guaranteed</span>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
