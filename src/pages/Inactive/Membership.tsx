import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonList, IonItem, IonLabel, IonFooter, IonAlert, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent } from '@ionic/react';
import { chevronBack, personAddOutline, ribbonOutline, cardOutline, notificationsOutline, calendarOutline, gridOutline, peopleOutline, shieldOutline, lockClosedOutline, helpOutline, personOutline, videocamOutline } from 'ionicons/icons';
import './Membership.css';

const slideOpts = {
    initialSlide: 1,
    speed: 400
  };

const Membership: React.FC = () => {
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle className="title">Membership</IonTitle>
        <IonButton href="/settings" fill="clear" slot="start">
          <IonIcon icon={chevronBack} />
        </IonButton>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen >
        <IonCard text-center class="clientcard">
        <img className="clientimg" src="/assets/client.png" />

            <div className="clienttitle"  >
            <h1  >Client</h1>
            <IonCardSubtitle>For anyone seeking artists and creatives</IonCardSubtitle>
            <IonCardSubtitle className="free" color="warning">Free</IonCardSubtitle>
            </div>
        </IonCard>


        <IonCard className="professionalcard">
        <img className="clientimg" src="/assets/professional.png" />
            
            <div className="clienttitle" >
            <h1 slot="end">Professional</h1>
            <IonCardSubtitle>For anyone seeking artists and creatives</IonCardSubtitle>
            <IonCardSubtitle className="free" color="warning">GBP9.99</IonCardSubtitle>
            <IonCardSubtitle className="additonaltitle" color="success">per month renews automatically</IonCardSubtitle>
            </div>
        </IonCard>

        <IonCard className="professionalcard" >
            <img className="teamimg" src="/assets/team.png" />
          
            <div className="clienttitle" >
            <h1 slot="end">Team</h1>
            <IonCardSubtitle>For anyone seeking artists and creatives</IonCardSubtitle>
            <IonCardSubtitle className="free"  color="warning">GBP49.99</IonCardSubtitle>
            <IonCardSubtitle className="additonaltitle"  color="success">per month renews automatically</IonCardSubtitle>
            </div>
            </IonCard>

            <p className="learnmore" > Learn more about membership in show </p>
    </IonContent>
    </IonPage>
  );
};

export default Membership;