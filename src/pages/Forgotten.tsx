import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonThumbnail, IonImg, IonLabel, IonItem, IonFab, IonFabButton, IonIcon, IonFabList, IonAvatar, IonInput, IonButton, IonToast } from '@ionic/react';
import { add, settings, mail, person, arrowForwardCircle, arrowBackCircle, arrowUpCircle, logoVimeo, logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Forgotten.css';
import { lockClosed, mailOutline } from 'ionicons/icons';
import { auth } from '../firebaseConfig';
import { useHistory } from 'react-router';


const Forgotten: React.FC = () => {
  const [username, setEmailAddress] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();   // FOR NAVIGATION

  const resetPassword = () => {
    auth.sendPasswordResetEmail(username).then(() => {
      setMessage("Reset link send to your verified email");
      setAlertColor('success');
      setShowToast(true);
      setTimeout(() => {
        history.push("/login");
      }, 1200);
    }).catch((error) => {
      setMessage(error.message);
      setAlertColor('danger');
      setShowToast(true);
    })
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
      <IonToolbar>
        <IonTitle className="forgotten">Forgotten Password</IonTitle>
      </IonToolbar>

      <IonContent>
        <IonItem className="group2285">
          <img src="/assets/Group 2285.png" />
        </IonItem>

        <p className="email">Enter your email address and we will send you instructions to reset your password.</p>

        <IonItem className="padding">
          <IonIcon className="mailout2" icon={mailOutline} slot="start" />

          <IonInput className="emailad"
            placeholder="Email Address"
            onIonChange={(e: any) => setEmailAddress(e.target.value)} />
        </IonItem>

        <div className="blocktwo">
          <IonButton expand="block" color="warning" onClick={resetPassword} > <p className="signbutton"> Send </p> </IonButton>
        </div>

        <div className="cancelbuttontwo" >
          <IonButton expand="block" fill="clear"> <p className="cancel">Cancel</p></IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Forgotten;