import React, { useState } from 'react';
import { render } from "react-dom";
import Calendar from "react-calendar";
import { IonPage, IonHeader, IonSlides, IonSlide, IonContent, IonButton, IonToolbar,IonIcon,IonRadioGroup, IonItem, IonLabel, IonRadio, IonFooter, IonCard, IonCardSubtitle, IonInput, IonTitle } from '@ionic/react';
import { arrowBack, attach, people, calendarOutline, locationOutline } from 'ionicons/icons';
import 'react-calendar/dist/Calendar.css';
import './BookingProcess.css';

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.

export const BookingProcess: React.FC = () =>  {
  const [selected, setSelected] = useState<string>('');
  const [, setEventName] = useState('')
  const [, setLocation] = useState('')
  const [, setDocuments] = useState('')
  const [, setGuests] = useState('')
  const [date, setDate] = useState(new Date());

  const onChange = () => {
      setDate(date);
  }
  return (
    <IonPage>
    <IonHeader>
    <IonToolbar>
        <IonTitle className="title" >Service Booking</IonTitle>
      <IonButton fill="clear" slot="start">
      <IonIcon icon={arrowBack} /></IonButton>
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
            <img src="/assets/jakob-owens-HgY3BnCWiq8-unsplash.jpg"/>
      </div>
        </IonSlide>
        <IonSlide>
      <div className="slide">
            <img src="/assets/jakob-owens-m4VWudGEzWM-unsplash.jpg"/>
      </div>
        </IonSlide>
      </IonSlides>

       

        <h1 className="appearancetitle2" >Apperance</h1>
        <h5 className="appearancetitle1" >with Mike Rock</h5>
        
      <IonButton className="intro" fill="clear">Intro</IonButton>  <IonButton className="price" fill="clear">Price</IonButton>  <IonButton  className="date" fill="clear">Date</IonButton>  <IonButton  className="detail" fill="clear">Detail</IonButton>

      <IonSlides>
        <IonSlide>
          <div className="slide">
            <p className="servicebio">Mike Rock is a British singer and songwriter. 
               In 2020 mike  achieved over 90millio streams on Spotify, securing his debut album the 20th 
              spot on the UK Top forty.He performed a freestyle at the 2016 HBAA wards, calling out the government 
               for their  perceived in  action in the aftermath of shutting down 500 youth centres across the country the previous year.</p>
          </div>
        </IonSlide>

        
        <IonSlide>
        
        
              <div className="ioncards" >
              <IonCard className="serviceprice4" > 
              <h6 className="packageprice" >£8,000/hr</h6>
              <h5 className="packagetitle">APPEARANCE</h5>
              <p className="packagetitle2">Price listed for the service, contact client for futher details regarding service</p>
              </IonCard>
              </div>
        
              </IonSlide>


        <IonSlide>
        <div className="calendertwo" >
         <Calendar  onChange={onChange} value={date} />
         {console.log(date)}
         </div>
         
        </IonSlide>

        <IonSlide>
          <div className="bookingdetails" >
          <IonItem className="bookingpadding" >
          <IonIcon className="bookingicon" slot="start" icon={calendarOutline} />    
          <IonLabel>Event Name</IonLabel>
          <IonInput 
            placeholder="Add Event Name"
            onIonChange={(e: any) => setEventName(e.target.value)}
          />
          </IonItem>

          <IonItem className="bookingpadding" >
          <IonIcon className="bookingicon" slot="start" icon={locationOutline} />
          <IonLabel>Location</IonLabel>
          <IonInput 
            placeholder="Location"
            onIonChange={(e: any) => setLocation(e.target.value)}
          />
          </IonItem>

          <IonItem className="bookingpadding" >
          <IonIcon className="bookingicon" slot="start" icon={attach} />
          <IonLabel> Attach Document</IonLabel>
          <IonInput
            placeholder="Choose File"
            onIonChange={(e: any) => setDocuments(e.target.value)}
          />
          </IonItem>

          <IonItem className="bookingpadding" >
          <IonIcon className="bookingicon" slot="start" icon={people} />
          <IonLabel> Guests</IonLabel>
          <IonInput 
            placeholder="Add Guests"
            onIonChange={(e: any) => setGuests(e.target.value)}
          />
          </IonItem> 
          <div className="block">
      <IonButton  href="/bookingsummary"  expand="block" color="warning" > <p className="signbutton"> View Summary </p> </IonButton>
      </div>
          </div>
        </IonSlide>

      </IonSlides>

    </IonContent>
    </IonPage>
);
  };

  render(<BookingProcess />, document.querySelector("#root"));

export default BookingProcess;