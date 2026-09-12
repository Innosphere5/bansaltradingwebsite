"use client";

import React from 'react';
import styles from './ProductSkeleton.module.css';

/**
 * Single Product Card Skeleton matching ProductCard structure
 */
export function ProductCardSkeleton() {
  return (
    <div className={styles.skeletonCard} aria-hidden="true">
      <div className={`${styles.imagePlaceholder} ${styles.shimmerBox}`} />
      
      <div className={styles.contentWrapper}>
        <div className={`${styles.categoryPlaceholder} ${styles.shimmerBox}`} />
        <div className={`${styles.titleLineLong} ${styles.shimmerBox}`} />
        <div className={`${styles.titleLineShort} ${styles.shimmerBox}`} />
        
        <div className={styles.variantRow}>
          <div className={`${styles.pillPlaceholder} ${styles.shimmerBox}`} />
          <div className={`${styles.stockPlaceholder} ${styles.shimmerBox}`} />
        </div>
        
        <div className={styles.pricingSection}>
          <div className={`${styles.mrpPlaceholder} ${styles.shimmerBox}`} />
          <div className={styles.priceActionRow}>
            <div className={`${styles.pricePlaceholder} ${styles.shimmerBox}`} />
            <div className={styles.actionArea}>
              <div className={`${styles.qtyPlaceholder} ${styles.shimmerBox}`} />
              <div className={`${styles.btnPlaceholder} ${styles.shimmerBox}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Category Row Skeleton matching CategoryRow layout with header + horizontal cards
 */
export function CategoryRowSkeleton({ cardCount = 4 }) {
  return (
    <div className={styles.categoryRowSkeleton} aria-hidden="true">
      <div className={styles.categoryHeaderSkeleton}>
        <div className={`${styles.titleHeaderPlaceholder} ${styles.shimmerBox}`} />
        <div className={`${styles.viewAllPlaceholder} ${styles.shimmerBox}`} />
      </div>

      <div className={styles.horizontalRow}>
        {Array.from({ length: cardCount }).map((_, index) => (
          <div key={index} className={styles.cardWrapper}>
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Product Grid Skeleton matching search results grid layout
 */
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className={styles.gridSkeleton} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default ProductCardSkeleton;
