import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonList, IonItem, IonLabel, IonToast } from '@ionic/react';
import { chevronBack, ribbonOutline, cardOutline, mailOutline, chatboxEllipsesOutline, linkOutline, keyOutline, keypadOutline, personRemoveOutline} from 'ionicons/icons';
import './Security.css';


const Security: React.FC = () => {
    const [showToast1, setShowToast1] = useState(false);
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle className="title" >Security</IonTitle>
        <IonButton href="/settings" fill="clear" slot="start">
          <IonIcon icon={chevronBack} />
        </IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent>
        <IonList>
            <IonItem onClick={() => setShowToast1(true)}>
                <IonLabel>Password</IonLabel>
                <IonIcon slot="start" icon={keyOutline} />
            </IonItem>
          
            <IonItem href="removeaccount">
                <IonLabel>Remove Account</IonLabel>
                <IonIcon slot="start" icon={personRemoveOutline} />
            </IonItem>
        </IonList>

        <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Password reset sent to email"
        duration={500}
      />

      </IonContent>
    </IonPage>
  );
};

export default Security;