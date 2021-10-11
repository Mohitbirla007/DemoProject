import React from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Agreement.css';
import { chevronBack } from 'ionicons/icons';

const Agreement: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title"> Agreement </IonTitle>
          <IonButton href="/paymentsummary" fill="clear" slot="start">
              <IonIcon icon={chevronBack} />
            </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="indi">
          <h5>Please read the agreement carefully. By clicking to accept or agree to this contract, you accept and agree to be bound and abide by these Terms.</h5>
          <h5>1.1 Service Date</h5>
          <p>Friday 10th February 2021</p>
          <p>20:00 - 21:00pm</p>
          <h5>1.2 Service Decription</h5>
          <p>BBC One TV Appearance</p>
          <p>Portaland Place, London, W1A 1AA</p>
          <h5>1.3 Total Fee</h5>
          <p>£8,000</p>
          <h5>1.4 Fee Upfront</h5>
          <p>£4,000</p>
          <h5>1.5 Agreement</h5>
          <p>This Service Agreement (“Agreement”) is being made between The Client (that’s “You” or “Your”) and The Service Provider (that’s “We” or “Our”). The Client and Service Provider may also be referred to as “Party” or together as the “Parties”.  This Agreement will become effective on [Month DD, 20YY] (“Effective Date”).</p>
          <p>The Service Provider has agreed to provide services to The Client on the terms and conditions set out in this Agreement, while the Client is of the opinion that the Service Provider has the proper and necessary qualifications, experience, and abilities to provide services to The Client.</p>
          <p>Therefore in consideration of the matters described above, the receipt and sufficiency of which consideration is hereby acknowledged, The Client and The Service Provider agree as follows:</p>
          <h5>1.6 Cancellation</h5>
          <p>The Client may cancel this Agreement at any time. If the Client cancels up to __ days prior to the agreed Event Date, they will be entitled to a full refund.</p>
          <p>If The Client cancels up to __ days prior to the agreed Event Date, they will be entitled to a fifty percent (50%) refund. </p>
          <p>If The Client cancels less than __ days prior to the agreed Event Date, they will not be entitled to a refund.</p>
          <h5>1.7 Refund</h5>
          <p>The Service Provider may cancel this Agreement at any time. If The Service Provider cancels, they must provide a suitable replacement Service Provider, subject to Client’s approval, which shall be obtained in writing. In the alternative, the original Service Provider shall refund all monies previously paid by Client, with the exception of any non-refundable deposits, which were agreed to by Client.</p>
          </div>
      
      </IonContent>
    </IonPage>
  );
};

export default Agreement;