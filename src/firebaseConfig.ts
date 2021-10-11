import firebase from "firebase";
/* import 'firebase/auth'; */
import { toast } from "./toast";

const config = {
  apiKey: "AIzaSyAsgCXMa0SMNIG5hL2GsS4xpl_Jj-q3IjU", //updated
  authDomain: "indi-d4f1b.firebaseapp.com", //updated
  databaseURL: "https://indi-d4f1b-default-rtdb.firebaseio.com/", //updated
  projectId: "indi-d4f1b", //updated
  storageBucket: "indi-da614.appspot.com",
  messagingSenderId: "356472484887", //updated
  //   appId: "1:662956774567:web:35cdae712abce7e9cef782",
  //   measurementId: "G-J6W8CMV4BH",
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storageRef = firebase.storage().ref();
const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();

export { auth, storageRef, providerFacebook, providerGoogle };
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
