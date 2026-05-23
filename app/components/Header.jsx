"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import { Search, ShoppingCart, ChevronDown, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

export default function Header({ searchQuery = "", setSearchQuery }) {
  const { totalItems } = useCart();
  const { openCategories } = useUI();
  const { user, logout } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setIsMounted(true);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="Bansal Trading Logo"
            width={36}
            height={36}
            className={styles.logoImg}
            priority
          />
          <span className={styles.logoText}>Bansal Trading</span>
        </Link>

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

          {isMounted && user ? (
            <div className={styles.profileContainer} ref={dropdownRef}>
              <button className={styles.avatarBtn} onClick={() => setShowDropdown(!showDropdown)} aria-label="User menu">
                {user.picture ? (
                  <img src={user.picture} alt={user.name} className={styles.avatarImg} referrerPolicy="no-referrer" />
                ) : (
                  <div className={styles.avatarPlaceholder}>{user.name[0]?.toUpperCase()}</div>
                )}
              </button>
              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.dropdownName}>{user.name}</p>
                    <p className={styles.dropdownEmail}>{user.email}</p>
                  </div>
                  <div className={styles.dropdownDivider}></div>
                  <Link href="/orders" className={styles.dropdownItem} onClick={() => setShowDropdown(false)}>
                    My Orders
                  </Link>
                  <button className={`${styles.dropdownItem} ${styles.logoutBtn}`} onClick={() => { setShowDropdown(false); logout(); }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            isMounted && (
              <Link href="/login" className={styles.loginLink}>
                Login
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
