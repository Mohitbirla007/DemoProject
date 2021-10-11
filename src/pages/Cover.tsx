import React, { useEffect } from 'react';
import { IonPage, IonButton, IonFab } from '@ionic/react';
import './Cover.css';
import { useHistory } from 'react-router';
import { selectUser } from '../reducer/User/userSlice';
import { useSelector } from 'react-redux';


const Cover: React.FC = () => {
  const history = useHistory();
  const user = useSelector(selectUser); // REDUX USER-REDUCER SELECTOR

  useEffect(() => {
    if (user) {
      history.push("/explore");
    }
  }, [user])

  return (
    <IonPage>
      <div>
        <video width="100%" height="100%" muted autoPlay loop>
          <source src="https://firebasestorage.googleapis.com/v0/b/indi-da614.appspot.com/o/production%20ID_3795655.mp4?alt=media&token=41abceef-019a-4e5a-8e8c-71f5ed5bc439" type="video/mp4" />
        </video>
        {/*       <img src="https://firebasestorage.googleapis.com/v0/b/indi-da614.appspot.com/o/production%20ID_3795655.mp4?alt=media&token=41abceef-019a-4e5a-8e8c-71f5ed5bc439"/> */}
      </div>
      <IonFab vertical="top" horizontal="start" slot="fixed">
        <div>
          <img src="/assets/INDI_transparent V2.png" style={{width:"115px"}}/>
        </div>
        <h1 style={{color:"#FFFFFF",textAlign:"center",marginTop:"0px",background:"#0000008f"}}>INDI</h1>
        </IonFab>
      <IonFab vertical="bottom" horizontal="center" slot="fixed"><IonButton routerLink="/login" color="light" expand="block" fill="clear"><h2>ENTER</h2></IonButton></IonFab>
    </IonPage>
  );
};

export default Cover;