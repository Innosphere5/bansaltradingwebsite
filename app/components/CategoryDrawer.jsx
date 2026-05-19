"use client";

import React, { useEffect } from 'react';
import styles from './CategoryDrawer.module.css';
import { X, ChevronRight, Grid, Zap, Star, ShieldCheck, Coffee, Leaf, Droplets, Utensils, SprayCan } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useRouter, usePathname } from 'next/navigation';

const categories = [
  { id: 1, name: "Detergent", icon: <SprayCan size={20} />, count: "15+ Brands" },
  { id: 2, name: "Flours", icon: <Leaf size={20} />, count: "10+ Grains" },
  { id: 3, name: "Oil", icon: <Droplets size={20} />, count: "8 Varieties" },
  { id: 4, name: "Refined", icon: <Droplets size={20} />, count: "5 Brands" },
  { id: 5, name: "Refined Oil", icon: <Droplets size={20} />, count: "12 Items" },
  { id: 6, name: "Shampoo", icon: <Star size={20} />, count: "25+ Brands" },
  { id: 7, name: "Snacks", icon: <Utensils size={20} />, count: "40+ Items" },
  { id: 8, name: "Soap", icon: <ShieldCheck size={20} />, count: "30+ Items" },
  { id: 9, name: "Soft Drink", icon: <Coffee size={20} />, count: "15 Flavors" },
];

export default function CategoryDrawer() {
  const { isCategoryDrawerOpen, closeCategories, setActiveCategory } = useUI();
  const router = useRouter();
  const pathname = usePathname();

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isCategoryDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCategoryDrawerOpen]);

  const handleCategorySelect = (catName) => {
    setActiveCategory(catName);
    closeCategories();
    
    // Reset body overflow immediately to ensure scrolling is not locked by drawer state
    document.body.style.overflow = 'unset';
    
    // If we're not on home page, go there and specify the category in the query param
    if (pathname !== '/') {
      router.push(`/?selectCategory=${encodeURIComponent(catName)}`);
    } else {
      // If we ARE on home page, wait a tiny bit for DOM states to settle, then scroll to products start
      setTimeout(() => {
        const productsSection = document.getElementById('products-start');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  if (!isCategoryDrawerOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeCategories}>
      <div className={`${styles.drawer} ${isCategoryDrawerOpen ? styles.open : ''}`} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h3>Shop by Category</h3>
            <p>Direct from Mandi to your Store</p>
          </div>
          <button className={styles.closeBtn} onClick={closeCategories}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.categoryGrid}>
            <div 
              className={styles.categoryCard}
              onClick={() => handleCategorySelect("All Items")}
            >
              <div className={styles.iconWrapper}><ShieldCheck size={20} /></div>
              <div className={styles.catInfo}>
                <span className={styles.catName}>All Products</span>
                <span className={styles.catCount}>Browse Everything</span>
              </div>
              <ChevronRight size={18} className={styles.arrow} />
            </div>

            {categories.map((cat) => (
              <div 
                key={cat.id} 
                className={styles.categoryCard}
                onClick={() => handleCategorySelect(cat.name)}
              >
                <div className={styles.iconWrapper}>{cat.icon}</div>
                <div className={styles.catInfo}>
                  <span className={styles.catName}>{cat.name}</span>
                  <span className={styles.catCount}>{cat.count}</span>
                </div>
                <ChevronRight size={18} className={styles.arrow} />
              </div>
            ))}
          </div>

          <div className={styles.promoSection}>
            <div className={styles.promoBadge}>GIFT OFFER</div>
            <h4>Free Attractive Gift!</h4>
            <p>Get a highly attractive gift FREE on grocery purchases of ₹2,500 or more (excluding refined & oil)!</p>
            <button 
              className={styles.promoBtn}
              onClick={() => {
                closeCategories();
                const offersSection = document.getElementById('special-offer-section');
                if (offersSection) {
                  offersSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Check Gift Progress
            </button>
          </div>
        </div>

        <div className={styles.footer}>
          <span>Need help? Contact Wholesale Support</span>
        </div>
      </div>
    </div>
  );
}
