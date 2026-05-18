"use client";

import React, { useState, useEffect } from 'react';
import styles from './MobileNav.module.css';
import { Home, ShoppingCart, ListOrdered, Grid } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const { totalItems } = useCart();
  const { openCategories } = useUI();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setIsMounted(true);
  }, []);

  return (
    <nav className={styles.mobileBottomNav}>
      <Link href="/" className={`${styles.mobileNavItem} ${pathname === '/' ? styles.active : ''}`}>
        <Home size={22} />
        <span>Catalog</span>
      </Link>
      
      <Link href="/cart" className={`${styles.mobileNavItem} ${pathname === '/cart' ? styles.active : ''}`}>
        <div className={styles.mobileNavIcon}>
          <ShoppingCart size={22} />
          {isMounted && totalItems > 0 && <span className={styles.mobileCartBadge}>{totalItems}</span>}
        </div>
        <span>Cart</span>
      </Link>
  
      <Link href="/orders" className={`${styles.mobileNavItem} ${pathname === '/orders' ? styles.active : ''}`}>
        <ListOrdered size={22} />
        <span>Orders</span>
      </Link>
  
      <div className={styles.mobileNavItem} onClick={openCategories}>
        <Grid size={22} />
        <span>Categories</span>
      </div>
    </nav>
  );
}
