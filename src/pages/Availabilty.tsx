import React, { useState } from 'react';
import { render } from "react-dom";
import Calendar from "react-calendar";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonIcon, IonItem, IonDatetime, IonLabel, IonChip } from '@ionic/react';
import 'react-calendar/dist/Calendar.css';
import { addCircleOutline, chevronBack } from 'ionicons/icons';
import './Availabilty.css';

const Availabilty: React.FC = () => {
    const [date, setDate] = useState(new Date());

    const onChange = () => {
        setDate(date);
    }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title" >Availabilty</IonTitle>
          <IonButton href="/settings" fill="clear" slot="start">
          <IonIcon icon={chevronBack} />
        </IonButton>
        
        <IonButton className="addbutton" href="/unavailabilty" fill="clear" slot="end">
          <IonIcon className="addbuttonsize" color="warning"  icon={addCircleOutline} />
        </IonButton>

        </IonToolbar>
      </IonHeader>
      <IonContent >
          
         <div className="calender" >
         <Calendar  onChange={onChange} value={date} />
         {console.log(date)}
         </div>



         <div  className="container">
        <img className="partialpng" src="/assets/unva.png" />  
        <img className="partialpng"  src="/assets/fully booked.png" />  
        </div>

        <div className="available" >
        <p>Available</p>
        <p>Fully Booked</p>
        </div>

         <IonCard class="setdays" >
             <IonItem className="paddingtwo" > 
                 {date.toString()}
             </IonItem > 

            
             <IonItem className="paddingtwo" >
                 Denist Appointment
                 <IonButton slot="end" fill="clear" >Edit</IonButton>
                 <IonButton slot="end" fill="clear" color="warning">Delete</IonButton>
             </IonItem>
             
             <IonItem lines="none" className="paddingtwo">
                 GP Check up
                 <IonButton slot="end" fill="clear" >Edit</IonButton>
                 <IonButton slot="end" fill="clear" color="warning">Delete</IonButton>
             </IonItem>
         </IonCard>
         <div className="block">
      <IonButton expand="block" color="warning" > <p className="signbutton"> Save </p> </IonButton>
      </div>
      </IonContent>
     
    </IonPage>
  );
};

render(<Availabilty />, document.querySelector("#root"));

export default Availabilty;