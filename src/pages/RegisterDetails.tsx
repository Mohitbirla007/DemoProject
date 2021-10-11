import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonToolbar, IonAvatar, IonInput, IonButton, IonText, IonLoading, IonItem, IonIcon, IonToast, useIonViewWillEnter, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react';
import './RegisterDetails.css';
import { toast } from '../toast';
import db, { auth, registerUser } from '../firebaseConfig'
import { calendarOutline, personOutline, callOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { selectUser } from '../reducer/User/userSlice';
import { useSelector } from 'react-redux';

const RegisterDetails: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')
  const [busy, setBusy] = useState<boolean>(false)
  const history = useHistory();
  const user = useSelector(selectUser); // REDUX USER-REDUCER SELECTOR


  useIonViewDidEnter(() => {
    if (user) {
      history.push("/explore");
    } else {
      let username: any = auth.currentUser?.email?.split("@")[0];
      let usernameSplit: any = username?.split("@")[0];
      console.log(usernameSplit)
      setUsername(usernameSplit);
    }
  });

  useIonViewDidLeave(() => {
    setShowToast(false);
    setAlertColor('');
    setMessage('');
    setUsername('');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setBusy(false);
  });

  async function registerdetails() {
    setBusy(true)
    if (username.trim() === '' || firstname.trim() === '' || lastname.trim() === '' || phonenumber.trim() === '') {
      return toast('creditial are missing')
    } else {
      db.collection("user").doc(auth.currentUser?.uid).update({
        username: username,
        firstname: firstname,
        lastname: lastname,
        phonenumber: phonenumber
      }).then(() => {
        setBusy(false)
        history.push("/tutorial");
      }).catch(function (e) {
        setMessage('Something went wrong while adding user info');
        setAlertColor('danger');
        setShowToast(true);
      });
    }
  }

  return (
    <IonPage>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={message}
        duration={3000}
        color={alertColor}
      />
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />

      <IonContent>
        <div className="logo">
          <img src="/assets/INDI_transparent V2.png" />
        </div>

        <h3 className="login"> Register Details</h3>
        <p className="reset" >Nearly There...</p>



        <IonItem className="padding" >
          <IonIcon className="mailout" icon={personOutline} slot="start" />
          <IonInput
            value={username}
            className="namea"
            placeholder="Username"
            onIonChange={(e: any) => setUsername(e.target.value)} />
        </IonItem>

        <IonItem className="padding"  >
          <IonIcon className="mailout" icon={personOutline} slot="start" />
          <IonInput className="namea"
            placeholder="First Name"
            onIonChange={(e: any) => setFirstName(e.target.value)} />
        </IonItem>

        <IonItem className="padding" >
          <IonIcon className="mailout" icon={personOutline} slot="start" />
          <IonInput className="namea"
            placeholder="Last Name"
            onIonChange={(e: any) => setLastName(e.target.value)} />
        </IonItem>

        <IonItem className="padding" >
          <IonIcon className="mailout" icon={callOutline} slot="start" />
          <IonInput className="namea"
            type="number"
            placeholder="Phone Number"
            onIonChange={(e: any) => setPhoneNumber(e.target.value)} />
        </IonItem>

        <div className="block" >
          <IonButton expand="block" color="warning" onClick={registerdetails}> <p className="signbutton"> Get Started </p> </IonButton>
        </div>

        <div className="cancelbutton" >
          <IonButton routerLink="cover" expand="block" fill="clear"> <p className="cancel">Cancel</p></IonButton>
        </div>


      </IonContent>
    </IonPage>
  );
};

export default RegisterDetails;




