import React, {useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonList, IonItem, IonLabel, IonText, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonCard, IonAvatar, IonNote, IonButtons, IonButton, IonIcon, IonInput } from '@ionic/react';
import { chevronBack, pencil, personAddOutline } from 'ionicons/icons';
import './Authentication.css';

const Authenticaion: React.FC = () => {
    const [Authenticaion, setAuthenticaion] = useState('')
  return (
  <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title">Authentication</IonTitle>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={chevronBack} />
            </IonButton>
          </IonToolbar> 
          </IonHeader> 
          <p className="indi">Enter the 6-digit code we sent to your phone +447542230985</p>

          <div className="authentication">
          <IonInput
            type="number" 
            placeholder="Authenticaion Code"
            onIonChange={(e: any) => setAuthenticaion(e.target.value)}
            />
          </div>

          <p className="indi">Need to update your phone number? Contact customer support to ask to update you phone number</p>

        <div className="send">
      <IonButton className="block" expand="block" color="warning" > <p className="signbutton"> Verify </p> </IonButton>
      </div>
      <IonButton href="cover" expand="block"  fill="clear"> <p className="cancel">Resend Code</p></IonButton>
        <IonContent>
    </IonContent>
    </IonPage>
  );
};

export default Authenticaion;