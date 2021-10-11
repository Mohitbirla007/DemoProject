import React, {useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonList, IonItem, IonLabel, IonText, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonCard, IonAvatar, IonNote, IonButtons, IonButton, IonIcon, IonInput } from '@ionic/react';
import { chevronBack, pencil, personAddOutline } from 'ionicons/icons';
import './Verification.css';

const Verification: React.FC = () => {
    const [verification, setVerification] = useState('')
  return (
  <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title">Verification</IonTitle>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={chevronBack} />
            </IonButton>
        </IonToolbar>
        </IonHeader>
        <IonContent >

          <div className="indi">
            <h5>Apply for INDI verification</h5>
            <p>A verified badge is a check that appears next to an Instagram accounts name to indicate that the account is the authentic presence of a notable public figure, celebrity, global brand or entity its represents. 
            <p>
            </p>Submitting a request for verification does not guarantee that your account will be verified.</p>
            </div>

            <IonItem>
                <IonLabel >Name </IonLabel>
                <IonInput placeholder="Name"></IonInput>
                
            </IonItem>

            <IonItem >
                <IonLabel>Known As
                </IonLabel>
                <IonInput placeholder="Name"></IonInput>
            </IonItem>

            <IonItem >
                <IonLabel>Attach Photo of ID
                </IonLabel>
                <IonButton fill="clear">Choose File</IonButton>
            </IonItem>

            <div className="indi" >
            <p>Note: We require a government-issued photo ID that shows your name and date of birth (e.g driver’s license, passport or national identification card) or official business documents (tax filing, recent utility bill, article or incorporation) in order to review your request.</p>
            </div>

            <div className="signin">
      <IonButton className="applybutton" expand="block" color="warning" > <p className="signbutton"> Apply </p> </IonButton>
      </div>
      </IonContent>
    </IonPage>
  );
};

export default Verification;