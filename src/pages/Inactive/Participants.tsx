import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonCard, IonItemSliding, IonItem, IonAvatar, IonLabel, IonNote, IonItemOptions, IonItemOption, IonFooter, IonAlert } from '@ionic/react';
import { chevronBack, personAddOutline } from 'ionicons/icons';
import './Participants.css';

const Tab5: React.FC = () => {
    const [showAlert1, setShowAlert1] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle className="title" >Message Details</IonTitle>
            <IonButton href="/conversation" slot="start" fill="clear">
              <IonIcon icon={chevronBack} />
            </IonButton>
            <IonButton className="participantsicon" color="warning" href="/addparticipants" slot="end" fill="clear">
              <IonIcon icon={personAddOutline} />
            </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

      <IonCard className="firstcard">
        <IonItemSliding>
          <IonItem>
          <IonAvatar slot="start">
            <img src="./avatar-finn.png" />
          </IonAvatar>
            <IonLabel>
            <h2>Mathew Thomas</h2>
            <p>BBC Production Director</p>
            </IonLabel>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption onClick={() => {}}>Mute</IonItemOption>
            <IonItemOption color="danger" onClick={() => {}}>Delete</IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
     </IonCard>
     <IonCard className="secondcard" >
        <IonItemSliding>
          <IonItem>
          <IonAvatar slot="start">
            <img src="./avatar-finn.png" />
          </IonAvatar>
            <IonLabel>
            <h2>Sarah Ying</h2>
            <p>BBC Coordinator</p>
            </IonLabel>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption onClick={() => {}}>Mute</IonItemOption>
            <IonItemOption color="danger" onClick={() => {}}>Delete</IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
     </IonCard>
     <IonCard className="secondcard" >
        <IonItemSliding>
          <IonItem>
          <IonAvatar slot="start">
            <img src="./avatar-finn.png" />
          </IonAvatar>
            <IonLabel>
            <h2>Diana Brown</h2>
            <p>BBC Assistant Director</p>
            </IonLabel>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption onClick={() => {}}>Mute</IonItemOption>
            <IonItemOption color="danger" onClick={() => {}}>Delete</IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
     </IonCard>
      </IonContent>
            <IonFooter>
            <IonToolbar>
                <IonButton onClick={() => setShowAlert1(true)} slot="start" fill="clear">Leave Chat</IonButton>
            <div></div>
                <IonButton onClick={() => setShowAlert2(true)} slot="end" fill="clear">End Chat</IonButton>
                <IonAlert
      isOpen={showAlert1}
      onDidDismiss={() => setShowAlert1(false)}
      cssClass='my-custom-class'
      header={'Leave Chat'}
      message={'You will not receieve messages from this group unless someone aadds you to the conversation again.'}
      buttons={['Cancel', 'Leave Chat']}
    />
    
    <IonAlert
      isOpen={showAlert2}
      onDidDismiss={() => setShowAlert2(false)}
      cssClass='my-custom-class'
      header={'End Chat'}
      message={'This will remove everyone, including you, from the group.'}
      buttons={['Cancel', 'End Chat']}
    />
            </IonToolbar>
            </IonFooter>   
    </IonPage>
  );
};

export default Tab5;