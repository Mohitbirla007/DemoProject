import React, { useState } from "react";
import {
  IonContent,
  IonToast,
  IonPage,
  IonToolbar,
  IonAvatar,
  IonInput,
  IonButton,
  IonText,
  IonLoading,
  IonItem,
  IonIcon,
  useIonViewDidLeave,
  useIonViewWillLeave,
  useIonViewDidEnter,
} from "@ionic/react";
import "./Register.css";
import { toast } from "../toast";
import db, { auth, realtimedb, registerUser } from "../firebaseConfig";
import { lockClosed, mailOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import firebase from "firebase";
import { selectUser } from "../reducer/User/userSlice";
import { useSelector } from "react-redux";

const Register: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false);
  const [showToast, setShowToast] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [message, setMessage] = useState("");
  const [emailaddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const history = useHistory(); // FOR NAVIGATION
  const user = useSelector(selectUser); // REDUX USER-REDUCER SELECTOR

  useIonViewDidEnter(() => {
    if (user) {
      history.push("/explore");
    }
  });

  useIonViewDidLeave(() => {
    setBusy(false);
    setShowToast(false);
    setAlertColor("");
    setMessage("");
    setEmailAddress("");
    setPassword("");
    setCPassword("");
  });

  const register = async () => {
    setBusy(true);
    //validation
    if (password !== cpassword) {
      setBusy(false);
      return toast("Passwords do not match");
    }
    if (
      emailaddress.trim() === "" ||
      password.trim() === "" ||
      cpassword.trim() === ""
    ) {
      setBusy(false);
      return toast("creditial are missing");
    }

    let User = await auth
      .createUserWithEmailAndPassword(emailaddress, password)
      .then(async (authUser) => {
        return authUser;
      })
      .catch(function (error) {
        setBusy(false);
        setMessage(error.message);
        setAlertColor("danger");
        setShowToast(true);
      });

    if (User) {
      let email = User.user?.email;
      let uid = User.user?.uid;
      console.log(uid);
      db.collection("user")
        .doc(uid)
        .set({
          email: email,
          viewCount: 0,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log("enter");
          setBusy(false);
          auth.currentUser?.sendEmailVerification();
          setMessage("verification email send to your email id");
          setAlertColor("success");
          setShowToast(true);
          setTimeout(() => {
            return history.push("/registerdetails");
          }, 600);
        })
        .catch(function (e) {
          setBusy(false);
          setMessage("Something went wrong while registering user");
          setAlertColor("danger");
          setShowToast(true);
        });

      var userPath = realtimedb.ref("user/" + uid);
      userPath
        .set({
          email: email,
          viewCount: 0,
          uid: uid,
          timestamp: new Date(),
        })
        .then(() => {
          console.log("enter");
          setBusy(false);
          auth.currentUser?.sendEmailVerification();
          setMessage("verification email send to your email id");
          setAlertColor("success");
          setShowToast(true);
          setTimeout(() => {
            return history.push("/registerdetails");
          }, 600);
        })
        .catch(function (e) {
          setBusy(false);
          setMessage("Something went wrong while registering user");
          setAlertColor("danger");
          setShowToast(true);
        });
    }
  };

  return (
    <IonPage>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={message}
        duration={3000}
        color={alertColor}
      />
      <IonContent>
        <div className="logo">
          <img src="/assets/INDI_transparent V2.png" />
        </div>

        <h3 className="login"> Create Account</h3>
        <p className="reset">Lets get started</p>

        <IonItem className="padding">
          <IonIcon className="mailout" icon={mailOutline} slot="start" />

          <IonInput
            className="namea"
            type="email"
            placeholder="Email Address"
            onIonChange={(e: any) => setEmailAddress(e.target.value)}
          />
        </IonItem>

        <IonItem className="padding">
          <IonIcon className="lockclosed" icon={lockClosed} slot="start" />
          <IonInput
            type="password"
            placeholder="Password"
            onIonChange={(e: any) => setPassword(e.target.value)}
          />
        </IonItem>

        <IonItem className="padding">
          <IonIcon className="lockclosed" icon={lockClosed} slot="start" />
          <IonInput
            type="password"
            placeholder="Confirm Password"
            onIonChange={(e: any) => setCPassword(e.target.value)}
          />
        </IonItem>

        <div className="block">
          <IonButton expand="block" color="warning" onClick={register}>
            {" "}
            <p className="signbutton"> Get Started </p>{" "}
          </IonButton>
        </div>

        <div className="cancelbutton">
          <IonButton routerLink="cover" expand="block" fill="clear">
            {" "}
            <p className="cancel">Cancel</p>
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
