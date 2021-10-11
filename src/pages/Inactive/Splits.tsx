import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonItem, IonLabel, IonRadioGroup, IonRadio } from '@ionic/react';
import { chevronBack, cardOutline, gitNetworkOutline, addCircleOutline, shareSocialOutline} from 'ionicons/icons';
import './Splits.css';


const Splits: React.FC = () => {
    const [] = useState(false);
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle className="title" >Splits</IonTitle>
        <IonButton href="/settings" fill="clear" slot="start" color="primary">
          <IonIcon icon={chevronBack} />
        </IonButton>
        <IonButton href="/splitpercentages" fill="clear" slot="end" color="warning">
          <IonIcon className="addicon" icon={addCircleOutline} />
        </IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent >

          <div className="indi"  >
          <p>Choose a card to be used for INDI payment charges and purchases. Note: Any changes made here will aslo be made in your INDI account.</p>
          </div>
          
          <div className="indi"  >
          <p>Select a default split:</p>
          </div>
          <IonRadioGroup>
          <IonItem className="visacard">
            <IonLabel>Split 1</IonLabel>
            <IonRadio slot="end" color="warning" value="1804"></IonRadio>
            <IonIcon slot="start" icon={shareSocialOutline} />
          </IonItem>

          <IonItem className="visacard" >
            <IonLabel>Split 2</IonLabel>
            <IonRadio slot="end" color="warning" value="0014"></IonRadio>
            <IonIcon slot="start" icon={shareSocialOutline} />
          </IonItem>
        </IonRadioGroup>

        <div className="signin">
      <IonButton className="save" expand="block" color="warning" > <p className="signbutton"> Confirm </p> </IonButton>
      </div>
      </IonContent>
    </IonPage>
  );
};

export default Splits;