"use client";

import React, { useEffect, useState } from 'react';
import styles from './CategoryDrawer.module.css';
import { X, ChevronRight, Grid, Zap, Star, ShieldCheck, Coffee, Leaf, Droplets, Utensils, SprayCan, ShoppingBag } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useRouter, usePathname } from 'next/navigation';

const staticCategories = [
  { name: "Detergent", icon: <SprayCan size={20} />, count: "15+ Brands" },
  { name: "Flours", icon: <Leaf size={20} />, count: "10+ Grains" },
  { name: "Oil", icon: <Droplets size={20} />, count: "8 Varieties" },
  { name: "Refined", icon: <Droplets size={20} />, count: "5 Brands" },
  { name: "Refined Oil", icon: <Droplets size={20} />, count: "12 Items" },
  { name: "Shampoo", icon: <Star size={20} />, count: "25+ Brands" },
  { name: "Snacks", icon: <Utensils size={20} />, count: "40+ Items" },
  { name: "Soap", icon: <ShieldCheck size={20} />, count: "30+ Items" },
  { name: "Soft Drink", icon: <Coffee size={20} />, count: "15 Flavors" },
];

const getCategoryIcon = (name) => {
  const normalized = name.toLowerCase();
  if (normalized.includes('detergent') || normalized.includes('cleaning')) return <SprayCan size={20} />;
  if (normalized.includes('flour') || normalized.includes('dal') || normalized.includes('pulse') || normalized.includes('grain')) return <Leaf size={20} />;
  if (normalized.includes('oil') || normalized.includes('refined')) return <Droplets size={20} />;
  if (normalized.includes('shampoo') || normalized.includes('hair')) return <Star size={20} />;
  if (normalized.includes('snack') || normalized.includes('biscuit') || normalized.includes('food') || normalized.includes('chocolate')) return <Utensils size={20} />;
  if (normalized.includes('soap') || normalized.includes('wash') || normalized.includes('hygiene')) return <ShieldCheck size={20} />;
  if (normalized.includes('drink') || normalized.includes('coffee') || normalized.includes('tea') || normalized.includes('beverage')) return <Coffee size={20} />;
  if (normalized.includes('rice') || normalized.includes('grain')) return <Leaf size={20} />;
  if (normalized.includes('spice') || normalized.includes('masala')) return <Zap size={20} />;
  return <ShoppingBag size={20} />;
};

export default function CategoryDrawer() {
  const { isCategoryDrawerOpen, closeCategories, setActiveCategory } = useUI();
  const router = useRouter();
  const pathname = usePathname();
  const [categoriesList, setCategoriesList] = useState([]);

  // Fetch dynamic categories when the drawer is open
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://bansalkaryana-backend.onrender.com/api';
        if (apiUrl && !apiUrl.endsWith('/api') && !apiUrl.endsWith('/api/')) {
          apiUrl = apiUrl.replace(/\/$/, '') + '/api';
        }
        const response = await fetch(`${apiUrl}/categories`);
        const result = await response.json();
        if (result.success && result.data) {
          setCategoriesList(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories in drawer:", error);
      }
    };

    if (isCategoryDrawerOpen) {
      fetchCategories();
    }
  }, [isCategoryDrawerOpen]);

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

  // Build the list of categories dynamically, merging fetched with static metadata
  const displayCategories = categoriesList.length > 0
    ? categoriesList.map((fCat, index) => {
        const staticMatch = staticCategories.find(s => s.name.toLowerCase() === fCat.name.toLowerCase());
        if (staticMatch) {
          return {
            id: fCat.id || index,
            name: fCat.name,
            icon: staticMatch.icon,
            count: staticMatch.count
          };
        }
        return {
          id: fCat.id || index,
          name: fCat.name,
          icon: getCategoryIcon(fCat.name),
          count: "Premium Stock"
        };
      })
    : staticCategories.map((s, index) => ({ id: index, ...s }));

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

            {displayCategories.map((cat) => (
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
