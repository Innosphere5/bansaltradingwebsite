"use client";

import React from 'react';
import styles from './CategoriesNav.module.css';

/**
 * CategoriesNav — fully dynamic.
 * Receives `categories` array from parent (derived from real products).
 * "All Items" is always the first tab.
 */
export default function CategoriesNav({ activeCategory, onSelectCategory, categories = [] }) {
  const allTabs = ["All Items", ...categories.filter(c => c && c !== "All Items")];

  return (
    <nav className={styles.categoriesNav}>
      <div className={styles.categoryList}>
        {allTabs.map((category) => (
          <div
            key={category}
            className={`${styles.categoryItem} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </nav>
  );
}
