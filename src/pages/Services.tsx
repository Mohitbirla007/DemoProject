import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonCard, IonItem, IonImg, IonFabButton } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import './Services.css';

const Services: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title">Services</IonTitle>
          <IonButtons slot="start">
            <IonButton  href="/profile" >
              <IonIcon icon={chevronBack} />
            </IonButton>
            </IonButtons>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

              <IonImg src='/assets/appearance.png' />

               <IonImg className="tourimg" src='/assets/tour.png' />

               <IonImg className="tourimg" src='/assets/music.video.png' />

              <div className="appearancetitle" >
              <p>Appearance</p>
              </div>

              <p className="tourtitle" >Tour</p>

              <p className="mvtitle" >Music Video</p>
              
         
      </IonContent>
    </IonPage>
  );
};

export default Services;