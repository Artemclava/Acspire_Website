// ======================================================
// Firebase Configuration for ACSPIRE Website
// ======================================================
// SETUP STEPS:
// 1. Go to https://console.firebase.google.com/
// 2. Click "Add project" → name it "acspire-website"
// 3. Firestore Database → Create Database → Start in TEST mode
// 4. Project Settings → Your apps → Web app → Register
// 5. Copy the firebaseConfig values below and replace the placeholders
// ======================================================

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
