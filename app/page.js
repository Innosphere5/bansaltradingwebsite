"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

// Import newly created components
import Header from './components/Header';
import CategoriesNav from './components/CategoriesNav';
import ProductCard from './components/ProductCard';
import MobileNav from './components/MobileNav';
import HeroBanner from './components/HeroBanner';
import WhyChooseUs from './components/WhyChooseUs';
import SpecialOffer from './components/SpecialOffer';
import Footer from './components/Footer';
import { useUI } from './context/UIContext';

export default function WebPanel() {
  const { activeCategory, setActiveCategory } = useUI();
  const [allProducts, setAllProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get("search");
      if (searchParam) {
        setSearchQuery(searchParam);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://bansalkaryana-backend.onrender.com/api';
        const response = await fetch(`${apiUrl}/categories`);
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          setCategoriesList(result.data.map(c => c.name));
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://bansalkaryana-backend.onrender.com/api';
        const response = await fetch(`${apiUrl}/products?limit=500`);
        const result = await response.json();
        
        if (result.success) {
          setAllProducts(result.data);
          // Initialize quantities
          const initialQuantities = {};
          result.data.forEach(p => {
            initialQuantities[p.id] = 1;
          });
          setQuantities(initialQuantities);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle selectCategory query param for automatic redirect scroll to product list
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('selectCategory');
      if (catParam) {
        setActiveCategory(catParam);
        
        // Wait until loading finishes, so products are rendered and layout is established
        if (!loading) {
          const timer = setTimeout(() => {
            const productsSection = document.getElementById('products-start');
            if (productsSection) {
              productsSection.scrollIntoView({ behavior: 'smooth' });
            }
            // Clear URL parameter so reloading doesn't scroll again
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
          }, 150);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [loading, setActiveCategory]);

  const updateQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  // "Shop Wholesale" handler — selects All Items and scrolls to products
  const handleShopWholesale = () => {
    setActiveCategory("All Items");
    setTimeout(() => {
      const productsSection = document.getElementById('products-start');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // 1. Filter by Search Query first
  const searchedProducts = allProducts.filter(p => 
    p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 2. Then Filter by Category
  const filteredProducts = activeCategory === "All Items" 
    ? searchedProducts 
    : searchedProducts.filter(p => p.category === activeCategory);

  // Unified list of categories matching sidebar exactly
  const dynamicCategories = [
    "Detergent", "Flours", "Oil", "Refined", "Refined Oil", "Shampoo", "Snacks", "Soap", "Soft Drink"
  ];

  // If "All Items", we group them
  const categoriesToDisplay = activeCategory === "All Items"
    ? Array.from(new Set(searchedProducts.map(p => p.category).filter(Boolean)))
    : [activeCategory];

  // Auto-scroll to results container when search query is typed
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const productsSection = document.getElementById('products-start');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchQuery]);

  return (
    <div className={styles.container}>
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* 1. Hero Section */}
        <div className={styles.heroSectionWrapper}>
          <HeroBanner onShopWholesale={handleShopWholesale} />
        </div>

        {/* 2. Why Choose Us Section */}
        <WhyChooseUs className={styles.fullWidth} />

        {/* Special Volume Offer Card */}
        <SpecialOffer />

        {/* 3. Products Section (Categories + Grid) */}
        <div id="products-start">
          <CategoriesNav
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            categories={dynamicCategories}
          />
        </div>
        
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.loader}></div>
            <p>Loading fresh products for you...</p>
          </div>
        ) : searchQuery.trim() !== "" ? (
          /* Render search results prominently at the top, ignoring category filters */
          <section className={styles.section} id="search-results-section">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Search Results ({searchedProducts.length} items found)
              </h2>
              {searchedProducts.length > 0 && (
                <span 
                  className={styles.viewAll}
                  style={{ color: 'var(--accent-color)', fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </span>
              )}
            </div>
            {searchedProducts.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No products matching &quot;{searchQuery}&quot;</p>
              </div>
            ) : (
              <div className={styles.productGrid}>
                {searchedProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    quantity={quantities[product.id]} 
                    updateQuantity={updateQuantity} 
                  />
                ))}
              </div>
            )}
          </section>
        ) : searchedProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No products found. Admin is adding them soon!</p>
          </div>
        ) : (
          categoriesToDisplay.map(cat => {
            const productsInCat = filteredProducts.filter(p => p.category === cat);
            if (productsInCat.length === 0) return null;
            
            return (
              <section key={cat} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>{cat}</h2>
                  <span className={styles.viewAll}>View All</span>
                </div>
                <div className={styles.productGrid}>
                  {productsInCat.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      quantity={quantities[product.id]} 
                      updateQuantity={updateQuantity} 
                    />
                  ))}
                </div>
              </section>
            );
          })
        )}

        <Footer className={styles.fullWidth} />
        
      </main>

      <MobileNav />
    </div>
  );
}
