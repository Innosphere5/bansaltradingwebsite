"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./login.module.css";
import { ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { loginWithGoogle, loading } = useAuth();

  return (
    <div className={styles.container}>
      {/* Decorative ambient background glows */}
      <div className={styles.glow1}></div>
      <div className={styles.glow2}></div>

      {/* Back button for convenience */}
      <Link href="/" className={styles.backButton}>
        <ArrowLeft size={16} />
        <span>Back to Store</span>
      </Link>

      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoBadge}>
            <ShieldCheck size={28} className={styles.shieldIcon} />
          </div>
          <h1 className={styles.title}>Bansal Trading</h1>
          <p className={styles.subtitle}>Wholesale Ordering Portal</p>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.body}>
          <p className={styles.description}>
            To access your order history, manage your cart, and place bulk orders, please sign in with your Google account.
          </p>

          <button 
            onClick={loginWithGoogle} 
            className={styles.googleBtn}
            disabled={loading}
          >
            {loading ? (
              <div className={styles.loaderWrapper}>
                <Loader2 className={styles.spinner} size={20} />
                <span>Securing session...</span>
              </div>
            ) : (
              <>
                <svg className={styles.googleIcon} viewBox="0 0 24 24" width="22" height="22">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.256-3.133C18.29 1.905 15.427 1 12.24 1 6.053 1 1 6.053 1 12.24s5.053 11.24 11.24 11.24c6.458 0 10.766-4.538 10.766-10.95 0-.738-.078-1.3-.176-1.815l-10.59-.43Z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>
        </div>

        <div className={styles.footer}>
          <p>Secure authentication powered by Firebase Auth.</p>
          <p className={styles.support}>Support: 97807-48073 | Bassi Pathana</p>
        </div>
      </div>
    </div>
  );
}
