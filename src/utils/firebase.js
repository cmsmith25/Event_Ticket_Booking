import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYQsO8pPcfW2UuTDEYNF4QC0bUK7A9DzM",
  authDomain: "event-ticket-booking-b0e55.firebaseapp.com",
  projectId: "event-ticket-booking-b0e55",
  storageBucket: "event-ticket-booking-b0e55.firebasestorage.app",
  messagingSenderId: "248311318204",
  appId: "1:248311318204:web:2e70057f7e3491acceb2b9"
    
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);