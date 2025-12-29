import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;

const requiredEnv = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} satisfies Partial<FirebaseConfig>;

function ensureConfig(): FirebaseConfig {
  const missingKeys = Object.entries(requiredEnv)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing Firebase config env vars: ${missingKeys.join(", ")}`
    );
  }

  return requiredEnv as FirebaseConfig;
}

export function getFirebaseApp(): FirebaseApp {
  if (firebaseApp) return firebaseApp;

  const config = ensureConfig();
  firebaseApp = getApps().length ? getApp() : initializeApp(config);
  return firebaseApp;
}

export function getDb(): Firestore {
  if (firestoreDb) return firestoreDb;

  firestoreDb = getFirestore(getFirebaseApp());
  return firestoreDb;
}
