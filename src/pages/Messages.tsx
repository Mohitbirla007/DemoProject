import React, {useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonList, IonItem, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonCard, IonAvatar, IonNote, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { addOutline, pencil } from 'ionicons/icons';
import './Messages.css';

const Messages: React.FC = () => {
    const [searchText, setSearchText] = useState('');
  return (
  <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title" >Messages</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonSearchbar className="searchbar" value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>

      {/*-- List of Sliding Items --*/}
      <IonList>

      <h6 className="suggested">Messages</h6>
    <IonCard className="director" >
        <IonItemSliding>
          <IonItem lines="none" >
          <IonAvatar slot="start">
            <img src="./avatar-finn.png" />
          </IonAvatar>
            <IonLabel>
            <h2>Finn</h2>
            <p>Listen, I've had a pretty messed up day...</p>
            </IonLabel>
            <IonNote slot="end">
              10:45 AM
            </IonNote>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption color="danger" onClick={() => {}}>Mute</IonItemOption>
                        <IonItemOption className="messagedelete" color="warning" onClick={() => {}}>Delete</IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
     </IonCard>
      </IonList>
    </IonContent>
    </IonPage>
  );
};

export default Messages;