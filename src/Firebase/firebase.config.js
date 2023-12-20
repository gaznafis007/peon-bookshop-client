// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSDQuzmljKVfj9QnN_k9xSi-IhxEdcy-o",
  authDomain: "peon-bookshop-client.firebaseapp.com",
  projectId: "peon-bookshop-client",
  storageBucket: "peon-bookshop-client.appspot.com",
  messagingSenderId: "645764309797",
  appId: "1:645764309797:web:b48e96345b47e96e05f0cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
