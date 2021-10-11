import React, {useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonContent, IonCard, IonAvatar, IonNote, IonButton, IonIcon } from '@ionic/react';
import { chevronBack, star, starOutline } from 'ionicons/icons';
import './Reviews.css';

const Reviews: React.FC = () => {
    const [] = useState('');
  return (
  <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title">Reviews</IonTitle>
            <IonButton href="settings" fill="clear" slot="start">
              <IonIcon icon={chevronBack} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>

        <div className="star" >
        <IonToolbar>
        <IonButton fill="clear" color="warning"><IonIcon slot="icon-only" icon={star} /></IonButton>
        <IonButton fill="clear" color="warning"><IonIcon slot="icon-only" icon={star} /></IonButton>
        <IonButton fill="clear" color="warning"><IonIcon slot="icon-only" icon={star} /></IonButton>
        <IonButton fill="clear" color="warning"><IonIcon slot="icon-only" icon={star} /></IonButton>
        <IonButton fill="clear" color="warning"><IonIcon slot="icon-only" icon={starOutline} /></IonButton>
        </IonToolbar>
        </div>

        <h5 className="numberofreviews"  >Rating based on the 369 reviews</h5>

        <IonCard className="firstcard" >
          <IonItem>
          <IonAvatar slot="start">
            <img src="./avatar-finn.png" />
          </IonAvatar>
            <IonLabel>
            <h2>Sarah Ying</h2>
            <p>Wonderful, performance would defienitly recommend it.</p>
            <IonIcon color="warning" icon={star} />
            <IonIcon color="warning" icon={star} />
            <IonIcon color="warning" icon={star} />
            <IonIcon color="warning" icon={star} />
            <IonIcon color="warning" icon={star} />
            </IonLabel>
            <IonNote slot="end">24m</IonNote>
          </IonItem>
        </IonCard>

        <IonCard className="secondcard" >
          <IonItem>
          <IonAvatar slot="start">
            <img src="./avatar-finn.png" />
          </IonAvatar>
            <IonLabel>
            <h2>Kevin Brown</h2>
            <p>Looking forward to the next event.</p>
            <IonIcon color="warning" icon={star} />
            <IonIcon color="warning" icon={star} />
            <IonIcon color="warning" icon={star} />
            <IonIcon color="warning" icon={star} />
            <IonIcon color="warning" icon={star} />
            </IonLabel>
            <IonNote slot="end">2d</IonNote>
          </IonItem>
        </IonCard>
        </IonContent>
    </IonPage>
  );
};

export default Reviews;