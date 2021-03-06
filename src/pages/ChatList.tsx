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
  IonBackButton,
  IonLoading,
} from "@ionic/react";
import db, { auth, realtimedb } from "../firebaseConfig";
import "./ChatList.css";
import { useHistory } from "react-router";

const ChatList: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [userList, setUserList] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>(null);
  const [busy, setBusy] = useState<boolean>(false);
  let history = useHistory();
  useIonViewDidEnter(async () => {
    var data = await auth.currentUser;
    var uid = data?.uid;
    // console.log("ionViewDidEnter event fired", data);
    setBusy(true);
    var userPath = realtimedb.ref("user");
    userPath.once("value", (snapshot) => {
      let items: string[] = [];
      console.log("user list data", snapshot.val(), snapshot.key);
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var data = childSnapshot.val();
        let jsonObject: any = {
          userName: data.userName,
          email: data.email,
          profilepic: data.profilePic,
          uid: data.uid,
        };
        if (uid !== data.uid) {
          items.push(jsonObject);
        }
      });
      setUserList(items);
      console.log("item data", items);
      setBusy(false);
    });
  });

  function sortSearchData(data: string) {
    if (data !== "") {
      setSearchText(data);
      // var result = userList.filter(function (o: any) {
      //   return o.email == data;
      // });
      // var result = userList.find((x:string) => x.email === data);
      var result = userList.filter((item: any) => {
        return item.email.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
      console.log("filtered data", result, data, userList);
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
          <IonButton slot="start" fill="clear">
            <IonBackButton />
          </IonButton>
          <IonTitle className="title">Users List</IonTitle>
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
          {/* <h6 className="suggested">Users List</h6> */}
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
                      </IonLabel>
                    </IonItem>
                  </IonCard>
                );
              })
            : userList.map((object: any, i: any) => {
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
                      </IonLabel>
                    </IonItem>
                  </IonCard>
                );
              })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ChatList;
