import React, { useState } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonPage, IonTextarea, IonButton, IonIcon, IonSlide, IonSlides, IonInput, IonSelect, IonSelectOption, IonCard } from '@ionic/react';
import './NewService.css';
import { cameraOutline, chevronBack } from 'ionicons/icons';

export const NewService: React.FC = () => {
    const [] = useState<string>();
    const [selected, setSelected] = useState<string>('');
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
        <IonTitle className="title">New Service</IonTitle>
      <IonButton href="/servicesorder" color="primary" fill="clear" slot="start"><IonIcon icon={chevronBack} /></IonButton>
      <IonButton className="participantsicon" color="warning" fill="clear" slot="end"><IonIcon icon={cameraOutline} /></IonButton>
    </IonToolbar>
    </IonHeader>
  <IonContent >

      <IonSlides>
        <IonSlide>
      <div className="slide">
            <img src="/assets/dancing-man-among-crowd-2820898.jpg"/>
      </div>
        </IonSlide>
        <IonSlide>
      <div className="slide">
            <img src="/assets/dancing-man-among-crowd-2820898.jpg"/>
      </div>
        </IonSlide>
      </IonSlides>

      <IonCard className="firstcard">
          <IonInput  placeholder="Service Title" />
      </IonCard>

      <IonCard className="secondcard" >
          <IonTextarea  placeholder="Service Details"/>
      </IonCard>
      
      <IonItem className="newservicepaddingone" >
          <IonLabel className="newserviveicon" slot="start"  >Price Per Hour £</IonLabel>
          <IonInput className="newserviveicon2" placeholder="Unit Price" type="number"></IonInput>
          </IonItem>

          <IonItem className="newservicepadding" >
              <IonLabel className="newserviveicon" slot="start"   >Number of Hours</IonLabel>
              <IonSelect className="newserviveicon3" value="" interface="popover">
            <IonSelectOption className="dropdown" value="1">1</IonSelectOption>
            <IonSelectOption className="dropdown"value="2">2</IonSelectOption>
            <IonSelectOption className="dropdown" value="3">3</IonSelectOption>
            <IonSelectOption className="dropdown"value="4">4</IonSelectOption>
            <IonSelectOption className="dropdown"value="5">5</IonSelectOption>
            <IonSelectOption className="dropdown"value="6">6</IonSelectOption>
            <IonSelectOption className="dropdown"value="7">7</IonSelectOption>
            <IonSelectOption className="dropdown"value="8">8</IonSelectOption>
            <IonSelectOption className="dropdown"value="9">9</IonSelectOption>
            <IonSelectOption className="dropdown"value="10">10</IonSelectOption>
            <IonSelectOption className="dropdown"value="11">11</IonSelectOption>
            <IonSelectOption className="dropdown"value="12">12</IonSelectOption>
            <IonSelectOption className="dropdown"value="13">13</IonSelectOption>
            <IonSelectOption className="dropdown"value="14">14</IonSelectOption>
            <IonSelectOption className="dropdown"value="15">15</IonSelectOption>
            <IonSelectOption className="dropdown"value="16">16</IonSelectOption>
            <IonSelectOption className="dropdown"value="17">17</IonSelectOption>
          </IonSelect>
          </IonItem>

          <IonItem className="newservicepadding">
              <IonLabel className="newserviveicon" slot="start" >Deposit Required %</IonLabel>
              <IonSelect className="newserviveicon3" value="" interface="popover">
            <IonSelectOption className="dropdown"value="5">5</IonSelectOption>
            <IonSelectOption className="dropdown"value="10">10</IonSelectOption>
            <IonSelectOption className="dropdown"value="15">15</IonSelectOption>
            <IonSelectOption className="dropdown"value="20">20</IonSelectOption>
            <IonSelectOption className="dropdown"value="25">25</IonSelectOption>
            <IonSelectOption className="dropdown"value="30">30</IonSelectOption>
            <IonSelectOption className="dropdown"value="35">35</IonSelectOption>
            <IonSelectOption className="dropdown"value="40">40</IonSelectOption>
            <IonSelectOption className="dropdown"value="45">45</IonSelectOption>
            <IonSelectOption className="dropdown"value="50">50</IonSelectOption>
            <IonSelectOption className="dropdown"value="55">55</IonSelectOption>
            <IonSelectOption className="dropdown"value="60">60</IonSelectOption>
            <IonSelectOption className="dropdown"value="65">65</IonSelectOption>
            <IonSelectOption className="dropdown"value="70">70</IonSelectOption>
            <IonSelectOption className="dropdown"value="75">75</IonSelectOption>
            <IonSelectOption className="dropdown"value="80">80</IonSelectOption>
            <IonSelectOption className="dropdown"value="85">85</IonSelectOption>
            <IonSelectOption className="dropdown"value="90">90</IonSelectOption>
            <IonSelectOption className="dropdown"value="95">95</IonSelectOption>
            <IonSelectOption className="dropdown"value="100">100</IonSelectOption>
          </IonSelect>
          </IonItem>

          <IonItem className="newservicepadding">
              <IonLabel className="newserviveicon" slot="start" >Payment Terms</IonLabel>
              <IonSelect className="newserviveicon3" value="" interface="popover">
            <IonSelectOption className="dropdown"value="7">Net 7</IonSelectOption>
            <IonSelectOption className="dropdown"value="10">Net 10</IonSelectOption>
            <IonSelectOption className="dropdown"value="30">Net 30</IonSelectOption>
            <IonSelectOption className="dropdown"value="60">Net 60</IonSelectOption>
            <IonSelectOption className="dropdown"value="90">Net 90</IonSelectOption>
          </IonSelect>
          </IonItem>

          <IonItem className="newservicepadding" >
              <IonLabel className="newserviveicon"  slot="start">Cancellation Days</IonLabel>
              <IonSelect className="newserviveicon3" value="" interface="popover">
            <IonSelectOption className="dropdown"value="1">1 Day</IonSelectOption>
            <IonSelectOption className="dropdown"value="7">7 Days</IonSelectOption>
            <IonSelectOption className="dropdown"value="30">30 Days</IonSelectOption>
            <IonSelectOption className="dropdown"value="60">60 Days</IonSelectOption>
            <IonSelectOption className="dropdown"value="90">90 Days</IonSelectOption>
          </IonSelect>
          </IonItem>
          
          <div className="block">
      <IonButton  expand="block" color="warning" > <p className="signbutton"> Save </p> </IonButton>
      </div>
    </IonContent>
    </IonPage>
  );
};

export default NewService;





