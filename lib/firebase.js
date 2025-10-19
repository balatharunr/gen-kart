// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let cachedApp;
let cachedAnalytics;

const getFirebaseConfig = () => {
  if (!firebaseConfig.apiKey) {
    return null;
  }
  return firebaseConfig;
};

export const getFirebaseApp = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (cachedApp) {
    return cachedApp;
  }

  const config = getFirebaseConfig();
  if (!config) {
    console.warn("Firebase configuration is missing. Did you set the NEXT_PUBLIC_FIREBASE_* environment variables?");
    return null;
  }

  cachedApp = getApps().length ? getApp() : initializeApp(config);
  return cachedApp;
};

export const getFirebaseAuth = () => {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
};

export const googleProvider = new GoogleAuthProvider();

export const getFirebaseAnalytics = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (cachedAnalytics) {
    return cachedAnalytics;
  }

  const app = getFirebaseApp();
  if (!app) {
    return null;
  }

  cachedAnalytics = getAnalytics(app);
  return cachedAnalytics;
};