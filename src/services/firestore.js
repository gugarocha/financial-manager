import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const getEntries = async () => {
  const querySnapshot = await db.collection('entries').get();
  const entries = querySnapshot.docs.map(entry => entry.data());
  
  return entries;
};