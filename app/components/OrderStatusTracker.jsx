"use client";

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Truck, CheckCircle2 } from 'lucide-react';

export default function OrderStatusTracker() {
  const [lastStatus, setLastStatus] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      const orderId = localStorage.getItem('lastOrderId');
      if (!orderId) return;

      const notifiedKey = `notified_accepted_${orderId}`;
      if (localStorage.getItem(notifiedKey) === 'true') {
        // If we already notified for this order, we can stop checking or just return
        // but we might want to still check status for other reasons.
        // Actually, if it's already notified, we just don't show the toast again.
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://bansalkaryana-backend.onrender.com/api';
        const response = await fetch(`${apiUrl}/orders`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const myOrder = data.find(o => o.id === orderId);

          if (myOrder && myOrder.status !== lastStatus) {
            if (myOrder.status === 'accepted' && localStorage.getItem(notifiedKey) !== 'true') {
              // Mark as notified immediately
              localStorage.setItem(notifiedKey, 'true');

              toast.success((t) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontWeight: '800', fontSize: '1.1rem', color: '#064e3b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '1.3rem' }}>🎉</span> Order Confirmed!
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#065f46', lineHeight: '1.4' }}>
                    The Admin has accepted your order. Your items are being packed and will be delivered shortly!
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <button 
                      onClick={() => {
                        toast.dismiss(t.id);
                        window.location.href = '/orders';
                      }}
                      style={{ 
                        background: '#10b981', 
                        color: 'white', 
                        border: 'none',
                        padding: '8px 14px', 
                        borderRadius: '8px', 
                        fontSize: '0.85rem', 
                        cursor: 'pointer',
                        fontWeight: '700',
                        width: '100%',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      View Order Details
                    </button>
                  </div>
                </div>
              ), {
                duration: 15000,
                position: 'top-center',
                style: {
                  background: '#f0fdf4',
                  border: '2px solid #10b981',
                  borderRadius: '16px',
                  boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.2), 0 10px 10px -5px rgba(16, 185, 129, 0.1)',
                  minWidth: '320px',
                  padding: '16px'
                }
              });
            }
            setLastStatus(myOrder.status);
          }
        }
      } catch (error) {
        console.error('Error checking status:', error);
      }
    };

    const interval = setInterval(checkStatus, 1000);
    return () => clearInterval(interval);
  }, [lastStatus]);

  return null;
}
