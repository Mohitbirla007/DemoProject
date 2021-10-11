import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRadioGroup, IonListHeader, IonLabel, IonItem, IonRadio,  } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Payment.css';
import { cardOutline, chevronBack } from 'ionicons/icons';

const Payment: React.FC = () => {
  return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title">Payment</IonTitle>
            <IonButton href="settings" fill="clear" slot="start">
              <IonIcon icon={chevronBack} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
      <IonContent fullscreen>

           <div className="indi" >
          <p>Choose a card to be used for INDI payment charges and purchases. Note: Any changes made here will aslo be made in your INDI account.</p>
          </div>

          <p className="indi" >Select a payment method</p>
          <IonRadioGroup  > 
          <IonItem className="visacard">
            <IonLabel>Visa - 1804</IonLabel>
            <IonRadio slot="end" color="warning" value="1804"></IonRadio>
            <IonIcon slot="start" icon={cardOutline} />
          </IonItem>

          <IonItem className="visacard" >
            <IonLabel>Visa - 0014</IonLabel>
            <IonRadio slot="end" color="warning" value="0014"></IonRadio>
            <IonIcon slot="start" icon={cardOutline} />
          </IonItem>
        </IonRadioGroup>
        <p></p>

        <IonButton className="block" color="success" href="/card"  expand="block"> <p className="signbutton" > Add Card </p></IonButton>
       
        <p className="indi" >By completing your payment, you agree to INDI's Conditions of Use and authorise INDI to charge your designated card or any other card on file. Please see our Privacy Notice, Cookies Notice.</p>
      
        <IonButton className="block" color="warning" href="/card"  expand="block"> <p className="signbutton" > Confirm </p></IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Payment;