import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonToolbar, IonButton, IonIcon, IonAvatar, IonCard, IonSlide, IonItem, IonThumbnail, useIonViewDidLeave, useIonViewDidEnter, IonLoading } from '@ionic/react';
import { checkmarkCircle, menuOutline, notifications, notificationsOutline, star, ellipseOutline, ellipsisVertical } from 'ionicons/icons';
import './ViewProfile.css';
import db, { auth } from '../firebaseConfig';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const ViewProfile: React.FC = () => {
  const location: any = useLocation();
  const [busy, setBusy] = useState<boolean>(false);
  const [avatar, setAvatar] = useState("/assets/editprofile.png");
  const [name, setname] = useState('');
  const [viewCount, setViewCount] = useState(0);
  const [category, setCategory] = useState('');
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');

  useIonViewDidEnter(async () => {
    setBusy(true);
    let recentRef: any = await db.collection("user").where("username", "==", location.state.username).get().then((result) => { return result });
    if (!recentRef.empty) {
      let data = recentRef.docs[0].data();
      if (data.profilePicture) {
        setAvatar(data.profilePicture);
      }
      setname(data.firstname + " " + data.lastname);
      setusername(data.username);
      setCategory(data.category);
      setemail(data.email);
      setViewCount(data.viewCount);
      if (location.state.fromWhere === "search" && auth.currentUser?.email !== data.email) {
        updateViewCount();
      }
    }
    setBusy(false);
  });

  useIonViewDidLeave(() => {
    setBusy(false);
  });

  const updateViewCount = () => {
    console.log(location.state.id);
    db.collection("user").doc(location.state.id).update({
      viewCount:viewCount + 1
    })
  }
  return (
    <IonPage>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonContent>

        <div className="profilenotification2">

          <Link to={{ pathname: "/report", state: { username: username } }} style={{ textDecoration: "none" }}><IonButton className="notificationicon4" color="primary" fill="clear"> <IonIcon icon={ellipsisVertical} /> </IonButton></Link>
        </div>


        <IonAvatar className="profilepng" >
          <div>
            <img src={avatar} style={{ height: "114px", width: "125px", borderRadius: "50%" }} />
          </div>
        </IonAvatar>

        <div className="profiletitle">
          <h5>{name} </h5>
        </div>

        <div className="bookingbutton" >
          <IonButton className="messagebutton" href="/conversation" color="success">Message</IonButton>
          <IonButton className="messagebutton" href="/services" color="success"> Booking</IonButton>
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

export default ViewProfile;