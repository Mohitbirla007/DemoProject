import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonSearchbar, IonCard, IonItem, IonAvatar, IonLabel, IonRadio} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import './AddParticipants.css';

const AddParticipants: React.FC = () => {
    const [searchText, setSearchText] = useState('');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle className="title">Add Participants</IonTitle>
            <IonButton href="/participants" slot="start" fill="clear">
              <IonIcon icon={chevronBack} />
            </IonButton>
             
            <IonButton slot="end"  color="warning" fill="clear">Chat
            </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
      <IonSearchbar className="searchbar" value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>

<h6 className="suggested">Suggested</h6>
      <IonCard className="director">
          <IonItem >
          <IonAvatar slot="start">
            <img src="./avatar-finn.png" />
          </IonAvatar>
            <IonLabel >
            <h2>Mathew Thomas</h2>
            <p>BBC Production Director</p>
            </IonLabel>

            <IonRadio slot="end" />
          </IonItem>
     </IonCard>

     <IonCard className="coordinator">
          <IonItem>
          <IonAvatar slot="start">
            <img src="./avatar-finn.png" />
          </IonAvatar>
            <IonLabel>
            <h2>Sarah Ying</h2>
            <p>BBC Coordinator</p>
            </IonLabel>
            <IonRadio slot="end" />
          </IonItem>
     </IonCard>

     <IonCard className="assistant">
          <IonItem>
          <IonAvatar slot="start">
            <img src="./avatar-finn.png" />
          </IonAvatar>
            <IonLabel>
            <h2>Diana Brown</h2>
            <p>BBC Assistant Director</p>
            </IonLabel>
            <IonRadio slot="end" />
          </IonItem>
     </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AddParticipants;