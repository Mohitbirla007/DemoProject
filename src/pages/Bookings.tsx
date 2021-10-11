import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonFooter, IonSearchbar, IonSegment, IonSegmentButton, IonLabel, IonNote, IonAvatar, IonItem, IonBadge, IonCard, IonButton } from '@ionic/react';
import {filterCircleOutline, funnel} from 'ionicons/icons';
import './Bookings.css';

const Bookings: React.FC = () => {
    const [searchText, setSearchText] = useState('');
  return (
    <IonPage>
         <IonHeader>
           <IonToolbar>
             <IonTitle className="title" >Bookings</IonTitle>
           </IonToolbar>
         </IonHeader>
         <IonContent>
         
             <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)} value="Recieved">
               <IonSegmentButton value="Recieved">
                 <IonLabel>Recieved</IonLabel>
               </IonSegmentButton>
               <IonSegmentButton value="Sent">
                 <IonLabel>Sent</IonLabel>
               </IonSegmentButton>
             </IonSegment>
         
         <IonCard className="cardsize">
         <IonItem  lines="none" >
         <IonAvatar slot="start">
                       <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                     </IonAvatar>
           <IonLabel>
             <h2>Sarah Ying</h2>
             <p>2021 Wireless Festival</p>
           </IonLabel>
           <IonBadge color="danger" slot="end">Approved</IonBadge>
         </IonItem>
         </IonCard>
               </IonContent>
             </IonPage>
           );
         };

export default Bookings;
