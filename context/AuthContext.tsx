'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
  subscriptionType: 'basic' | 'premium' | 'premium-plus';
  refreshSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState<'basic' | 'premium' | 'premium-plus'>('basic');

  const refreshSubscription = async () => {
    if (!user) {
      setSubscriptionType('basic');
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setSubscriptionType(userData.subscriptionType || 'basic');
      } else {
        setSubscriptionType('basic');
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setSubscriptionType('basic');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setSubscriptionType(userData.subscriptionType || 'basic');
          } else {
            setSubscriptionType('basic');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setSubscriptionType('basic');
        }
      } else {
        setSubscriptionType('basic');
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        subscriptionType: 'basic',
        createdAt: new Date().toISOString(),
      });

      setIsAuthModalOpen(false);
      setSubscriptionType('basic');
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setSubscriptionType(userData.subscriptionType || 'basic');
      } else {
        setSubscriptionType('basic');
      }

      setIsAuthModalOpen(false);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setSubscriptionType('basic');
  };

  const signInAsGuest = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, 'guest@example.com', 'guest123456');

      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setSubscriptionType(userData.subscriptionType || 'basic');
      } else {
        setSubscriptionType('basic');
      }

      setIsAuthModalOpen(false);
    } catch (error) {
      console.error('Guest sign in error:', error);
      throw error;
    }
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        logout,
        signInAsGuest,
        openAuthModal,
        closeAuthModal,
        isAuthModalOpen,
        subscriptionType,
        refreshSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
