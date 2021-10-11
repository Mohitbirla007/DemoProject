import React, { useState } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonPage, IonItemDivider, IonTextarea, IonButton, IonIcon, IonSlide, IonSlides, IonInput, IonDatetime, IonSelect, IonSelectOption, IonCard } from '@ionic/react';
import './Unavailabilty.css';
import { chevronBack } from 'ionicons/icons';

const Availabilty: React.FC = () => {
    const [date, setDate] = useState(new Date());

    const onChange = () => {
        setDate(date);
    }
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
        <IonTitle className="title" >Unavailabilty</IonTitle>
    </IonToolbar>
    </IonHeader>
    
  <IonContent>

  <IonCard className="setdaystwo" >
  <IonItem  className="paddingtwo" >
                 {date.toString()}
             </IonItem>
    <IonItem className="paddingthree" >
          <IonInput  placeholder="Reason"></IonInput>
        </IonItem>

        <IonItem className="paddingthree" >
          Start Time
          <IonDatetime slot="end" display-format="h:00 A" picker-format="h A" value="1990-02-19T07:43Z"></IonDatetime>
        </IonItem>

        <IonItem className="paddingthree" >
          <IonLabel>End Time</IonLabel>
          <IonDatetime display-format="h:00 A" picker-format="h A" value="1990-02-19T07:43Z"></IonDatetime>
        </IonItem>

        <IonItem lines="none" className="paddingthree" >
        <IonLabel>Repeat</IonLabel>
        <IonDatetime displayFormat="DDDD" pickerFormat="DDDD" placeholder="Never"></IonDatetime>
        </IonItem>
        </IonCard>

        <div className="block">
      <IonButton href="Availabilty" expand="block" color="warning" > <p className="signbutton"> Save </p> </IonButton>
      </div>
      <div className="cancelbuttontwo" >
      <IonButton href="Availabilty" expand="block"  fill="clear"> <p className="cancel">Cancel</p></IonButton>
      </div>
    </IonContent>
    </IonPage>
  );
};

export default Availabilty;