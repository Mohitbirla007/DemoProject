import React, { useState } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonPage, IonItemDivider, IonTextarea, IonButton, IonIcon, IonSlide, IonSlides, IonInput, IonDatetime, IonSelect, IonSelectOption, IonCard } from '@ionic/react';
import './Test.css';
import { arrowBack } from 'ionicons/icons';

export const Test: React.FC = () => {
    const [text, setText] = useState<string>();
    const [selected, setSelected] = useState<string>('');
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
        <IonTitle>Service Booking</IonTitle>
      <IonButton fill="clear" slot="start"><IonIcon icon={arrowBack} /></IonButton>
    </IonToolbar>
    </IonHeader>
  <IonContent class="ion-padding">
      <IonSlides>
        <IonSlide>
      <div className="slide">
            <img src="/assets/dancing-man-among-crowd-2820898.jpg"/>
      </div>
        </IonSlide>
        <IonSlide>
      <div className="slide">
            <img src="/assets/dancing-man-among-crowd-2820898.jpg"/>
      </div>
        </IonSlide>
      </IonSlides>

      <div>
        <h1>Apperance</h1>
        <h5 color="Medium">with Mike Rock</h5>
      </div>
      <IonCard class="ion-padding">
      <p>Mike Rock is a British singer and songwriter. 
In 2020 mike  achieved over 90millio streams on Spotify, securing his debut album the 20th 
spot on the UK Top forty.

He performed a freestyle at the 2016 HBAA wards, calling out the government  for their  perceived in  action in the aftermath of shutting down 500 youth centres across the country the previous year.</p>
      </IonCard>
      <IonLabel>
        <IonItem>
        <IonLabel>Package</IonLabel>
        <IonSelect interface="popover" value={selected} onIonChange={e => setSelected(e.detail.value)}>
            <IonSelectOption value="£8,000/hr">Full Package</IonSelectOption>
            <IonSelectOption value="£6,000/hr">Premium</IonSelectOption>
            <IonSelectOption value="£4,000/hr">Standard</IonSelectOption>
            <IonSelectOption value="£2,000/hr">Basic</IonSelectOption>
          </IonSelect>
          </IonItem>
          <IonItem>
              <IonLabel>Fee</IonLabel>
              {selected ?? '(none selected'}
        </IonItem>
        <IonItemDivider></IonItemDivider>
        <IonItem>
          <IonLabel>Date</IonLabel>
          <IonDatetime value="1990-02-19" placeholder="Select Date"></IonDatetime>
        </IonItem>
        <IonItem>
          <IonLabel>Time</IonLabel>
          <IonDatetime display-format="h:00 A" picker-format="h A" value="1990-02-19T07:43Z"></IonDatetime>
        </IonItem>
        <IonItemDivider></IonItemDivider>
        <IonItem>
          <IonInput placeholder="Event Name"></IonInput>
        </IonItem>
        <IonItem>
          <IonInput placeholder="Location"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Attach Document</IonLabel>
          <IonDatetime placeholder="Choose File"></IonDatetime>
        </IonItem>
        <IonItem>
          <IonLabel>Guests</IonLabel>
          <IonSelect interface="popover" value={selected} onIonChange={e => setSelected(e.detail.value)}>
            <IonSelectOption value="Erykah Silva">Erykah Silva</IonSelectOption>
            <IonSelectOption value="Diana Brown">Diana Brown</IonSelectOption>
            <IonSelectOption value="Matthew Thomas">Matthew Thomas</IonSelectOption>
            <IonSelectOption value="Sarah Pascal">Sarah Pascal</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonLabel>
    </IonContent>
    </IonPage>
  );
};

export default Test;