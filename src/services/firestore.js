import dayjs from 'dayjs';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { getUUID } from './uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const getEntries = async (initialDate) => {
  const selectedMonth = dayjs(initialDate).get('month');
  const selectedYear = dayjs(initialDate).get('year');
  const finalDate = dayjs()
    .date(dayjs(selectedMonth).daysInMonth())
    .month(selectedMonth)
    .year(selectedYear)
    .hour(23)
    .minute(59)
    .second(59)
    .toDate();
  
  const querySnapshot = await db
    .collection('entries')
    .orderBy('datetime')
    .startAt(initialDate)
    .endAt(finalDate)
    .get();
  const entries = querySnapshot.docs.map(entry => entry.data());

  return entries;
};

export const addEntry = async (entry) => {
  const data = await db.collection('entries')
    .add({
      id: getUUID(),
      datetime: entry.datetime,
      entryName: entry.entryName,
      category: entry.category,
      value: entry.value
    });
  
  console.log(data)
};