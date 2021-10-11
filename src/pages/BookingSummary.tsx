import React from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './BookingSummary.css';
import { chevronBack } from 'ionicons/icons';

const BookingSummary: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title" >Booking Summary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

          <div className="indi">
          <p>Agreement and confirmation to be emailed to blessmore-ncube@hotmail.com and we'll nofity you when your order is confirmed.</p>
          </div>

          <IonItem className="indisummary">
              <IonLabel>Package
                  <p>Full Package</p>
                  <p>£8,0000</p>
              </IonLabel>
          </IonItem>

          <IonItem className="indisummary" >
              <IonLabel>Event
                  <p>BBC One Interview</p>
                  <p>Monday 3 August 2021</p>
                  <p>20:00 -21:00 PM</p>
              </IonLabel>
               </IonItem >

          <IonItem className="indisummary" >
              <IonLabel> Location
                <p>BBC Studios London</p>
              <p slot="end">Portland Place, London, W1A 1AA</p>
              </IonLabel>
          </IonItem>

          <IonItem className="indisummary" >
              <IonLabel>Attached File
                  <p>Louise Show.pdf</p>
              </IonLabel>
          </IonItem>

          <IonItem className="indisummary" >
              <IonLabel>Guest
                  <p>Laura Silva</p>
                  <p>Jarvis Friday</p>
              </IonLabel>
          </IonItem>
          <div className="blocktwo">
      <IonButton  expand="block" color="warning" > <p className="signbutton"> Send Booking </p> </IonButton>
      </div>

      <div className="cancelbuttontwo" >
      <IonButton href="/bookingprocess" expand="block"  fill="clear"> <p className="cancel">Cancel</p></IonButton>
      </div>


      </IonContent>
  
    </IonPage>
  );
};

export default BookingSummary;