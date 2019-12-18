import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Firebase SDK snippet
const firebaseConfig = {
  apiKey: 'AIzaSyC6DbSiZwXmROCBRkuD9JLf5dnSyJu4_ec',
  authDomain: 'micro-blogging-itc.firebaseapp.com',
  databaseURL: 'https://micro-blogging-itc.firebaseio.com',
  projectId: 'micro-blogging-itc',
  storageBucket: 'micro-blogging-itc.appspot.com',
  messagingSenderId: '812577119719',
  appId: '1:812577119719:web:74d1c0e7630a93656a7142'
};

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export function getMessages() {
  return db.collection("messages").get();
}

export function postMessage(payload) {
  return db.collection("messages").add(payload);
}