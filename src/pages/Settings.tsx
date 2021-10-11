import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonList, IonItem, IonLabel, IonFooter, IonAlert } from '@ionic/react';
import { chevronBack, personAddOutline, ribbonOutline, cardOutline, notificationsOutline, calendarOutline, gridOutline, peopleOutline, shieldOutline, lockClosedOutline, helpOutline, personOutline, gitNetworkOutline, starOutline, shareSocialOutline } from 'ionicons/icons';
import './Settings.css';
import { auth } from '../firebaseConfig';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';


const Settings: React.FC = () => {
  const [showAlert1, setShowAlert1] = useState(false);
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title" >Settings</IonTitle>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <IonButton fill="clear" slot="start">
              <IonIcon icon={chevronBack} />
            </IonButton>
          </Link>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <Link to="/payment" style={{ textDecoration: "none" }}>
            <IonItem>
              <IonLabel>Payment</IonLabel>
              <IonIcon slot="start" icon={cardOutline} />
            </IonItem>
          </Link>
          <Link to="/notificationssettings" style={{ textDecoration: "none" }}>
            <IonItem>
              <IonLabel>Notifications</IonLabel>
              <IonIcon slot="start" icon={notificationsOutline} />
            </IonItem>
          </Link>
          <Link to="/Availabilty" style={{ textDecoration: "none" }}>
            <IonItem>
              <IonLabel>Availabilty</IonLabel>
              <IonIcon slot="start" icon={calendarOutline} />
            </IonItem>
          </Link>
          <Link to="/security" style={{ textDecoration: "none" }}>
            <IonItem>
              <IonLabel>Security</IonLabel>
              <IonIcon slot="start" icon={shieldOutline} />
            </IonItem>
          </Link>
          <Link to="/tutorial" style={{ textDecoration: "none" }}>
            <IonItem>
              <IonLabel>Help</IonLabel>
              <IonIcon slot="start" icon={helpOutline} />
            </IonItem>
          </Link>
          <Link to="/policies" style={{ textDecoration: "none" }}>
            <IonItem>
              <IonLabel>Policies</IonLabel>
              <IonIcon slot="start" icon={lockClosedOutline} />
            </IonItem>
          </Link>
        </IonList>
      </IonContent>
      <IonFooter  >
        <IonToolbar>
          <IonButton className="logout" onClick={() => setShowAlert1(true)} slot="start" fill="clear">Log Out</IonButton>
          <IonAlert
            isOpen={showAlert1}
            onDidDismiss={() => setShowAlert1(false)}
            cssClass='my-custom-class'
            header={'Log Out'}
            message={'Are you sure you want to log out.'}
            /* buttons={['Cancel', 'Log Out']} */
            buttons={[
              {
                text: 'Cancel',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              },
              {
                text: 'Log Out',
                handler: () => {
                  auth.signOut();
                  history.push('/login')
                }
              }
            ]}
          />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Settings;