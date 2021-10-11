import React, { useEffect, useRef, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonList, IonItem, IonLabel, IonImg, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonCard, IonAvatar, IonNote, IonButtons, IonButton, IonIcon, IonThumbnail, useIonViewDidEnter, useIonViewDidLeave, IonLoading } from '@ionic/react';
import { analytics, chevronBack, closeOutline, pencil, star, starHalfOutline, starOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import $ from "jquery";
import db, { auth } from '../firebaseConfig';
import { clear } from 'console';

import './Search.css';

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [listOfSearch, setListOfSearch] = useState<any>([]);
  const [recent, setRecent] = useState<String[]>([]);
  const [busy, setBusy] = useState<boolean>(false)

  useIonViewDidEnter(() => {
    setBusy(true)
    getRecentHistory();
  });

  useIonViewDidLeave(() => {
    setSearchText("");
    setListOfSearch([]);
    setRecent([]);
  });

  const getRecentHistory = async () => {
    let items: string[] = [];
    let recentRef: any = await db.collection("user").doc(auth.currentUser?.uid).collection("recentSearch").doc(auth.currentUser?.uid).get()
    if (recentRef.exists) {
      recentRef.data().recentArray.forEach(async (doc: any) => {
        let dataTemp = await doc.data;
        let jsonObject: any = { data: dataTemp, id: doc.id }
        items.push(jsonObject);
        setRecent([...recent, ...items]);
      });
    }
    setBusy(false);
  }

  const onSearch = (event: any) => {
    setBusy(true)
    setSearchText(event.detail.value);
    if (event.detail.value) {
      let val = event.detail.value;
      let items: String[] = []
      db.collection("user").orderBy("firstname").startAt(val).get().then((result: any) => {
        if (!result.empty) {
          console.log(result.docs);
          result.docs.filter((doc: any) => {
            let jsonObject: any = { id: doc.id, data: doc.data() }
            items.push(jsonObject)
          });
          setListOfSearch(items);
          setBusy(false);
        }
      });
    } else {
      setListOfSearch([])
      setBusy(false)
    }
  }

  const clearFromRecent = (index: any, object: any) => {
    let itemArray = recent.filter((item: any) => {
      if (item.data.firstname !== object.data.firstname) {
        return object
      }
    })
    setRecent(itemArray)
    db.collection("user").doc(auth.currentUser?.uid).collection("recentSearch").doc(auth.currentUser?.uid).update({
      recentArray: itemArray
    });
  }

  const addToRecent = (object: any) => {
    let items = [...recent];
    items.push(object);
    db.collection("user").doc(auth.currentUser?.uid).collection("recentSearch").doc(auth.currentUser?.uid).set({
      recentArray: items
    });
  }

  return (
    <IonPage>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title" >Search</IonTitle>
          <IonButtons slot="start">
            <Link to="/explore">
              <IonButton>
                <IonIcon icon={chevronBack} />
              </IonButton>
            </Link>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar className="searchbar" value={searchText} onIonChange={onSearch}></IonSearchbar>

        {listOfSearch.length > 0 && (<IonList className="list">
          {listOfSearch.map((object: any, i: any) => {
            return (
              <IonItem key={i} onClick={() => addToRecent(object)}>
                <IonThumbnail slot="start">
                  <IonImg src={object.data.profilePicture} style={{ height: "60px", width: "60px", borderRadius: "50%" }} />
                </IonThumbnail>
                <Link to={{ pathname: "/viewprofile/" + "" + object.data.username, state: { username: object.data.username, fromWhere: "search", id: object.id } }} style={{ textDecoration: "none" }}><IonLabel>{object.data.firstname + " " + object.data.lastname}</IonLabel></Link>
              </IonItem>
            )
          })}
        </IonList>)}

        {(!searchText && recent.length > 0) && (<h6 className="suggested" >Recent</h6>)}
        {/* <IonButton color="warning" size="small">Clear All</IonButton> */}
        {!searchText && (<IonList>
          {recent.map((object: any, i: any) => {
            return (
              <IonCard className="searchcard" key={i}>
                <IonItem lines="none" >
                  <IonThumbnail slot="start">
                    <IonImg src={object.data.profilePicture} style={{ height: "60px", width: "60px", borderRadius: "50%" }} />
                  </IonThumbnail>
                  <IonButton fill="clear" slot="end" onClick={() => clearFromRecent(i, object)}>
                    <IonIcon icon={closeOutline} slot="icon-only" color="warning" />
                  </IonButton>
                  <Link to={{ pathname: "/viewprofile/" + "" + object.data.username, state: { username: object.data.username, fromWhere: "search", id: object.id } }} style={{ textDecoration: "none" }}><IonLabel>
                    <h2>{object.data.firstname + " " + object.data.lastname}</h2>
                    <p>{object.data.category}</p>
                  </IonLabel>
                  </Link>
                </IonItem>
              </IonCard>
            )
          })}
        </IonList>)}
      </IonContent>
    </IonPage>
  );
};

export default Search;