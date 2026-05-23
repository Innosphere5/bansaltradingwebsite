import React from 'react';
import styles from './Footer.module.css';
import { Phone, Mail, MapPin, Users, Camera, Send } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = ({ className }) => {
  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logo}>
              <Image src="/logo.svg" alt="Bansal Trading" width={40} height={40} style={{ borderRadius: '8px' }} />
              <span>Bansal Trading</span>
            </Link>
            <p className={styles.description}>
              Your trusted partner for premium quality groceries at wholesale mandi rates.
              Serving household and business needs with integrity since 1995.
            </p>
            <div className={styles.socials}>
              <div className={styles.socialIcon} title="Community"><Users size={20} /></div>
              <div className={styles.socialIcon} title="Photos"><Camera size={20} /></div>
              <div className={styles.socialIcon} title="Updates"><Send size={20} /></div>
            </div>
          </div>

          <div className={styles.linkGroup}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/offers">Exclusive Offers</Link></li>
              <li><Link href="/orders">My Orders</Link></li>

            </ul>
          </div>



          <div className={styles.contactSection}>
            <h4>Contact Us</h4>
            <div className={styles.contactItem}>
              <Phone size={18} />
              <span>+91 97807 48073</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={18} />
              <span>support@bansaltrading.com</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={18} />
              <span>Near New Bus Stand, Bassi Pathana</span>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© 2026 Bansal Trading. All Rights Reserved.</p>
          <div className={styles.paymentMethods}>
            <span className={styles.paymentTag}>UPI</span>
            <span className={styles.paymentTag}>Cash on Delivery</span>
            <span className={styles.paymentTag}>Cards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
