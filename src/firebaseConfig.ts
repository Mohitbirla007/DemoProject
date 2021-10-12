import firebase from "firebase";
/* import 'firebase/auth'; */
import { toast } from "./toast";

const config = {
  //   measurementId: "G-J6W8CMV4BH",
  ///////////////////////////////////////
  apiKey: "AIzaSyAsgCXMa0SMNIG5hL2GsS4xpl_Jj-q3IjU",
  authDomain: "indi-d4f1b.firebaseapp.com",
  databaseURL: "https://indi-d4f1b-default-rtdb.firebaseio.com",
  projectId: "indi-d4f1b",
  storageBucket: "indi-d4f1b.appspot.com",
  messagingSenderId: "356472484887",
  appId: "1:356472484887:web:cf0ede5e12ee2befdc9852",
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const realtimedb = firebase.database();
const storageRef = firebase.storage().ref();
const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();

export { auth, storageRef, providerFacebook, providerGoogle, realtimedb };
export default db;

export async function loginUser(username: string, password: string) {
  const email = `${username}`;
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function registerUser(username: string, password: string) {
  const email = `${username}`;
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    toast(error.message, 4000);
    return false;
  }
}
