import React, {useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButton, IonIcon, IonSlide, IonSlides } from '@ionic/react';
import { cameraOutline, chevronBack, musicalNotesOutline, videocamOutline } from 'ionicons/icons';
import './Categories.css';

const Categories: React.FC = () => {
    const [] = useState('');
  return (
  <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="cardtitle">Categories</IonTitle>
            <IonButton href="/explore" slot="start" fill="clear" color="primary">
              <IonIcon icon={chevronBack} />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonContent className="card">
        <IonSlides>
            <IonSlide>
            <IonCard text-center >
              <IonButton fill="clear">
                  <IonIcon icon={videocamOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>dfd

            <IonCard text-center >
              <IonButton fill="clear">
                  <IonIcon icon={musicalNotesOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>

            <IonCard text-center >
              <IonButton fill="clear">
                  <IonIcon icon={cameraOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>
            </IonSlide>
            </IonSlides>

            <IonSlides>
            <IonSlide>
            <IonCard text-center class="ion-padding">
              <IonButton fill="clear">
                  <IonIcon icon={videocamOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>
            <IonCard text-center class="ion-padding">
              <IonButton fill="clear">
                  <IonIcon icon={musicalNotesOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>
            <IonCard text-center class="ion-padding">
              <IonButton fill="clear">
                  <IonIcon icon={cameraOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>
            </IonSlide>
            </IonSlides>

            <IonSlides>
            <IonSlide>
            <IonCard text-center class="ion-padding">
              <IonButton fill="clear">
                  <IonIcon icon={videocamOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>

            <IonCard text-center class="ion-padding">
              <IonButton fill="clear">
                  <IonIcon icon={musicalNotesOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>

            <IonCard text-center class="ion-padding">
              <IonButton fill="clear">
                  <IonIcon icon={cameraOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>
            </IonSlide>
            </IonSlides>

            <IonSlides>
            <IonSlide>
            <IonCard text-center class="ion-padding">
              <IonButton fill="clear">
                  <IonIcon icon={videocamOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>

            <IonCard text-center class="ion-padding">
              <IonButton fill="clear">
                  <IonIcon icon={musicalNotesOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>

            <IonCard text-center class="ion-padding">
              <IonButton fill="clear">
                  <IonIcon icon={cameraOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>
            </IonSlide>
            </IonSlides>

            <IonSlides>
            <IonSlide>
            <IonCard text-center class="ion-padding">
              <IonButton fill="clear">
                  <IonIcon icon={videocamOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>

            <IonCard text-center class="ion-padding">
              <IonButton fill="clear">
                  <IonIcon icon={musicalNotesOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>

            <IonCard text-center class="ion-padding">
              <IonButton fill="clear">
                  <IonIcon icon={cameraOutline} size="large" color="danger"/>
              </IonButton>
            </IonCard>
            </IonSlide>
            </IonSlides>

    </IonContent>
    </IonPage>
  );
};

export default Categories;