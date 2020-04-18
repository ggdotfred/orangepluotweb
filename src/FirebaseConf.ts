import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsw9yBazegoe9laSJgC8WTxOkWN4QGPOw",
  authDomain: "orangepluot-e0106.firebaseapp.com",
  databaseURL: "https://orangepluot-e0106.firebaseio.com",
  projectId: "orangepluot-e0106",
  storageBucket: "orangepluot-e0106.appspot.com",
  messagingSenderId: "768001156594",
  appId: "1:768001156594:web:8ba3ffd2bc99be16a2b76b",
  measurementId: "G-WT3E93TX7X"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
