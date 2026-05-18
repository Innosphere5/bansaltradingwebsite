"use client";

import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { Search, ShoppingCart, ChevronDown, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import Link from 'next/link';

export default function Header({ searchQuery = "", setSearchQuery }) {
  const { totalItems } = useCart();
  const { openCategories } = useUI();
  const [isMounted, setIsMounted] = useState(false);
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setIsMounted(true);
  }, []);

  const isSearchActive = typeof setSearchQuery === 'function';
  const currentQuery = isSearchActive ? searchQuery : localSearch;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && currentQuery.trim()) {
      if (!isSearchActive) {
        window.location.href = `/?search=${encodeURIComponent(currentQuery.trim())}`;
      }
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.mobileMenuTrigger} onClick={openCategories}>
          <Menu size={24} />
        </div>
        <Link href="/" className={styles.logo}>Bansal Trading</Link>

        <nav className={styles.navLinks}>
          <Link href="/#special-offer-section" className={styles.navLink}>Exclusive Offers</Link>
          <div className={styles.categoryTrigger} onClick={openCategories}>
            <span>Categories</span>
            <ChevronDown size={14} />
          </div>
          <Link href="/orders" className={styles.navLink}>Order History</Link>
        </nav>

        <div className={styles.searchContainer}>
          <div className={styles.searchIconWrapper}>
            <Search size={18} />
          </div>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search products, categories, or SKUs..."
            value={currentQuery}
            onChange={(e) => {
              if (isSearchActive) {
                setSearchQuery(e.target.value);
              } else {
                setLocalSearch(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
          />
          {currentQuery && (
            <button
              className={styles.clearSearch}
              onClick={() => {
                if (isSearchActive) {
                  setSearchQuery("");
                } else {
                  setLocalSearch("");
                }
              }}
              aria-label="Clear search"
            >
              <Menu size={16} style={{ transform: 'rotate(45deg)' }} /> {/* Using Menu as a quick X replacement or I can use X */}
            </button>
          )}
          <div className={styles.searchShortcut}>/</div>
        </div>

        <div className={styles.headerActions}>

          <Link href="/cart" className={styles.actionIcon} title="Shopping Cart">
            <ShoppingCart size={22} color="var(--text-primary)" />
            {isMounted && totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
