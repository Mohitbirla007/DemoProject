import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonSearchbar, IonThumbnail, IonImg, IonList, IonSlide, IonSlides, IonItemGroup, IonText } from '@ionic/react';
import { pin, wifi, wine, warning, walk, star, videocam, videocamOutline, searchCircleOutline, search, musicalNoteOutline, musicalNotesOutline, cameraOutline, chevronBack } from 'ionicons/icons';
import './Newest.css';

const Newest: React.FC = () => {
  return (
    <IonPage>
    <IonContent>
     
 
    <IonTitle className="newestitle" >Newest</IonTitle>
    <IonButton className="chevronback" fill="clear" ><IonIcon icon={chevronBack} color="primary" /></IonButton>
    
    <IonCard className="londoncardnewest"  >
            <IonImg className="londonnewest" src="/assets/london.png" />
            <h5 className="trendingheadernewest" >Lori Grey</h5>
            <IonCardSubtitle className="trendingcategorynewest" >Fashion Model</IonCardSubtitle>
                <div className="explorestarsnewest" >
                <IonIcon icon={star} size="small" color="warning" />
                <IonIcon icon={star} size="small" color="warning" />
                <IonIcon icon={star} size="small" color="warning" />
                <IonIcon icon={star} size="small" color="warning" />
                <IonIcon icon={star} size="small" color="warning" />
                </div> 
            </IonCard>

   
    <IonCard className="londoncardnewest"  >
            <IonImg className="londonnewest" src="/assets/london.png" />
            <h5 className="trendingheadernewest" >Lori Grey</h5>
            <IonCardSubtitle className="trendingcategorynewest" >Fashion Model</IonCardSubtitle>
                <div className="explorestarsnewest" >
                <IonIcon icon={star} size="small" color="warning" />
                <IonIcon icon={star} size="small" color="warning" />
                <IonIcon icon={star} size="small" color="warning" />
                <IonIcon icon={star} size="small" color="warning" />
                <IonIcon icon={star} size="small" color="warning" />
                </div> 
            </IonCard>

            <IonCard className="londoncardnewest"  >
            <IonImg className="londonnewest" src="/assets/london.png" />
            <h5 className="trendingheadernewest" >Lori Grey</h5>
            <IonCardSubtitle className="trendingcategorynewest" >Fashion Model</IonCardSubtitle>
                <div className="explorestarsnewest" >
                <IonIcon icon={star} size="small" color="warning" />
                <IonIcon icon={star} size="small" color="warning" />
                <IonIcon icon={star} size="small" color="warning" />
                <IonIcon icon={star} size="small" color="warning" />
                <IonIcon icon={star} size="small" color="warning" />
                </div> 
            </IonCard>

    
          
      </IonContent>
    </IonPage>
  );
};

export default Newest;