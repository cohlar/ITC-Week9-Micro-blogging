import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from '../config/firebaseConfig.js';

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export function getMessages() {
  return db.collection('messages').get();
}

export function postMessage(payload) {
  return db.collection('messages').add(payload);
}

export function setMessageListener(successCallback, errorCallback, limit) {
  return db.collection('messages')
    .orderBy('date', 'desc')
    .limit(limit)
    .onSnapshot(function (querySnapshot) {
      successCallback(querySnapshot);
    }, function (error) {
      errorCallback(error);
    });
}

export function getMessagesStartAfter(lastVisible, limit) {
  return db.collection('messages')
    .orderBy('date', 'desc')
    .startAfter(lastVisible)
    .limit(limit)
    .get();
}

export function getUser() {
  return firebase.auth().currentUser;
}

export function updateUserDisplayName(user, displayName) {
  user.updateProfile({ displayName: displayName });
}

export function updateUserPhoto(user, photoURL) {
  user.updateProfile({ photoURL: photoURL });
}

export function setUserInFirestore(user) {
  return db.collection('users').doc(user.uid).set({
    userName: user.displayName,
    avatarURL: user.photoURL,
  });
}

export function getUserById(userId) {
  return db.collection('users').doc(userId).get();
}

export async function uploadUserPhoto(file, userId) {
  const storageRef = await firebase.storage().ref(userId);
  const snapshot = await storageRef.put(file);
  return snapshot.ref.getDownloadURL();
}