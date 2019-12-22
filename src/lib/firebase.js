import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../config/firebaseConfig.js';

// Initialize Cloud Firestore through Firebase
export const fire = firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export function getMessages() {
  return db.collection('messages').get();
}

export function postMessage(payload) {
  return db.collection('messages').add(payload);
}