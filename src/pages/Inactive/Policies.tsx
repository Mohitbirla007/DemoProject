import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonList, IonItem, IonLabel, IonToast } from '@ionic/react';
import { chevronBack, ribbonOutline, cardOutline, mailOutline, chatboxEllipsesOutline, linkOutline, libraryOutline, newspaperOutline, analyticsOutline} from 'ionicons/icons';
import './Policies.css';


const Policies: React.FC = () => {
    const [showToast1, setShowToast1] = useState(false);
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle className="title">Policies</IonTitle>
        <IonButton href="/settings" fill="clear" slot="start">
          <IonIcon icon={chevronBack} />
        </IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent>
        <IonList>
            <IonItem>
                <IonLabel>Data Policy</IonLabel>
                <IonIcon slot="start" icon={analyticsOutline} />
            </IonItem>
            <IonItem>
                <IonLabel>Terms of Use</IonLabel>
                <IonIcon slot="start" icon={newspaperOutline} />
            </IonItem>
            <IonItem>
                <IonLabel>Open-source libraries</IonLabel>
                <IonIcon slot="start" icon={libraryOutline} />
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

export default Policies;