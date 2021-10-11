import React, {useState} from 'react';
import {  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon, IonNote, IonSearchbar, IonAvatar, IonFab, IonFabButton, IonCard, IonButton, IonAlert } from '@ionic/react';
import { calendar, map, heart, trash, star, archive, ellipsisHorizontal, ellipsisVertical, } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Schedule.css';
import {filterCircleOutline, funnel} from 'ionicons/icons';

const Schedule: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [showAlert1, setShowAlert1] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    return (
  <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title" >Schedule</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonSearchbar className="searchbar"  value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
    
    <h5 className="suggested" >Today</h5>
    
    <IonList>
    <IonCard className="schedulecard" >
      {/* Multi-line sliding item with icon options on both sides */}
      <IonItemSliding id="item100">
        <IonItem lines="none" href="#">
          <IonLabel>
            <h2>BBC ONE Interview</h2>
            <p>19:30 PM - 21:30PM</p>
            <IonAvatar>
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar>
            <p>Finsbury Park, London, N4 1EE</p>
          </IonLabel>
          <IonNote slot="end">
            10:45 AM
          </IonNote>
        </IonItem>
          <IonItemOptions side="end">
            <IonItemOption onClick={() => setShowAlert1(true)} color="danger">
              <IonIcon slot="icon-only" icon={calendar} />
            </IonItemOption>
            <IonItemOption onClick={() => setShowAlert2(true)} color="success">
              <IonIcon slot="icon-only" icon={map} />
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
        </IonCard>
    </IonList>

    <h5 className="suggested" >This Week</h5>

    <IonList>
    <IonCard className="schedulecard" >
      {/* Multi-line sliding item with icon options on both sides */}
      <IonItemSliding id="item100">
        <IonItem lines="none" href="#">
          <IonLabel>
            <h2>BBC ONE Interview</h2>
            <p>19:30 PM - 21:30PM</p>
            <IonAvatar>
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar>
            <p>Finsbury Park, London, N4 1EE</p>
          </IonLabel>
          <IonNote slot="end">
            10:45 AM
          </IonNote>
        </IonItem>
          <IonItemOptions side="end">
            <IonItemOption onClick={() => setShowAlert1(true)} color="danger">
              <IonIcon slot="icon-only" icon={calendar} />
            </IonItemOption>
            <IonItemOption onClick={() => setShowAlert2(true)} color="success">
              <IonIcon slot="icon-only" icon={map} />
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
        </IonCard>
    </IonList>

    <IonList>
    <IonCard className="schedulecardtwo" >
      {/* Multi-line sliding item with icon options on both sides */}
      <IonItemSliding id="item100">
        <IonItem lines="none" href="#">
          <IonLabel>
            <h2>BBC ONE Interview</h2>
            <p>19:30 PM - 21:30PM</p>
            <IonAvatar>
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar>
            <p>Finsbury Park, London, N4 1EE</p>
          </IonLabel>
          <IonNote slot="end">
            10:45 AM
          </IonNote>
        </IonItem>
          <IonItemOptions side="end">
            <IonItemOption onClick={() => setShowAlert1(true)} color="danger">
              <IonIcon slot="icon-only" icon={calendar} />
            </IonItemOption>
            <IonItemOption onClick={() => setShowAlert2(true)} color="success">
              <IonIcon slot="icon-only" icon={map} />
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
        </IonCard>
    </IonList>

    <IonAlert
      isOpen={showAlert1}
      onDidDismiss={() => setShowAlert1(false)}
      cssClass='my-custom-class'
      header={'Open maps with'}
      message={'Google'}
    />
    
    <IonAlert
      isOpen={showAlert2}
      onDidDismiss={() => setShowAlert2(false)}
      cssClass='my-custom-class'
      header={'Open calendar with'}
      message={'Google'}
    />

      </IonContent>
    </IonPage>
  );
};

export default Schedule;
