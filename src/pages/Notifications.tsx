import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonList, IonItem, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonCard, IonAvatar, IonNote, IonButtons, IonButton, IonIcon, IonAlert, IonText } from '@ionic/react';
import { chevronBack, pencil, trash } from 'ionicons/icons';
import './Notifications.css';
import { Link } from 'react-router-dom';

const Notifications: React.FC = () => {
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title">Notifications</IonTitle>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <IonButton color="primary" fill="clear" slot="start">
              <IonIcon icon={chevronBack} />
            </IonButton>
          </Link>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h5 className="todaytitle" >Today</h5>

        {/*-- List of Sliding Items --*/}
        <IonList>
          <IonCard className="thirdcard" >
            <IonItemSliding>
              <IonItem lines="none" >
                <IonAvatar slot="start">
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonAvatar>
                <IonLabel>
                  <h2>Louise Smith</h2>
                  <IonText color="warning" >
                    <p>Booking Request</p>
                  </IonText>
                </IonLabel>
                <IonNote slot="end">
                  24m
                </IonNote>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => { }}><IonIcon slot="icon-only" icon={trash} /></IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </IonCard>

          <IonCard className="secondcard" >
            <IonItemSliding>
              <IonItem lines="none" >
                <IonAvatar slot="start">
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonAvatar>
                <IonLabel>
                  <h2>Louise Smith</h2>
                  <IonText color="success">
                    <p>Booking Approved</p>
                  </IonText>
                </IonLabel>
                <IonNote slot="end">
                  2h
                </IonNote>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => { }}><IonIcon slot="icon-only" icon={trash} /></IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </IonCard>
          <h5 className="thisweektitle" >This Week</h5>

          <IonCard className="thirdcard">
            <IonItemSliding>
              <IonItem lines="none" >
                <IonAvatar slot="start">
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonAvatar>
                <IonLabel>
                  <h2>Louise Smith</h2>
                  <p>Booking Completed</p>
                </IonLabel>
                <IonNote slot="end">
                  2d
                </IonNote>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => { }}><IonIcon slot="icon-only" icon={trash} /></IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </IonCard>

          <IonCard className="secondcard" >
            <IonItemSliding>
              <IonItem lines="none" >
                <IonAvatar slot="start">
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonAvatar>
                <IonLabel>
                  <h2>Louise Smith</h2>
                  <p>Rated your service</p>
                </IonLabel>
                <IonNote slot="end">
                  5d
                </IonNote>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => { }}><IonIcon slot="icon-only" icon={trash} /></IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </IonCard>
          <h5 className="thisweektitle" >This Month</h5>


          <IonCard className="thirdcard" onClick={() => setShowAlert1(true)}>
            <IonItemSliding>
              <IonItem lines="none" >
                <IonAvatar slot="start">
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonAvatar>
                <IonLabel>
                  <h2>Louise Smith</h2>
                  <p>Invited you to join team</p>
                </IonLabel>
                <IonNote slot="end">
                  7w
                </IonNote>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => { }}><IonIcon slot="icon-only" icon={trash} /></IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </IonCard>
          <IonCard className="secondcard" >
            <IonItemSliding>
              <IonItem lines="none"  >
                <IonAvatar slot="start">
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonAvatar>
                <IonLabel>
                  <h2>Louise Smith</h2>
                  <IonText color="danger">
                    <p>Booking Declined</p>
                  </IonText>
                </IonLabel>
                <IonNote slot="end">
                  14w
                </IonNote>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => { }}><IonIcon slot="icon-only" icon={trash} /></IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </IonCard>
          <IonCard className="secondcard" onClick={() => setShowAlert2(true)}>
            <IonItemSliding>
              <IonItem lines="none" >
                <IonAvatar slot="start">
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonAvatar>
                <IonLabel>
                  <h2>Louise Smith</h2>
                  <p>Invited you to join team</p>
                </IonLabel>
                <IonNote slot="end">
                  14w
                </IonNote>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => { }}><IonIcon slot="icon-only" icon={trash} /></IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </IonCard>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;