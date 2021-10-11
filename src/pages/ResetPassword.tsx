import React, { useState, useEffect }  from 'react';
import { Link, useHistory } from 'react-router-dom'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonThumbnail, IonImg, IonLabel, IonItem, IonFab, IonFabButton, IonIcon, IonFabList, IonAvatar, IonInput, IonButton, useIonViewDidEnter } from '@ionic/react';
import './ResetPassword.css';
import { toast } from '../toast';
import { lockClosed, mailOutline } from 'ionicons/icons';
import { selectUser } from '../reducer/User/userSlice';
import { useSelector } from 'react-redux';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const history = useHistory();   // FOR NAVIGATION
  const user = useSelector(selectUser); // REDUX USER-REDUCER SELECTOR

  useIonViewDidEnter(() => {
    if (user) {
      history.push("/explore");
    }
  })

  return (
    <IonPage>
     <IonContent>
        <div className="logo">
        <img src="/assets/INDI_transparent V2.png" />  
        </div>
       
    <h3 className="login"> Reset Password</h3>  
    <p className="reset" >Enter your new password and confirm to reset.</p>


       <IonItem className="padding">
       <IonIcon className="lockclosed" icon={lockClosed} slot="start" />  
    
      <IonInput className="namea"
       placeholder=" New Password"
      onIonChange={(e: any) => setPassword(e.target.value)} />
      </IonItem>

      <IonItem className="padding">
       <IonIcon className="lockclosed" icon={lockClosed} slot="start" />  

      <IonInput className="nameb"
      placeholder="Confirm New Password"
      onIonChange={(e: any) => setCPassword(e.target.value)}/>
       </IonItem>
  
       <div className="block">
      <IonButton  expand="block" color="warning" > <p className="signbutton"> Confirm </p> </IonButton>
      </div>
       
       <div className="cancelbutton" >
      <IonButton  href="cover" expand="block"  fill="clear"> <p className="cancel">Cancel</p></IonButton>
      </div>
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;