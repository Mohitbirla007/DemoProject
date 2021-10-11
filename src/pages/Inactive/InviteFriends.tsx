import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonList, IonItem, IonLabel, IonToast } from '@ionic/react';
import { chevronBack, ribbonOutline, cardOutline, mailOutline, chatboxEllipsesOutline, linkOutline} from 'ionicons/icons';
import './InviteFriends.css';


const InviteFriends: React.FC = () => {
    const [showToast1, setShowToast1] = useState(false);
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Invite Friends</IonTitle>
        <IonButton href="/settings" fill="clear" slot="start">
          <IonIcon icon={chevronBack} />
        </IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent>
        <IonList>
            <IonItem>
                <IonLabel>Invite friends via Email</IonLabel>
                <IonIcon slot="start" icon={mailOutline} />
            </IonItem>
            <IonItem>
                <IonLabel>Invite friends via SMS</IonLabel>
                <IonIcon slot="start" icon={chatboxEllipsesOutline} />
            </IonItem>
            <IonItem onClick={() => setShowToast1(true)}>
                <IonLabel>Copy Invite with link</IonLabel>
                <IonIcon slot="start" icon={linkOutline} />
            </IonItem>
        </IonList>

        <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Link copied"
        duration={500}
      />

      </IonContent>
    </IonPage>
  );
};

export default InviteFriends;