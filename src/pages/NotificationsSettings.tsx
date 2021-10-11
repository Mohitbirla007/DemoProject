import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonList, IonItem, IonLabel, IonToast, IonListHeader, IonToggle } from '@ionic/react';
import { chevronBack, chatboxEllipsesOutline, linkOutline, alarmOutline, alertCircleOutline, mailOutline, volumeHighOutline } from 'ionicons/icons';
import './NotificationsSettings.css';
import { Link } from 'react-router-dom';


const NotificationsSettings: React.FC = () => {
  const [showToast1, setShowToast1] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notifications Settings</IonTitle>
          <Link to="/settings" style={{ textDecoration: "none" }}>
            <IonButton fill="clear" slot="start">
              <IonIcon icon={chevronBack} />
            </IonButton>
          </Link>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Push Notifications</IonLabel>
            <IonToggle slot="end" name="bookings" color="danger" checked></IonToggle>
            <IonIcon slot="start" icon={alertCircleOutline} />
          </IonItem>
          <IonItem>
            <IonLabel>Sound Notifications</IonLabel>
            <IonToggle slot="end" name="bookings" color="danger" checked></IonToggle>
            <IonIcon slot="start" icon={volumeHighOutline} />
          </IonItem>
          <IonItem>
            <IonLabel>Email Notifications</IonLabel>
            <IonToggle slot="end" name="bookings" color="danger" checked></IonToggle>
            <IonIcon slot="start" icon={mailOutline} />
          </IonItem>
        </IonList>


      </IonContent>
    </IonPage>
  );
};

export default NotificationsSettings;