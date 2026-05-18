"use client";

import React from 'react';
import styles from './BottomBar.module.css';
import { ArrowRight } from 'lucide-react';

export default function BottomBar() {
  return (
    <div className={styles.bottomBarDesktop}>
      <div className={styles.summaryArea}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Order Subtotal</span>
          <span className={styles.summaryValue}>₹12,450.00</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Items in Cart</span>
          <span className={styles.summaryValue}>04</span>
        </div>
      </div>
      
      <div className={styles.actionsArea}>
        <button className={styles.exportBtn}>Export List</button>
        <button className={styles.reviewBtn}>
          Review Bulk Order <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
