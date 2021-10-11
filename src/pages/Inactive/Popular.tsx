import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonSearchbar, IonThumbnail, IonImg, IonList, IonSlide, IonSlides, IonItemGroup, IonText } from '@ionic/react';
import { pin, wifi, wine, warning, walk, star, videocam, videocamOutline, searchCircleOutline, search, musicalNoteOutline, musicalNotesOutline, cameraOutline, chevronBack } from 'ionicons/icons';
import './Popular.css';

const Popular: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Popular</IonTitle>
          <IonButton fill="clear" slot="start"><IonIcon icon={chevronBack} color="danger" /></IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonSlides>
          <IonSlide>
            <IonCard>
              <IonList>
            <IonItemGroup>
                <IonItem>
                  <IonImg src='http://placekitten.com/g/200/300' />
                </IonItem>
                <div></div>
                <IonCardTitle>Lori Grey</IonCardTitle>
                <div></div>
                <IonCardSubtitle>Fashion Model</IonCardSubtitle>
                <div></div>
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
              </IonItemGroup>
              </IonList>
            </IonCard>
            <IonCard>
              <IonList>
            <IonItemGroup>
                <IonItem>
                  <IonImg src='http://placekitten.com/g/200/300' />
                </IonItem>
                <div></div>
                <IonCardTitle>Lori Grey</IonCardTitle>
                <div></div>
                <IonCardSubtitle>Fashion Model</IonCardSubtitle>
                <div></div>
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
              </IonItemGroup>
              </IonList>
            </IonCard>
              </IonSlide>
            </IonSlides>
            <IonToolbar>
            <h5>Fashion</h5>
            <IonButton fill="clear" slot="end" color="danger">View More</IonButton>
            </IonToolbar>
          <IonSlides>
          <IonSlide>
            <IonCard>
              <IonList>
            <IonItemGroup>
                <IonItem>
                  <IonImg src='http://placekitten.com/g/200/300' />
                </IonItem>
                <div></div>
                <IonCardTitle>Lori Grey</IonCardTitle>
                <div></div>
                <IonCardSubtitle>Fashion Model</IonCardSubtitle>
                <div></div>
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
              </IonItemGroup>
              </IonList>
            </IonCard>
            <IonCard>
              <IonList>
            <IonItemGroup>
                <IonItem>
                  <IonImg src='http://placekitten.com/g/200/300' />
                </IonItem>
                <div></div>
                <IonCardTitle>Lori Grey</IonCardTitle>
                <div></div>
                <IonCardSubtitle>Fashion Model</IonCardSubtitle>
                <div></div>
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
                <IonIcon icon={star} size="small" color="danger" />
              </IonItemGroup>
              </IonList>
            </IonCard>
              </IonSlide>
            </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Popular;