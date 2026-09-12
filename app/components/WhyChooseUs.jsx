import React from 'react';
import styles from './WhyChooseUs.module.css';
import { Truck, Award, Tag, CheckCircle2 } from 'lucide-react';

const categories = [
  "Rice", "Flours", "Branded pulses", "Edible Oils",
  "Dry fruits", "Nuts", "Cleaning Needs", "Coffee & Tea"
];

const WhyChooseUs = ({ className }) => {
  return (
    <section className={`${styles.container} ${className || ''} scroll-reveal`} data-reveal="true">
      <div className={styles.sectionHeader}>
        <span className={styles.tagline}>Premium Quality at Mandi Rates</span>
        <h2 className={styles.title}>Why Choose Bansal Trading?</h2>
      </div>

      <div className={styles.categoryPills}>
        {categories.map((cat, index) => (
          <div key={index} className={styles.pill}>
            <CheckCircle2 size={16} className={styles.pillIcon} />
            {cat}
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={`${styles.iconCircle} ${styles.delivery}`}>
            <Truck size={32} />
          </div>
          <h3>Fast Local Delivery</h3>
          <p>Direct to your door within hours, ensuring your business never stops.</p>
        </div>

        <div className={styles.card}>
          <div className={`${styles.iconCircle} ${styles.quality}`}>
            <Award size={32} />
          </div>
          <h3>100% Quality Guaranteed</h3>
          <p>Premium staples sorted, cleaned, and packed daily with strict quality checks.</p>
        </div>

        <div className={styles.card}>
          <div className={`${styles.iconCircle} ${styles.pricing}`}>
            <Tag size={32} />
          </div>
          <h3>Wholesale Pricing</h3>
          <p>Get authentic mandi rates on your daily household essentials. No middleman margins.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
