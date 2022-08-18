import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, child, onValue, push } from "firebase/database";
import { getFirestore, onSnapshot, collection  } from "firebase/firestore";
import {useEffect, useState} from "react";


const firebaseConfig = {
    apiKey: "AIzaSyD1TXKKY1sMyp3QySLzqpl0ZOLoLTUCUqo",
    authDomain: "booking-12345-638b8.firebaseapp.com",
    projectId: "booking-12345-638b8",
    storageBucket: "booking-12345-638b8.appspot.com",
    messagingSenderId: "262661857010",
    appId: "1:262661857010:web:610ad5c929c94933f1ba6b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore()

