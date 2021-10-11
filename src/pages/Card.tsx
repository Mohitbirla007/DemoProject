import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonCard, IonInput, IonItem, IonLabel, IonToggle } from '@ionic/react';
import './Card.css';
import { chevronBack } from 'ionicons/icons';

const Card: React.FC = () => {
    const [cardname, setCardName] = useState('')
    const [cardnumber, setCardNumber] = useState('')
    const [expdate, setExpDate] = useState('')
    const [cvc, setCVC] = useState('')
  return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title">Card</IonTitle>
            <IonButton href="/payment" fill="clear" slot="start">
              <IonIcon icon={chevronBack} />
            </IonButton>
          </IonToolbar>
        </IonHeader>

      <IonContent>
          <IonCard class="cardpayment">
              <IonItem>
                  <IonLabel>Card Holder</IonLabel>
            <IonInput
            placeholder="Card Holder Name"
            onIonChange={(e: any) => setCardName(e.target.value)}
            />
            </IonItem>
            <IonItem>
                <IonLabel>Card Number</IonLabel>
            <IonInput
            type="number" 
            value="number"
            placeholder="0000 0000 0000 0001"
            onIonChange={(e: any) => setCardNumber(e.target.value)}
            />
            </IonItem>
            <IonItem>
                <IonLabel>Exp Date</IonLabel>
            <IonInput
            type="number" 
            placeholder="01/23"
            onIonChange={(e: any) => setExpDate(e.target.value)}
            />
            <IonLabel>CVC</IonLabel>
            <IonInput
            type="number" 
            placeholder="123"
            onIonChange={(e: any) => setCVC(e.target.value)}
            />
            </IonItem>
            <IonItem>
                <IonLabel>Set As Prefered</IonLabel>
                <IonToggle color="danger" value="prefered" />
            </IonItem>
          </IonCard>
      </IonContent>
      <div className="send">
      <IonButton className="savebutton" expand="block" color="warning" > <p className="signbutton"> Save </p> </IonButton>
      </div>
    </IonPage>
  );
};

export default Card;