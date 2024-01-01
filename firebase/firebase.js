import { initializeApp } from "firebase/app";
import {getAuth}from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDHuOU-2bB_Jo-iEQJh7ZYP0NIrtyaTE5I",
  authDomain: "next-chat-app-1.firebaseapp.com",
  projectId: "next-chat-app-1",
  storageBucket: "next-chat-app-1.appspot.com",
  messagingSenderId: "219133152176",
  appId: "1:219133152176:web:98486d797578d3c78fe475"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)