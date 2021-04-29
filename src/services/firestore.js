import dayjs from 'dayjs';
import firebase from 'firebase/app';
import 'firebase/firestore';
import getCollectionName from '../utils/getCollectionName';

import { getTotalBalance } from '../utils/getExtractTotals';
import { getUUID } from './uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const getEntries = async (selectedDate) => {
  const collectionName = getCollectionName(selectedDate);
  const querySnapshot = await db
    .collection(collectionName)
    .orderBy('datetime')
    .get();

  const entries = querySnapshot.docs.map(entry => entry.data());

  return entries;
};

export const addEntry = async (entry) => {
  const collectionName = getCollectionName(entry.datetime);

  const haveCreditEntry = await db
    .collection(collectionName)
    .where('category', '==', 'credit')
    .get()
    .then(querySnapshot => querySnapshot.docs);

  if (haveCreditEntry.length === 0 && entry.category === 'credit') {
    const entryMonth = dayjs(entry.datetime).get('month');
    const entryYear = dayjs(entry.datetime).get('year');
    const datetime = dayjs()
      .date(1)
      .month(entryMonth)
      .year(entryYear)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .toDate();
    const lastMonth = dayjs(datetime).month(entryMonth - 1);
    const entries = await getEntries(lastMonth);
    const totalBalanceLastMonth = getTotalBalance(entries);

    const balanceEntryId = getUUID();
    await db.collection(collectionName).doc(balanceEntryId)
      .set({
        id: balanceEntryId,
        datetime: datetime,
        entryName: 'saldo do mês anterior',
        category: 'credit',
        value: totalBalanceLastMonth
      });
  };

  const entryId = getUUID();
  await db.collection(collectionName).doc(entryId)
    .set({
      id: entryId,
      datetime: entry.datetime,
      entryName: entry.entryName,
      category: entry.category,
      value: entry.value
    });
};

export const deleteEntry = async (entry) => {
  const collectionName = getCollectionName(entry.datetime);
  await db.collection(collectionName).doc(entry.id).delete();
};