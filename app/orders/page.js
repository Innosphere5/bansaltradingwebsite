"use client";

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import styles from './orders.module.css';
import { Package, Clock, CheckCircle2, Truck, XCircle, PhoneCall, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      const phone = localStorage.getItem('customerPhone');
      if (!phone) {
        setLoading(false);
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${apiUrl}/orders`);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          // Filter by phone number and sort by date
          const myOrders = data
            .filter(o => o.customer_phone === phone)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setOrders(myOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={18} className={styles.statusIconPending} />;
      case 'accepted': return <CheckCircle2 size={18} className={styles.statusIconAccepted} />;
      case 'delivered': return <Truck size={18} className={styles.statusIconDelivered} />;
      case 'rejected': return <XCircle size={18} className={styles.statusIconRejected} />;
      default: return <Package size={18} />;
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1>My Order History</h1>
          <p>Track and view your wholesale orders</p>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Package size={48} />
            </div>
            <h2>No orders found</h2>
            <p>You haven&apos;t placed any orders yet or your session expired.</p>
            <Link href="/" className={styles.shopBtn}>Start Shopping</Link>
          </div>
        ) : (
          <div className={styles.ordersList}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderCardHeader}>
                  <div className={styles.orderIdInfo}>
                    <span className={styles.orderLabel}>Order ID</span>
                    <span className={styles.orderId}>#{order.id.slice(0, 8).toUpperCase()}</span>
                  </div>
                  <div className={`${styles.statusBadge} ${styles[order.status]}`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status.toUpperCase()}</span>
                  </div>
                </div>

                <div className={styles.orderItemsPreview}>
                  {order.items.map((item, idx) => (
                    <div key={idx} className={styles.itemRow}>
                      <span className={styles.itemName}>{item.product_name}</span>
                      <span className={styles.itemQty}>x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.orderFooter}>
                  <div className={styles.timeInfo}>
                    <Clock size={14} />
                    <span>{formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}</span>
                  </div>
                  <div className={styles.totalPrice}>
                    ₹{parseFloat(order.total_amount).toLocaleString('en-IN')}
                  </div>
                </div>

                {order.status === 'accepted' && (
                  <div className={styles.acceptedNote}>
                    <PhoneCall size={16} />
                    <span>Order Accepted! Delivery reached you. Call 97807 48073 for more info.</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
