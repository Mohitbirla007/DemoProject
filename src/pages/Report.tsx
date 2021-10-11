import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonList, IonItem, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonCard, IonAvatar, IonNote, IonButtons, IonButton, IonIcon, IonRadioGroup, useIonViewDidEnter } from '@ionic/react';
import { checkmarkCircle, chevronBack } from 'ionicons/icons';
import './Report.css';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const Report: React.FC = () => {
  const [selected, setSelected] = useState<string>('');
  const location: any = useLocation();
  const [username, setusername] = useState('');


  useIonViewDidEnter(async () => {
    console.log(location.state.username);
    setusername(location.state.username)
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title">Report</IonTitle>
          <IonButtons slot="start">
            <Link to={{ pathname: "/viewprofile/" + "" + username, state: { username: username,fromWhere:"report" } }} style={{ textDecoration: "none" }}><IonButton >
              <IonIcon icon={chevronBack} />
            </IonButton>
            </Link>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h5 className="deleteheader">Why are you reporting this account?</h5>

        <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)} >

          <IonCard className="firstcard1">
            <IonItem lines="none" >
              <IonLabel>
                <h2>It's a spam</h2>
              </IonLabel>
              <IonRadio slot="end" color="warning" value="Mike Rock"></IonRadio>
            </IonItem>
          </IonCard>

          <IonCard className="secondcard">
            <IonItem lines="none" >
              <IonLabel>
                <h2>It's inapropriate</h2>
              </IonLabel>
              <IonRadio slot="end" color="warning" value="Motion Music"></IonRadio>
            </IonItem>
          </IonCard>
        </IonRadioGroup>

        <div className="blocktwo">
          <IonButton expand="block" color="warning" > <p className="signbutton"> Send </p> </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Report;