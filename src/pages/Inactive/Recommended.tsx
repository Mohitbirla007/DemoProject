import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardSubtitle, IonCardTitle, IonItem, IonIcon, IonButton, IonImg, IonList, IonSlide, IonSlides, IonItemGroup } from '@ionic/react';
import { star, chevronBack } from 'ionicons/icons';
import './Recommended.css';

const Recommended: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recommended</IonTitle>
          <IonButton href="/explore" fill="clear" slot="start"><IonIcon icon={chevronBack} color="danger" /></IonButton>
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

export default Recommended;