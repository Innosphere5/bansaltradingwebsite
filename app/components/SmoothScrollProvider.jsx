"use client";

import React, { useEffect } from "react";

/**
 * SmoothScrollProvider
 * 
 * Provides:
 * 1. IntersectionObserver-based fluid scroll-reveal animations for any element
 *    with `className="scroll-reveal"` or attribute `data-reveal`.
 * 2. Seamless passive observation across dynamic content loads.
 * 3. Graceful fallback for reduced motion preferences.
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Reveal immediately without animation for accessibility
      document.querySelectorAll(".scroll-reveal, [data-reveal]").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -40px 0px", // Trigger slightly before element hits bottom of viewport
      threshold: 0.08,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Unobserve once revealed to save CPU/memory
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeElements = () => {
      const elements = document.querySelectorAll(
        ".scroll-reveal:not(.is-visible), [data-reveal]:not(.is-visible)"
      );
      elements.forEach((el) => observer.observe(el));
    };

    // Initial scan
    observeElements();

    // Re-scan when new elements are added dynamically (e.g. products loading)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return <>{children}</>;
}
