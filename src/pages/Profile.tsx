import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonToolbar, IonButton, IonIcon, IonAvatar, IonCard, IonSlide, IonItem, IonThumbnail, IonHeader, IonTitle, IonRouterLink, useIonViewDidEnter, IonLoading, useIonViewDidLeave } from '@ionic/react';
import { checkmarkCircle, menuOutline, notifications, notificationsOutline, star } from 'ionicons/icons';
import './Profile.css';
import { Link } from 'react-router-dom';
import db, { auth } from '../firebaseConfig';

const Profile: React.FC = () => {
  const [avatar, setAvatar] = useState("/assets/editprofile.png"); // IMAGE 1200*600
  const [category, setCategory] = useState(""); // IMAGE 1200*600
  const [busy, setBusy] = useState<boolean>(false)
  const [name, setName] = useState('')

  useIonViewDidEnter(() => {
    setBusy(true);
    db.collection("user").doc(auth.currentUser?.uid).get().then((result) => {
      let data = result.data();
      if (data) {
        if (data.profilePicture) {
          setAvatar(data.profilePicture);
        }
        setCategory(data?.category);
        setName(data.firstname + " " + data.lastname);
      }
      setBusy(false);
    }).catch(() => {
      setBusy(false);
    })
  });

  useIonViewDidLeave(() => {
    setBusy(false);
    setCategory('');
    setAvatar("/assets/editprofile.png");
  });

  // ERROR IN UPLOAD AVATAR
  const avtarError = () => {
    setAvatar("/assets/editprofile.png");
  };

  return (
    <IonPage>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonContent>
        <div className="profilenotification">
          <Link to="/notifications" style={{ textDecoration: "none" }}><IonButton className="notificationicon3"
            color="primary" fill="clear"><IonIcon icon={notifications} /> </IonButton></Link>

          <Link to="/settings" style={{ textDecoration: "none" }}><IonButton className="notificationicon3"
            color="primary" fill="clear"> <IonIcon icon={menuOutline} /> </IonButton></Link>
        </div>


        <IonAvatar className="profilepng" >
          <div>
            <img src={avatar} onError={avtarError} style={{ height: "114px", width: "125px", borderRadius: "50%" }} />
          </div>
        </IonAvatar>

        <div className="profiletitle">
          <h5>{name} </h5>
        </div>


        <div className="editprofilebutton" >
          <Link to="/Editprofile" style={{ textDecoration: "none" }}><IonButton expand="block" color="warning" > <p className="signbutton"> Edit Profile </p> </IonButton></Link>
        </div>


        <IonCard className="profilebio" >
          <h5 className="artisttitle" >{category}</h5>
          <p className="bio" >{name} is a British singer and songwriter.
            In 2020 mike  achieved over 90millio streams on Spotify, securing his debut album the 20th
            spot on the UK Top forty. </p>
          <p className="bio" >He performed a freestyle at the 2016 HBAA wards, calling out the government  for their  perceived in  action in the aftermath of shutting down 500 youth centres across the country the previous year.</p>
        </IonCard>

        <div className="profilefeature" >
          <h5 >Featured Services</h5>
          <IonButton className="showallbuttonthree" color="warning" fill="clear" >Show All</IonButton>
        </div>

        <img className="appearancepng" src="/assets/appearance.png" />

        <div className="profilefeature" >
          <h5  >Instagram Photos</h5>
          <IonButton className="showallbuttonthree" color="warning" fill="clear">Show All</IonButton>
        </div>

        <div className="instafeed" >
          <img className="insta01" src="/assets/instagram1.png" />
          <img className="insta01" src="/assets/instagram2.png" />
          <img className="insta01" src="/assets/instagram3.png" />
          <img className="insta01" src="/assets/instagram4.png" />
          <img className="insta01" src="/assets/instagram5.png" />
          <img className="insta01" src="/assets/instagram6.png" />
        </div>

        <div className="aptitle" >
          <p>Appearance</p>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Profile;