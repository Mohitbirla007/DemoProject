import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonCard, IonTextarea, IonAlert, IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/react';
import { chevronBack} from 'ionicons/icons';
import './RemoveAccount.css';


const RemoveAccount: React.FC = () => {
    const [text, setText] = useState<string>();
    const [showAlert1, setShowAlert1] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [selected, setSelected] = useState<string>('');
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle className="title" >Remove Account</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
        <h5 className="deleteheader">Please let us know the reason, why you have decide to take a break.</h5>
        <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>

          <IonCard className="firstcard">
          <IonItem className="paddingtwo" >
            <IonLabel>
            <h2>I need a break</h2>
            </IonLabel>
            <IonRadio slot="end" color="warning" value="Break"></IonRadio>
          </IonItem>
          <IonItem className="paddingtwo" >
            <IonLabel>
            <h2>Having issues working with the app</h2>
            </IonLabel>
            <IonRadio slot="end" color="warning" value="Issues"></IonRadio>
          </IonItem>
          <IonItem className="paddingtwo" >
            <IonLabel>
            <h2>I want a fresh start</h2>
            </IonLabel>
            <IonRadio slot="end" color="warning" value="Fresh"></IonRadio>
          </IonItem>
          <IonItem className="paddingtwo" >
            <IonLabel>
            <h2>I dislike the app</h2>
            </IonLabel>
            <IonRadio slot="end" color="warning" value="Dislike"></IonRadio>
          </IonItem>
          <IonItem className="paddingtwo" lines="none" >
            <IonLabel>
            <h2>Other</h2>
            </IonLabel>
            <IonRadio slot="end" color="warning" value="Other"></IonRadio>
          </IonItem>
     </IonCard>
     </IonRadioGroup>
        <IonCard class="firstcard">
            <IonTextarea placeholder="Enter more information here..." value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
        </IonCard>

        <div className="blockthree">
        <IonButton className="block"  onClick={() => setShowAlert1(true)} expand="block" color="warning"> <p className="signbutton"> Pause Account</p></IonButton>
        </div>
        
        <div className="cancelbuttontwo" >
      <IonButton  expand="block" onClick={() => setShowAlert2(true)} fill="clear"> <p className="cancel">Delete</p></IonButton>
        </div>

        <IonAlert 
      isOpen={showAlert1}
      onDidDismiss={() => setShowAlert1(false)}
      header={'Pause My Account'}
      message={ 'If you would like to keep your account but not be shown to others, you can pause your account instead. You can turn this off in settings .'}
      buttons={['Cancel', 'Pause']}
    />
    
    <IonAlert
      isOpen={showAlert2}
      onDidDismiss={() => setShowAlert2(false)}
      cssClass='my-custom-class'
      header={'Delete My Account'}
      message={'If you delete your account, you will permanently lose your profile, messages, photos and bookings, this action cannot be undone. <div> If you would rather keep your account but not be shown to others, you can pause your account instead.</div> <div><b>Are you sure you want to delete your account?.</b></div>'}
      buttons={['Cancel', 'Delete']}
    />
      </IonContent>
    </IonPage>
  );
};

export default RemoveAccount;