"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import styles from './CategoryRow.module.css';

export default function CategoryRow({ title, products, quantities, updateQuantity, onSelectCategory }) {
  const rowRef = useRef(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);

  // Check scroll position to dynamically show/hide navigation arrows
  const checkScrollLimits = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftBtn(scrollLeft > 10);
      // scrollWidth - scrollLeft - clientWidth is the remaining scrollable distance
      setShowRightBtn(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const row = rowRef.current;
    if (row) {
      row.addEventListener('scroll', checkScrollLimits, { passive: true });
      // Initial check
      checkScrollLimits();
      // Keep in sync with window resizing
      window.addEventListener('resize', checkScrollLimits);

      // Setup a MutationObserver to recheck scroll limits when children render/load
      const observer = new MutationObserver(checkScrollLimits);
      observer.observe(row, { childList: true, subtree: true });

      return () => {
        row.removeEventListener('scroll', checkScrollLimits);
        window.removeEventListener('resize', checkScrollLimits);
        observer.disconnect();
      };
    }
  }, [products]);

  // Execute scroll on clicking desktop navigation arrows
  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      // Scroll by 85% of visible area for precise, user-friendly paging
      const scrollAmount = clientWidth * 0.85;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <span className={styles.viewAll} onClick={() => onSelectCategory && onSelectCategory(title)} style={{ cursor: 'pointer' }}>View All</span>
      </div>

      <div className={styles.rowWrapper}>
        {showLeftBtn && (
          <button
            className={`${styles.navBtn} ${styles.leftBtn}`}
            onClick={() => handleScroll('left')}
            aria-label="Scroll products left"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div className={styles.productRow} ref={rowRef}>
          {products.map(product => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard
                product={product}
                quantity={quantities[product.id]}
                updateQuantity={updateQuantity}
              />
            </div>
          ))}
        </div>

        {showRightBtn && (
          <button
            className={`${styles.navBtn} ${styles.rightBtn}`}
            onClick={() => handleScroll('right')}
            aria-label="Scroll products right"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </section>
  );
}
