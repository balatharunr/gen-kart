"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { getFirebaseAuth, googleProvider } from '@/lib/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authInstance, setAuthInstance] = useState(null);

  useEffect(() => {
    const instance = getFirebaseAuth();
    setAuthInstance(instance);

    if (!instance) {
      setLoading(false);
      console.warn('Firebase auth is not available. Skipping auth state listener.');
      return () => {};
    }

    const unsubscribe = onAuthStateChanged(instance, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    if (!authInstance) {
      return { user: null, error: 'Authentication is not initialized. Please check your Firebase configuration.' };
    }
    try {
      const result = await signInWithPopup(authInstance, googleProvider);
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  };

  // Sign out
  const signOut = async () => {
    if (!authInstance) {
      return { error: 'Authentication is not initialized. Please check your Firebase configuration.' };
    }
    try {
      await firebaseSignOut(authInstance);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};