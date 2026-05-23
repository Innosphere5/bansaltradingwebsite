"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  GoogleAuthProvider
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Configure provider to request email and profile info
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is signed in with Firebase client
          const token = await firebaseUser.getIdToken();
          
          // Send ID Token to our server to set HttpOnly secure cookie
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken: token }),
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            
            // If we are on the login page, redirect to home
            if (typeof window !== "undefined" && window.location.pathname === "/login") {
              const params = new URLSearchParams(window.location.search);
              const redirect = params.get("redirect") || "/";
              router.push(redirect);
            }
          } else {
            console.error("Server-side login failed");
            // If server-side session creation fails, clear Firebase auth too
            await firebaseSignOut(auth);
            setUser(null);
          }
        } else {
          // User is signed out of Firebase client
          setUser(null);
          
          // Call API to remove the session cookie
          await fetch("/api/auth/logout", { method: "POST" });
        }
      } catch (error) {
        console.error("Error in onAuthStateChanged:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loginWithGoogle = async () => {
    setLoading(true);
    const toastId = toast.loading("Connecting to Google Auth...");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: token }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        toast.success(`Welcome back, ${data.user.name}!`, { id: toastId });
        
        // Redirect to homepage or previous url
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const redirect = params.get("redirect") || "/";
          router.push(redirect);
          router.refresh();
        }
      } else {
        throw new Error("Failed to authenticate session with server.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      // Detail common Firebase auth popup issues for user guidance
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Sign-in popup closed before completion.", { id: toastId });
      } else if (error.code === "auth/blocked-by-client") {
        toast.error("Sign-in popup was blocked by your browser.", { id: toastId });
      } else {
        toast.error(error.message || "Failed to sign in with Google", { id: toastId });
      }
      setLoading(false);
    }
  };

  const logout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await firebaseSignOut(auth);
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      toast.success("Successfully logged out!", { id: toastId });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out cleanly", { id: toastId });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
