import React, {useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonText, IonContent, IonCard, IonAvatar, IonButton, IonIcon, IonRadioGroup, IonRadio } from '@ionic/react';
import { chevronBack, personAddOutline } from 'ionicons/icons';
import './Accounts.css';

const Accounts: React.FC = () => {
    const [selected, setSelected] = useState<string>('Mike Rock');
  return (
  <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="login1">Accounts</IonTitle>

            
            <IonButton  href="settings" slot="start" fill="clear">
              <IonIcon className="backbutton" icon={chevronBack} />
            </IonButton>
          
            <IonButton  href="login" slot="end" fill="clear">
              <IonIcon className="button" color="warning" icon={personAddOutline} />
            </IonButton>
            </IonToolbar>
            </IonHeader>

            <IonContent>
        <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>

    <IonCard className="firstcard">
          <IonItem>
          <IonAvatar slot="start"> 
            <img src="./avatar-finn.png" />
          </IonAvatar>

            <IonLabel>
            <h2>Mike Rock</h2>
            <p>Music Artist</p>
            </IonLabel>
            <IonRadio slot="end" color="warning" value="Mike Rock"></IonRadio>
          </IonItem>
     </IonCard>

     <IonCard className="secondcard">
          <IonItem>
          <IonAvatar slot="start">
            <img src="./avatar-finn.png" />
          </IonAvatar>
            <IonLabel>
            <h2>Motion Music</h2>
            <p>Label</p>  
            </IonLabel>
            <IonRadio slot="end" color="warning" value="Motion Music"></IonRadio>
          </IonItem>
     </IonCard>
     </IonRadioGroup>
     <IonText color="medium">
     <p className="switchaccount" >Switch account by selecting relevant one, red mark indicates account currently active.</p>
     </IonText>
    </IonContent>
    </IonPage>
  );
};

export default Accounts;