// firebase.tsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

initializeApp({
  apiKey: "AIzaSyA-omvRZa7RkaSBcIL6lfLaL0D1xIrpXLc",
  authDomain: "chrono-trigger-tsukuaso-2.firebaseapp.com",
  projectId: "chrono-trigger-tsukuaso-2",
  storageBucket: "chrono-trigger-tsukuaso-2.appspot.com",
  messagingSenderId: "920529231347",
  appId: "1:920529231347:web:2b65a16e97119f14d5c686",
  databaseURL: "https://chrono-trigger-tsukuaso-2.firebaseio.com",
});

export const auth = getAuth();
