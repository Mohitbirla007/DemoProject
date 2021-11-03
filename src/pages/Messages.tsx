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
  IonLoading,
  IonAlert,
} from "@ionic/react";
import { addOutline, pencil, personCircle } from "ionicons/icons";
import db, { auth, realtimedb } from "../firebaseConfig";
import "./Messages.css";
import { iteratorSymbol } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { useHistory } from "react-router";
import moment from "moment";

const Messages: React.FC = () => {
  const [showAlert1, setShowAlert1] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [chatList, setChatList] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>(null);
  const [busy, setBusy] = useState<boolean>(false);
  let history = useHistory();
  useIonViewDidEnter(async () => {
    var data = await auth.currentUser;
    // var uid = data?.uid
    console.log("ionViewDidEnter event fired", data);
    setBusy(true);
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
          isGroup: data.isGroup,
          groupName: data.groupName,
          userList: data.userList,
        };
        items.push(jsonObject);
      });
      console.log("item data before sort", items);
      items.sort((a: any, b: any) => (a.timeStamp > b.timeStamp ? -1 : 1));
      setChatList(items);
      setBusy(false);
      console.log("item data after sort", items);
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
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title">Messages</IonTitle>
          <IonButton
            slot="secondary"
            color="ioncolor"
            onClick={() => setShowAlert1(true)}
            // routerLink="/ChatList"
          >
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
                        pathname: object.isGroup
                          ? "/GroupChatScreen"
                          : "/ChatScreen",
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
                                : object.isGroup
                                ? "/assets/group_icon.png"
                                : "/assets/editprofile.png"
                            }
                          />
                        </IonAvatar>
                        <IonLabel>
                          <h2>
                            {object.isGroup ? object.groupName : object.email}
                          </h2>
                          <p
                            className={
                              object.lastSeen ? "lastSeentrue" : "lastSeenfalse"
                            }
                          >
                            {object.recentMessage}
                          </p>
                        </IonLabel>
                        <IonNote slot="end">
                          {moment(object.timeStamp).format("DD/MM/YYYY h:mm a")}
                        </IonNote>
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
                        pathname: object.isGroup
                          ? "/GroupChatScreen"
                          : "/ChatScreen",
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
                                : object.isGroup
                                ? "/assets/group_icon.png"
                                : "/assets/editprofile.png"
                            }
                          />
                        </IonAvatar>
                        <IonLabel>
                          <h2>
                            {object.isGroup ? object.groupName : object.email}
                          </h2>
                          <p
                            className={
                              object.lastSeen ? "lastSeentrue" : "lastSeenfalse"
                            }
                          >
                            {object.recentMessage}
                          </p>
                        </IonLabel>
                        <IonNote slot="end">
                          {moment(object.timeStamp).format("DD/MM/YYYY h:mm a")}
                        </IonNote>
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
      <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        cssClass="my-custom-class"
        header={"Start New Chat"}
        buttons={[
          {
            text: "Create 1-2-1 chat",
            handler: () => {
              console.log("Create 1-2-1 chat");
              history.push({
                pathname: "/ChatList",
              });
            },
          },
          {
            text: "Create Group chat",
            handler: () => {
              history.push({
                pathname: "/AddParticipants",
              });
            },
          },
        ]}
      />
    </IonPage>
  );
};

export default Messages;
