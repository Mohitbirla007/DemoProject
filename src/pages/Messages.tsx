import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonRadio,
  IonCheckbox,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonContent,
  IonCard,
  IonAvatar,
  IonNote,
  IonButtons,
  IonButton,
  IonIcon,
  useIonViewDidEnter,
} from "@ionic/react";
import { addOutline, pencil, personCircle } from "ionicons/icons";
import db, { auth, realtimedb } from "../firebaseConfig";
import "./Messages.css";
import { iteratorSymbol } from "@reduxjs/toolkit/node_modules/immer/dist/internal";

const Messages: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [chatList, setChatList] = useState<any>([]);

  useIonViewDidEnter(async () => {
    var data = await auth.currentUser;
    // var uid = data?.uid
    console.log("ionViewDidEnter event fired", data);

    var userPath = realtimedb.ref("chatlist/" + data?.uid);
    userPath.once("value", (snapshot) => {
      let items: string[] = [];
      console.log("chat list data", snapshot.val(), snapshot.key);
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var data = childSnapshot.val();
        console.log("all data", data.userName, data.recentMessage);
        let jsonObject: any = {
          userName: data.userName,
          recentMessage: data.recentMessage,
          timeStamp: data.timeStamp,
          profilepic: data.profilePic,
        };
        items.push(jsonObject);
      });
      setChatList(items);
      console.log("item data", items);
    });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title">Messages</IonTitle>
          <IonButton slot="secondary" color="ioncolor">
            <IonIcon icon={pencil} color="danger" />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          className="searchbar"
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
        ></IonSearchbar>

        {/*-- List of Sliding Items --*/}
        <IonList>
          <h6 className="suggested">Messages</h6>
          {chatList.map((object: any, i: any) => {
            return (
              <IonCard className="director" routerLink="/ChatScreen">
                <IonItemSliding>
                  <IonItem lines="none">
                    <IonAvatar slot="start">
                      <img src={object.profilepic} />
                    </IonAvatar>
                    <IonLabel>
                      <h2>{object.userName}</h2>
                      <p>{object.recentMessage}</p>
                    </IonLabel>
                    <IonNote slot="end">{object.timeStamp}</IonNote>
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption color="danger" onClick={() => {}}>
                      Mute
                    </IonItemOption>
                    <IonItemOption
                      className="messagedelete"
                      color="warning"
                      onClick={() => {}}
                    >
                      Delete
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              </IonCard>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Messages;
