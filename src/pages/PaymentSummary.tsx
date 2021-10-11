import React from 'react';
import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './PaymentSummary.css';
import { chevronBack } from 'ionicons/icons';
import { Link } from 'react-router-dom';

const PaymentSummary: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title" > Approval Summary</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="indi" >
        <p>Agreement and confirmation to be emailed to blessmore-ncube@hotmail.com and we'll nofity you when your order is confirmed.</p>
        </div>

        <IonItem className="indisummary">
              <IonLabel>Status
                  <p>C379784769</p>
                  <IonText color="danger">
                  <p>Approved</p>
                  </IonText>
              </IonLabel>
          </IonItem>
              
              <IonItem className="indisummary">
              <IonLabel>Total Amount
                  <p>£4000</p>
                  <IonLabel> Deposit</IonLabel>
                  <p>50%</p>
              </IonLabel>
              </IonItem>

          <IonItem className="indisummary">
              <IonLabel> Payment Term
                <p>Net 14</p>
              </IonLabel>
          </IonItem>

          <IonItem className="indisummary">
              <IonLabel>Cancellation
                  <p>7 days</p>
              </IonLabel>
          </IonItem>

              <IonItem className="indisummary">
              <IonLabel>Due
                  <p>£2000</p>
              </IonLabel>
          </IonItem>

      <IonItem className="checkbox" lines="none">
      <IonCheckbox className="checkbox2"  color="warning" /> 
      <p className="confirm" >Confirm if you Read and accept the <  Link to="/agreement"  className="signup1"  >agreement</Link>.</p>
      </IonItem>
  

       <div className="blockfour">
      <IonButton  color="warning"  expand="block"> <p className="signbutton" > Confirm </p></IonButton>
       </div>
      </IonContent>
    </IonPage>
  );
};

export default PaymentSummary;