import React, {useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonCard, IonAvatar, IonNote, IonButtons, IonButton, IonIcon, IonList, IonListHeader, IonInput } from '@ionic/react';
import { chevronBack, pencil, star, starOutline } from 'ionicons/icons';
import './Filter.css';
import './AddReview.css';
import { IonRadioGroup } from '@ionic/react';

const Filter: React.FC = () => {
    const [searchText, setSearchText] = useState('');
  return (
  <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title">Add Review</IonTitle>

            <IonButton fill="clear" slot="start">
              <IonIcon icon={chevronBack} />
            </IonButton>
            <IonButton fill="clear" color="warning" slot="end">Reset</IonButton>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className="star">
        <IonToolbar>
        <IonButton fill="clear" className="star1"  color="warning"><IonIcon slot="icon-only" icon={starOutline} /></IonButton>
        <IonButton fill="clear" className="star1" color="warning"><IonIcon slot="icon-only" icon={starOutline} /></IonButton>
        <IonButton fill="clear" className="star1"color="warning"><IonIcon slot="icon-only" icon={starOutline} /></IonButton>
        <IonButton fill="clear" className="star1"color="warning"><IonIcon slot="icon-only" icon={starOutline} /></IonButton>
        <IonButton fill="clear" className="star1"color="warning"><IonIcon slot="icon-only" icon={starOutline} /></IonButton>
        </IonToolbar>
        </div>
        <h5 className="rating">Select number of rating stars</h5>

        <IonCard class="ion-padding">
            <IonInput>
                
            </IonInput>
            <IonNote>
                0/500
            </IonNote>
          </IonCard>


        </IonContent>
    </IonPage>
  );
};

export default Filter;