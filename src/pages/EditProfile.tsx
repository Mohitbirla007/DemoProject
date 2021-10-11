import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonToolbar, IonButton, IonIcon, IonAvatar, IonCard, IonHeader, IonTitle, IonTextarea, IonNote, IonSelectOption, IonSelect, IonLabel, IonItem, IonToast, IonBackdrop, useIonViewDidLeave, useIonViewDidEnter, IonLoading } from '@ionic/react';
import { checkmarkCircle, menuOutline, notifications, star, gridOutline, logoInstagram, checkmarkDoneCircleOutline, checkmarkCircleOutline, albumsOutline } from 'ionicons/icons';
import './EditProfile.css';
import { useHistory } from 'react-router';
import db, { auth, storageRef } from '../firebaseConfig';



const Profile: React.FC = () => {
  const [category, setcategory] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState("/assets/editprofile.png"); // IMAGE 1200*600
  const history = useHistory();   // FOR NAVIGATION
  const [busy, setBusy] = useState<boolean>(false)


  useIonViewDidEnter(() => {
    setBusy(true);
    if (auth?.currentUser?.uid) {
      db.collection("user").doc(auth.currentUser?.uid).get().then((result) => {
        let data = result.data();
        if (data) {
          if(data.profilePicture){
            setAvatar(data.profilePicture);
          }
          setcategory(data?.category);
        }
        setBusy(false);
      }).catch(() => {
        setBusy(false);
      })
    }
  });

  useIonViewDidLeave(() => {
    setBusy(false);
    setcategory('');
    setAvatar("/assets/editprofile.png");
    setShowToast(false);
    setMessage('');
    setAlertColor('');
  });

  const onSubmit = () => {
    if (category) {
      let uid = auth.currentUser?.uid;
      db.collection("user").doc(uid).update({
        category: category
      }).then(() => {
        localStorage.setItem("category",category);
        setMessage("profile updated successfully");
        setAlertColor('success');
        setShowToast(true);
        history.push("/profile")
      })
    } else {
      setMessage("Please select category it is required");
      setAlertColor('danger');
      setShowToast(true);
    }
  }

  // ERROR IN UPLOAD AVATAR
  const avtarError = () => {
    setAvatar("/assets/editprofile.png")
  };

  // CLICK FILE METHOD
  const imageClick = () => {
    document.getElementById('avatar')?.click();
  };

  // UPLOAD AVATAR
  const avatarUpload = () => {
    let photo: any = document.getElementById("avatar");
    let file = photo?.files[0];

    let user = auth.currentUser;
    let email: any = user?.email;
    var image = new FormData();
    image.append("file", file);
    let date = new Date();
    let mountainsRef = storageRef.child("profile/" + email + ".png");

    let avatar =
      "https://firebasestorage.googleapis.com/v0/b/indi-da614.appspot.com/o/profile%2F" + encodeURIComponent(email) + ".png?alt=media&time=" + date.getTime();

    mountainsRef.put(file).then(function (snapshot) {
      console.log("Uploaded a profile picture! " + avatar);
      setTimeout(function () {
        setAvatar(avatar);
        let uid = auth.currentUser?.uid;
        db.collection("user").doc(uid).update({
          profilePicture: avatar
        }).then(() => {
          setMessage("Profile image updated successfully");
          setAlertColor('success');
          setShowToast(true);
        })
      }, 500);
    });
  };
  return (


    <IonPage>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={message}
        duration={3000}
        color={alertColor}
      />
      <IonContent>

        <IonAvatar className="profilepngone">
          <div>
            <img src={avatar} id="image1200" onClick={imageClick} onError={avtarError} style={{ height: "114px", width: "125px", borderRadius: "50%" }} />
          </div>
        </IonAvatar>

        <div className="profiletitle">
          <h5>Change profile photo </h5>
        </div>

        <div className="editprofilebutton">
          <IonButton expand="block" color="warning" onClick={onSubmit}> <p className="signbutton"> Complete </p> </IonButton>
        </div>



        <IonCard className="firstcard">
          <IonTextarea className="bio" placeholder="Bio">
          </IonTextarea>
          <IonNote className="wordcount" >
            0/500
          </IonNote>
        </IonCard>

        <IonCard className="secondcard" >
          <IonItem lines="none" >
            <IonLabel>Catergory</IonLabel>
            <IonIcon slot="start" icon={gridOutline} />
            <IonSelect className="popover" interface="popover" value={category} onIonChange={e => setcategory(e.detail.value)}>
              <IonSelectOption className="dropdown" value="music">Music</IonSelectOption>
              <IonSelectOption className="dropdown" value="video">Video</IonSelectOption>
              <IonSelectOption className="dropdown" value="model">Model</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonCard>

        <IonCard className="secondcard" >
          <IonItem lines="none" href="services">
            <IonLabel>Featured Services</IonLabel>
            <IonIcon slot="start" icon={albumsOutline} />
          </IonItem>
        </IonCard>

        <IonCard className="secondcard"  >
          <IonItem lines="none" >
            <IonLabel>Connect Instagram</IonLabel>
            <IonIcon slot="start" icon={logoInstagram} />
          </IonItem>
        </IonCard>


      </IonContent>
      <div style={{ display: "none" }} className="input-field">
        <input
          accept="image/*;"
          onChange={avatarUpload}
          id="avatar"
          name="uploaded_file"
          type="file"
          className="validate"
          style={{ display: "none" }}
        />
      </div>
    </IonPage>
  );
};

export default Profile;