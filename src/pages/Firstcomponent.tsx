import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonTitle } from '@ionic/react';
import './Firstcomponent.css';

const Firstcomponent = () => { 
    const a = 'My first Component';
    return ( 
        <IonContent>
            <IonItem class="ion-padding">
                <IonTitle>{a}</IonTitle>
            </IonItem>
            <IonItem>
                <IonLabel>Mohit </IonLabel>
                <IonLabel>Birla</IonLabel>
            </IonItem>
        </IonContent>
    )
}

export default Firstcomponent;