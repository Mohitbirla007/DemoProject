import React, {useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonCard, IonAvatar, IonNote, IonButtons, IonButton, IonIcon, IonList, IonListHeader } from '@ionic/react';
import { chevronBack, pencil } from 'ionicons/icons';
import './Filter.css';
import { IonRadioGroup } from '@ionic/react';

const Filter: React.FC = () => {
    const [searchText, setSearchText] = useState('');
  return (
  <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Filter</IonTitle>
            <IonButton href="/bookings" fill="clear" slot="start">
              <IonIcon icon={chevronBack} />
            </IonButton>
            <IonButton href="/filter" fill="clear" slot="end">Reset</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonList>
            <IonRadioGroup value="grape">
          <IonListHeader>
            <IonLabel>Sort By</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>Earliest</IonLabel>
            <IonRadio slot="end" color="danger" value="Earliest"></IonRadio>
          </IonItem>

          <IonItem>
            <IonLabel>Latest</IonLabel>
            <IonRadio slot="end" color="danger" value="Latest"></IonRadio>
          </IonItem>

          <IonItem>
            <IonLabel>Price Low - High</IonLabel>
            <IonRadio slot="end" color="danger" value="Price Low - High"></IonRadio>
          </IonItem>

          <IonItem>
            <IonLabel>Price High - Low</IonLabel>
            <IonRadio slot="end" color="danger" value="Price High - Low"></IonRadio>
          </IonItem>
        </IonRadioGroup>
            <IonList>
            <IonListHeader>Status</IonListHeader>
            <IonItem>
            <IonLabel>Booking Request</IonLabel>
            <IonCheckbox color="primary" slot="end" value="Booking Request"></IonCheckbox>
            </IonItem>
            <IonItem>
            <IonLabel>Booking Approved</IonLabel>
            <IonCheckbox color="primary" slot="end"></IonCheckbox>
            </IonItem>
            <IonItem>
            <IonLabel>Booking Paid</IonLabel>
            <IonCheckbox color="primary" slot="end"></IonCheckbox>
            </IonItem>
            <IonItem>
            <IonLabel>Booking Cancelled</IonLabel>
            <IonCheckbox color="primary" slot="end"></IonCheckbox>
            </IonItem>
            </IonList>
            <IonList>
            <IonListHeader>Services</IonListHeader>
            <IonItem>
            <IonLabel>Video</IonLabel>
            <IonCheckbox color="primary" slot="end"></IonCheckbox>
            </IonItem>
            <IonItem>
            <IonLabel>Modelling</IonLabel>
            <IonCheckbox color="primary" slot="end"></IonCheckbox>
            </IonItem>
            <IonItem>
            <IonLabel>Music</IonLabel>
            <IonCheckbox color="primary" slot="end"></IonCheckbox>
            </IonItem>
            <IonItem>
            <IonLabel>Acting</IonLabel>
            <IonCheckbox color="primary" slot="end"></IonCheckbox>
            </IonItem>
            </IonList>
            </IonList>
            <IonButton  expand="block">Apply</IonButton>
    </IonContent>
    </IonPage>
  );
};

export default Filter;