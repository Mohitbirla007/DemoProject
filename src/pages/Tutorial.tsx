import React from 'react';
import { IonSlides, IonSlide, IonContent, IonButton, IonPage } from '@ionic/react';
import './Tutorial.css';
import { Link } from 'react-router-dom';

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 1,
  speed: 400
};

export const Tutorial: React.FC = () => (
  <IonPage>
    <IonContent >
      <IonSlides>

        <IonSlide>
          <div className="slide">
            <div className="exploreimage" >
            <img  src="/assets/explore.tutorial.png"/>
            </div>

            <h2 className="tutorialheader" >Explore</h2>
            <p className="tutorialinfo" >Swipe through various profiles to collaborate and gain inspiration from other people in the industry using the home screen.</p>
          </div>
        </IonSlide>

        <IonSlide>
          <div className="slide" >
          <div className="exploreimage" >
          <img src="/assets/schedule.tutorial.png"/>
          </div>

          <h2 className="tutorialheader" >Schedule</h2>
          <p className="tutorialinfo" >Allow you to see the upcoming booking linking schedule with external calendars and maps for alerts and directions.</p>
          </div>
        </IonSlide>

        <IonSlide>
          <div className="slide" >
          <div className="exploreimage" >
          <img src="/assets/booking.tutorial.png"/>
          </div>
          <h2 className="tutorialheadertwo" >Booking</h2>
          <p className="tutorialinfotwo" >View and manage all bookings that have been sent or received from clients. Approve, reschedule, decline and pay for bookings.</p>
          </div>
        </IonSlide>

        <IonSlide>
          <div className="slide" >
          <div className="exploreimage"  >
          <img src="/assets/messages.tutorial.png"/>
          </div>
          <h2 className="tutorialheader" >Messages</h2>
          <p className="tutorialinfo" >Communication with peers through sending messages, photos and videos to one or more people using the chat screen.</p>
          </div>
        </IonSlide>

        <IonSlide>
          <div className="slide" >
          <div  className="exploreimage" >
          <img src="/assets/profile.tutorial.png"/>
          </div>
          <h2 className="tutorialheadertwo" >Profile</h2>
          <p className="tutorialinfotwo" >Add features to your profile page to make yourself more marketable. Explore other profiles to gain inspiration to use on your own page.</p>
          </div>
        </IonSlide>

        <IonSlide>
          <div className="slide" >
            <div className="exploreimage"  >
          <img src="/assets/notification.tutorial.png"/>
           </div>
          <h2 className="tutorialheadertwo" >Notifications</h2>
          <p className="tutorialinfo" >Keep update to date when receiving push notifications on all activities including messages, schedule and bookings.</p>
          
          <div className="block" >
          <IonButton routerLink="/profile"  expand="block" color="warning" > <p className="signbutton"> GET STARTED </p> </IonButton>
          </div>
          </div>
        </IonSlide>

      </IonSlides>
    </IonContent>
    </IonPage>
    
);

export default Tutorial;