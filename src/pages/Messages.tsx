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
  IonDatetime,
} from "@ionic/react";
import { addOutline, pencil, personCircle } from "ionicons/icons";
import db, { auth, realtimedb } from "../firebaseConfig";
import "./Messages.css";
import { iteratorSymbol } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { useHistory } from "react-router";

const Messages: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [chatList, setChatList] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>(null);
  let history = useHistory();
  useIonViewDidEnter(async () => {
    var data = await auth.currentUser;
    // var uid = data?.uid
    console.log("ionViewDidEnter event fired", data);

    var userPath = realtimedb.ref("chatlist/" + data?.uid);
    userPath.on("value", (snapshot) => {
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
          profilePic: data.profilePic,
          email: data.email,
          locationId: data.locationId,
          uid: data.uid,
          lastSeen: data.lastSeen,
        };
        items.push(jsonObject);
      });
      items.sort((a: any, b: any) => (a.timeStamp > b.timeStamp ? -1 : 1));
      setChatList(items);
      console.log("item data", items);
    });
  });

  function sortSearchData(data: string) {
    if (data !== "") {
      setSearchText(data);
      var result = chatList.filter((item: any) => {
        return item.email.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
      console.log("filtered data", result, data, chatList);
      setFilterData(result);
    } else {
      setFilterData(null);
      setSearchText("");
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title">Messages</IonTitle>
          <IonButton slot="secondary" color="ioncolor" routerLink="/ChatList">
            <IonIcon icon={pencil} color="danger" />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          className="searchbar"
          value={searchText}
          onIonChange={(e) => sortSearchData(e.detail.value!)}
        ></IonSearchbar>

        {/*-- List of Sliding Items --*/}
        <IonList>
          <h6 className="suggested">Messages</h6>
          {filterData !== null
            ? filterData.map((object: any, i: any) => {
                return (
                  <IonCard
                    className="director"
                    onClick={() => {
                      history.push({
                        pathname: "/ChatScreen",
                        state: { userData: object },
                      });
                    }}
                  >
                    <IonItemSliding>
                      <IonItem lines="none">
                        <IonAvatar slot="start">
                          <img
                            src={
                              object.profilePic !== null &&
                              object.profilePic !== "" &&
                              object.profilePic !== undefined
                                ? object.profilePic
                                : "/assets/editprofile.png"
                            }
                          />
                        </IonAvatar>
                        <IonLabel>
                          <h2>{object.email}</h2>
                          <p
                            className={
                              object.lastSeen ? "lastSeentrue" : "lastSeenfalse"
                            }
                          >
                            {object.recentMessage}
                          </p>
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
              })
            : chatList.map((object: any, i: any) => {
                return (
                  <IonCard
                    className="director"
                    onClick={() => {
                      history.push({
                        pathname: "/ChatScreen",
                        state: { userData: object },
                      });
                    }}
                  >
                    <IonItemSliding>
                      <IonItem lines="none">
                        <IonAvatar slot="start">
                          <img
                            src={
                              object.profilePic !== null &&
                              object.profilePic !== "" &&
                              object.profilePic !== undefined
                                ? object.profilePic
                                : "/assets/editprofile.png"
                            }
                          />
                        </IonAvatar>
                        <IonLabel>
                          <h2>{object.email}</h2>
                          <p
                            className={
                              object.lastSeen ? "lastSeentrue" : "lastSeenfalse"
                            }
                          >
                            {object.recentMessage}
                          </p>
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
