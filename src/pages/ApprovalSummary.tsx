import React from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './ApprovalSummary.css';
import { chevronBack } from 'ionicons/icons';

const ApprovalSummary: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title">Approval Summary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

           <div className="indi">
          <p>Agreement and confirmation to be emailed to blessmore-ncube@hotmail.com and we'll notify you when your  is confirmed.</p>
          </div>

          <IonItem className="indisummary">
              <IonLabel>Status
                  <p>C379784769</p>
                  <IonText color="warning">
                  <p>Request</p>
                  </IonText>
              </IonLabel>
          </IonItem>
              
              <IonItem className="indisummary">
              <IonLabel>Event
                  <p>BBC One Interview</p>
                  <p>Monday 3 August 2021</p>
                  <p>20:00 -21:00 PM</p>
              </IonLabel>
              </IonItem>

          <IonItem className="indisummary">
              <IonLabel> Location
                <p>BBC Studios London</p>
              <p slot="end">Portland Place, London, W1A 1AA</p>
              </IonLabel>
          </IonItem>

          <IonItem className="indisummary">
              <IonLabel>Attached File
                  <p>Louise Show.pdf</p>
              </IonLabel>
          </IonItem>

              <IonItem className="indisummary">
              <IonLabel>Guest
                  <p>Laura Silva</p>
                  <p>Jarvis Friday</p>
              </IonLabel>
          </IonItem>

          <div className="blocktwo">
      <IonButton href="/bookings" expand="block" color="warning" > <p className="signbutton"> Approve </p> </IonButton>
      </div>

      <div className="cancelbuttontwo" >
      <IonButton  expand="block"  fill="clear"> <p className="cancel">Decline</p></IonButton>
      </div>

      </IonContent>
      
    </IonPage>
  );
};

export default ApprovalSummary;