import React, {useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonList, IonItem, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonCard, IonAvatar, IonNote, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { checkmarkCircle, chevronBack, pencil, personAddOutline } from 'ionicons/icons';
import './Team.css';

const Team: React.FC = () => {
    const [searchText, setSearchText] = useState('');
  return (
  <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title" >Motion Music</IonTitle>
            <IonButton href="settings" color="primary" fill="clear" slot="start">
              <IonIcon icon={chevronBack} />
            </IonButton>

            <IonButton href="" color="warning" fill="clear" slot="end">
              <IonIcon  className="addperson" icon={personAddOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>

      {/*-- List of Sliding Items --*/}
      <IonList>

    <IonCard className="firstcard" >
          <IonItem  >
          <IonAvatar slot="start">
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
          </IonAvatar>
            <IonLabel>
            <h2>Erykah Silva <IonIcon icon={checkmarkCircle} color="secondary" /></h2>
            <p>Music Artist</p>
            </IonLabel>
          </IonItem>
     </IonCard>
      </IonList>
      
      <div className="signin">
      <IonButton className="save" expand="block" color="warning" > <p className="signbutton"> Confirm </p> </IonButton>
      </div>

    </IonContent>
  
    </IonPage>
  );
};

export default Team;