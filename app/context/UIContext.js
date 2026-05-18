"use client";

import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export function UIProvider({ children }) {
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Items");

  const openCategories = () => setIsCategoryDrawerOpen(true);
  const closeCategories = () => setIsCategoryDrawerOpen(false);

  return (
    <UIContext.Provider value={{ 
      isCategoryDrawerOpen, 
      openCategories, 
      closeCategories,
      activeCategory,
      setActiveCategory
    }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
