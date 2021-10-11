import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonIcon, IonAvatar,IonLabel, IonList, IonFooter, IonInput } from '@ionic/react';
import { arrowBack, information, camera, addCircleOutline, informationCircleOutline, chevronBack} from 'ionicons/icons';
import './Conversation.css';

const Conversation: React.FC = () => {
    const [message, setMessage] = useState('')
  return (
    <IonPage>
  
        <IonHeader>
          <IonToolbar>
          <IonButton href="/messages" fill="clear" slot="start"><IonIcon icon={chevronBack} /></IonButton> 
        <IonAvatar className="cimage" slot="start"><img src="/assets/mike.conversation.png" /></IonAvatar>
        <IonList>
        <IonLabel className="miketitle" slot="start">Mike Rock</IonLabel>
        <div></div>
        <IonLabel className="miketitle"  >Music Artist</IonLabel>
        </IonList>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
      </IonContent>

      <IonFooter>
            <IonToolbar>
            <IonButton className="conversationicon" slot="start" fill="clear"><IonIcon icon={camera} /></IonButton>
            <IonInput
            placeholder="Message"
            onIonChange={(e: any) => setMessage(e.target.value)}
             />
             <IonButton className="conversationicon" slot="end" fill="clear"><IonIcon icon={addCircleOutline} /></IonButton>
            </IonToolbar>
            </IonFooter>
    </IonPage>
  );
};

export default Conversation;