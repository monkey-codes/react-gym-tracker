import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Event } from "./store/ExerciseHistoryContextProvider";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

const logout = async () => {
  await auth.signOut();
};

const syncBuffer = new Array<Event>();

const sync = async () => {
  if (syncBuffer.length === 0) return;
  const copy = syncBuffer.splice(0, syncBuffer.length);
  // only look at the most recent updates
  const latestEventsForIdOnly = copy.reduce<{ [key: string]: Event }>(
    (acc, current) => {
      acc[current.id] = current;
      return acc;
    },
    {}
  );
  // sort chronologically
  const events = Object.values(latestEventsForIdOnly).sort(
    (a: Event, b: Event) => a.timestamp - b.timestamp
  );
  const batch = db.batch();
  events.forEach((event) => {
    batch.set(db.collection("events").doc(event.id), event);
  });
  console.log(`syncing ${events.length} events...`);
  await batch.commit();
};

export { auth, signInWithEmailAndPassword, logout, db, syncBuffer, sync };
