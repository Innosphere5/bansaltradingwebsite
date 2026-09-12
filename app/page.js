"use client";

import React, { useState, useEffect, useMemo, useDeferredValue, useCallback } from 'react';
import styles from './page.module.css';

// Import newly created components
import Header from './components/Header';
import CategoriesNav from './components/CategoriesNav';
import ProductCard from './components/ProductCard';
import CategoryRow from './components/CategoryRow';
import MobileNav from './components/MobileNav';
import HeroBanner from './components/HeroBanner';
import WhyChooseUs from './components/WhyChooseUs';
import SpecialOffer from './components/SpecialOffer';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { CategoryRowSkeleton, ProductGridSkeleton } from './components/ProductSkeleton';
import { useUI } from './context/UIContext';

export default function WebPanel() {
  const { activeCategory, setActiveCategory } = useUI();
  const [allProducts, setAllProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Deferred search query prevents main-thread stuttering on keystrokes
  const deferredSearchQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get("search");
      if (searchParam) {
        setSearchQuery(searchParam);
      }
    }
  }, []);

  // Instant SWR Cache Hydration: Render products immediately (0ms) from cache if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const cachedProds = sessionStorage.getItem('bansal_cached_products');
        const cachedCats = sessionStorage.getItem('bansal_cached_categories');
        if (cachedProds) {
          const parsed = JSON.parse(cachedProds);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAllProducts(parsed);
            const initialQuantities = {};
            parsed.forEach(p => {
              initialQuantities[p.id] = 1;
            });
            setQuantities(initialQuantities);
            setLoading(false);
          }
        }
        if (cachedCats) {
          const parsedCats = JSON.parse(cachedCats);
          if (Array.isArray(parsedCats) && parsedCats.length > 0) {
            setCategoriesList(parsedCats);
          }
        }
      } catch (e) {
        console.warn("Could not read cached products:", e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://bansalkaryana-backend.onrender.com/api';
        if (apiUrl && !apiUrl.endsWith('/api') && !apiUrl.endsWith('/api/')) {
          apiUrl = apiUrl.replace(/\/$/, '') + '/api';
        }
        const response = await fetch(`${apiUrl}/categories`);
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          const names = result.data.map(c => c.name);
          setCategoriesList(names);
          if (typeof window !== "undefined") {
            try {
              sessionStorage.setItem('bansal_cached_categories', JSON.stringify(names));
            } catch (_) {}
          }
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();

    const fetchProducts = async () => {
      try {
        // If we don't have cached products yet, keep loading spinner/skeleton active
        let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://bansalkaryana-backend.onrender.com/api';
        if (apiUrl && !apiUrl.endsWith('/api') && !apiUrl.endsWith('/api/')) {
          apiUrl = apiUrl.replace(/\/$/, '') + '/api';
        }
        const response = await fetch(`${apiUrl}/products?limit=500`);
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setAllProducts(result.data);
          // Initialize quantities without overwriting existing selections
          setQuantities(prev => {
            const initial = { ...prev };
            result.data.forEach(p => {
              if (!initial[p.id]) initial[p.id] = 1;
            });
            return initial;
          });

          // Cache fresh products in session storage for instant future loads
          if (typeof window !== "undefined") {
            try {
              sessionStorage.setItem('bansal_cached_products', JSON.stringify(result.data));
            } catch (_) {}
          }
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

  const updateQuantity = useCallback((id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  }, []);

  // "Shop Wholesale" handler — selects All Items and scrolls to products
  const handleShopWholesale = useCallback(() => {
    setActiveCategory("All Items");
    setTimeout(() => {
      const productsSection = document.getElementById('products-start');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }, [setActiveCategory]);

  // 1. High-Performance Memoized Filter by Search Query
  const searchedProducts = useMemo(() => {
    const query = deferredSearchQuery.trim().toLowerCase();
    if (!query) return allProducts;
    return allProducts.filter(p =>
      (p.product_name && p.product_name.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query)) ||
      (p.category && p.category.toLowerCase().includes(query))
    );
  }, [allProducts, deferredSearchQuery]);

  // 2. Memoized Filter by Category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All Items") return searchedProducts;
    return searchedProducts.filter(p => p.category === activeCategory);
  }, [searchedProducts, activeCategory]);

  // Dynamic list of categories fetched from the database, falling back to standard list
  const dynamicCategories = useMemo(() => {
    return categoriesList.length > 0
      ? categoriesList
      : ["Chocolate", "Detergent", "Flours", "Oil", "Refined", "Refined Oil", "Shampoo", "Snacks", "Soap", "Soft Drink"];
  }, [categoriesList]);

  // Memoized categories to display
  const categoriesToDisplay = useMemo(() => {
    if (activeCategory === "All Items") {
      return Array.from(new Set(searchedProducts.map(p => p.category).filter(Boolean)));
    }
    return [activeCategory];
  }, [searchedProducts, activeCategory]);

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

        {/* Skeleton UI Loading States */}
        {loading ? (
          <div className={styles.skeletonContainer}>
            {searchQuery.trim() !== "" ? (
              <ProductGridSkeleton count={8} />
            ) : (
              <>
                <CategoryRowSkeleton cardCount={4} />
                <CategoryRowSkeleton cardCount={4} />
                <CategoryRowSkeleton cardCount={4} />
              </>
            )}
          </div>
        ) : searchQuery.trim() !== "" ? (
          /* Render search results prominently at the top, ignoring category filters */
          <section className={`${styles.section} scroll-reveal`} data-reveal="true" id="search-results-section">
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
              <CategoryRow
                key={cat}
                title={cat}
                products={productsInCat}
                quantities={quantities}
                updateQuantity={updateQuantity}
                onSelectCategory={setActiveCategory}
              />
            );
          })
        )}

        <Footer className={styles.fullWidth} />

      </main>

      <ScrollToTop />
      <MobileNav />
    </div>
  );
}

