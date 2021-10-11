import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import db, { auth } from '../firebaseConfig';
import { IonContent, IonPage, IonAvatar, IonInput, IonButton, IonIcon, IonItem, IonToast, IonLoading, useIonViewDidLeave, useIonViewDidEnter } from '@ionic/react';
import './Login.css';
import { toast } from '../toast';
import { lockClosed, mailOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../reducer/User/userSlice';

const Login: React.FC = () => {

  const [busy, setBusy] = useState<boolean>(false)
  const [showToast, setShowToast] = useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const history = useHistory();   // FOR NAVIGATION
  const user = useSelector(selectUser); // REDUX USER-REDUCER SELECTOR

  async function login() {
    setBusy(true);
    auth.signInWithEmailAndPassword(username, password)
      .then(async (authUser) => {
        db.collection("user").doc(auth.currentUser?.uid).get().then((result) => {
          if (result.exists) {
            let data: any = result.data();
            localStorage.setItem("category", data.category);
          }
        })
        setBusy(false);
        history.push('/explore')
      }).catch((error) => {
        setBusy(false);
        setMessage(error.message);
        setAlertColor('danger');
        setShowToast(true);
      })
  }

  useIonViewDidEnter(() => {
    if (user) {
      history.push("/explore");
    }
  })

  useIonViewDidLeave(() => {
    setBusy(false);
    setShowToast(false);
    setAlertColor('');
    setMessage('');
    setUsername('');
    setPassword('');
  });

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
      <IonContent className="main_login">
        <div className="logo"  >
          <img src="/assets/INDI_transparent V2.png" />
        </div>
        <h3 className="login"> Login into your INDI</h3>

        <IonItem className="padding">
          <IonIcon className="mailout" icon={mailOutline} slot="start" />

          <IonInput className="namea"
            placeholder="Username"
            onIonChange={(e: any) => setUsername(e.target.value)} />
        </IonItem>


        <IonItem className="padding">
          <IonIcon className="lockclosed" icon={lockClosed} slot="start" />

          <IonInput className="nameb"
            type="password"
            placeholder="Password"
            onIonChange={(e: any) => setPassword(e.target.value)} />

        </IonItem>
        <div className="forgotenbutton" >
          <IonButton routerLink="forgotten" expand="block" fill="clear">Forgotten Password</IonButton>
        </div>

        <div className="block" >
          <IonButton expand="block" color="warning" onClick={login}> <p className="signbutton"> Sign In </p> </IonButton>
        </div>

        <div className="cancelbutton" >
          <IonButton routerLink="cover" expand="block" fill="clear"> <p className="cancel">Cancel</p></IonButton>
        </div>
        <p className="account">Don't have an account? <Link to="/register" className="signup1">Sign Up</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Login;