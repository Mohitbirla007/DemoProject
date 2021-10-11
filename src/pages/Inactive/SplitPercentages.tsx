import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonItem, IonLabel, IonAvatar, IonCard, IonInput, IonFooter } from '@ionic/react';
import { checkmarkCircle, chevronBack, gitNetworkOutline, personAddOutline} from 'ionicons/icons';
import './SplitPercentages.css';


const SplitPercentages: React.FC = () => {
    const [] = useState(false);
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle className="title" >Split Percentage</IonTitle>
        <IonButton href="/splits" color="primary" fill="clear" slot="start">
          <IonIcon icon={chevronBack} />
        </IonButton>
        <IonButton href="" color="warning" fill="clear" slot="end">
          <IonIcon className="button" icon={personAddOutline} />
        </IonButton>
      </IonToolbar>
    </IonHeader>

    <IonContent>

    <IonItem className="splitcard" >
     <IonIcon className="splitlogo" slot="start" icon={gitNetworkOutline} />
     <IonLabel><IonInput placeholder="Split Name"></IonInput></IonLabel>
     </IonItem>

    <IonCard className="firstcard" >
          <IonItem>
          <IonAvatar slot="start">
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
          </IonAvatar>
            <IonLabel>
            <h2>Mike Rock</h2>
            <p>Music Artist</p>
            </IonLabel>
            <IonInput type="number" slot="end">%</IonInput>
          </IonItem>
     </IonCard>

     <IonCard className="secondcard" >
          <IonItem>
          <IonAvatar slot="start">
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
          </IonAvatar>
            <IonLabel>
            <h2>Motion Music</h2>
            <p>Label</p>
            </IonLabel>
            <IonInput type="number" slot="end">%</IonInput>
          </IonItem>
          </IonCard>

     <IonToolbar>   
     <div className="spliticon" >
     <IonIcon  slot="start" color="danger" icon={checkmarkCircle} />
     </div>

     <div className="totalsplit" >
     <IonLabel
     >Total Split: 100%</IonLabel>
     </div>
     </IonToolbar>

     <div className="signin">
      <IonButton className="save" expand="block" color="warning" > <p className="signbutton"> Save </p> </IonButton>
      </div>
      </IonContent>
      <IonFooter>
      </IonFooter>
    </IonPage>
  );
};

export default SplitPercentages;