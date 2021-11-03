import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonCard,
  IonItem,
  IonAvatar,
  IonLabel,
  IonRadio,
  IonBackButton,
  useIonViewDidEnter,
  IonList,
  IonRadioGroup,
  IonRow,
  IonTextarea,
  IonCol,
  IonLoading,
} from "@ionic/react";
import "./AddParticipants.css";
import db, { auth, realtimedb, storageRef } from "../../firebaseConfig";
import { useHistory } from "react-router";
import moment from "moment";
import { cameraOutline, pencil } from "ionicons/icons";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";

const AddParticipants: React.FC = () => {
  const [uid, setUid] = useState<string>("");
  const [searchText, setSearchText] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupPic, setGroupPic] = useState("");
  const [selected, setSelected] = useState("");
  const [userList, setUserList] = useState<any>([]);
  const [addeduserList, setAddedUserList] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>(null);
  const [busy, setBusy] = useState<boolean>(false);
  let history = useHistory();

  useIonViewDidEnter(async () => {
    var data = await auth.currentUser;
    let temp: any = addeduserList;
    var uid: any = data?.uid;
    setUid(uid);
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
        } else {
          let newarr: any = { isAdmin: true, ...jsonObject };
          temp.push(newarr);
          setAddedUserList(temp);
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

  function makeid(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function selectedUsers(data1: any, data2: any) {
    let temp: any = addeduserList;
    let newarr: any = { isAdmin: false, ...data2 };
    temp.push(newarr);
    setAddedUserList(temp);
    console.log("radio data", data1, data2, temp, addeduserList);
  }

  function createGroup() {
    if (groupName !== "" && groupName !== null) {
      // console.log("create db on firebase", addeduserList);
      var currDate: any = moment().format();
      setBusy(true);
      var groupId = makeid(28);
      var locId = makeid(28);
      let userData = {
        locationId: locId,
        profilePic: groupPic !== "" && groupPic !== null ? groupPic : "",
        groupName: groupName,
        recentMessage: "",
        timeStamp: currDate,
        uid: groupId,
        isGroup: true,
        userList: JSON.stringify(addeduserList),
      };
      // var chatlistpathself = realtimedb.ref("chatlist/" + uid + "/" + groupId);
      // chatlistpathself
      //   .set({
      //     locationId: locId,
      //     profilePic: groupPic !== "" && groupPic !== null ? groupPic : "",
      //     groupName: groupName,
      //     recentMessage: "",
      //     timeStamp: currDate,
      //     uid: groupId,
      //     isGroup: true,
      //     userList: JSON.stringify(addeduserList),
      //   })
      //   .then(() => {})
      //   .catch(function (e) {});
      addeduserList.forEach((element: any) => {
        console.log("users added", element.uid);
        var chatlistpathopponent = realtimedb.ref(
          "chatlist/" + element.uid + "/" + groupId
        );
        chatlistpathopponent
          .set({
            locationId: locId,
            profilePic: groupPic !== "" && groupPic !== null ? groupPic : "",
            groupName: groupName,
            recentMessage: "",
            timeStamp: currDate,
            uid: groupId,
            isGroup: true,
            userList: JSON.stringify(addeduserList),
          })
          .then(() => {})
          .catch(function (e) {});
      });
      // var locId = makeid(28);
      // var groupChatpath = realtimedb.ref("groupChat/" + groupId);
      // groupChatpath
      //   .set({
      //     locationId: locId,
      //     profilePic: "",
      //     GroupName: "test dummy",
      //     recentMessage: "",
      //     TimeStamp: "",
      //     uid: groupId,
      //     // userList: addeduserList,
      //   })
      //   .then(() => {})
      //   .catch(function (e) {});
      setBusy(false);
      history.push({
        pathname: "/GroupChatScreen",
        state: { userData },
      });
    } else {
      alert("Group Name can not be empty");
    }
  }

  async function takePicture() {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      // source: CameraSource.Camera,
      webUseInput: true,
      quality: 100,
    });
    var time: any = new Date();
    let urlPath: any = cameraPhoto.base64String;
    let mediaUpload = storageRef.child("media/" + "GroupImage" + time);
    console.log("take photo response", cameraPhoto);
    setBusy(true);
    mediaUpload
      .putString(urlPath, "base64", {
        contentType: "image/jpg",
      })
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        setTimeout(() => {
          console.log(url);
          setGroupPic(url);
          setBusy(false);
        }, 500);
      });
  }

  return (
    <IonPage>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title">Add Participants</IonTitle>
          <IonButton slot="start" fill="clear">
            <IonBackButton />
          </IonButton>

          <IonButton
            slot="end"
            color="warning"
            fill="clear"
            onClick={() => createGroup()}
          >
            Create Group
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRow>
          <IonCol>
            <IonTitle className="groupName">Group Name</IonTitle>
            <IonTextarea
              className="chat-input-container"
              rows={1}
              placeholder={"Enter group name..."}
              value={groupName}
              onIonChange={(e: any) => setGroupName(e.detail.value!)}
            />
          </IonCol>
          <IonCol className="backcolor">
            <IonTitle className="groupName">Group Profile Picture</IonTitle>
            <IonAvatar className="group_profilr_pic">
              <img
                src={
                  groupPic !== null && groupPic !== "" && groupPic !== undefined
                    ? groupPic
                    : "/assets/editprofile.png"
                }
              />
              <IonButton
                className="edit_icon"
                fill="clear"
                onClick={() => takePicture()}
              >
                <IonIcon icon={cameraOutline} color="danger" />
              </IonButton>
            </IonAvatar>
          </IonCol>
        </IonRow>
        <IonSearchbar
          className="searchbar"
          value={searchText}
          onIonChange={(e) => sortSearchData(e.detail.value!)}
        ></IonSearchbar>

        <h6 className="suggested">Suggested</h6>

        {/* <IonCard className="director">
          <IonItem>
            <IonAvatar slot="start">
              <img src="./avatar-finn.png" />
            </IonAvatar>
            <IonLabel>
              <h2>Mathew Thomas</h2>
              <p>BBC Production Director</p>
            </IonLabel>

            <IonRadio slot="end" />
          </IonItem>
        </IonCard> */}
        {/*-- List of Sliding Items --*/}
        <IonList>
          {/* <h6 className="suggested">Users List</h6> */}
          {filterData !== null
            ? filterData.map((object: any, i: any) => {
                return (
                  <IonCard className="director">
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
                      <IonRadioGroup
                        value={selected}
                        onIonChange={(e) => {
                          selectedUsers(e.detail.value, object);
                        }}
                      >
                        <IonRadio slot="end" />
                      </IonRadioGroup>
                    </IonItem>
                  </IonCard>
                );
              })
            : userList.map((object: any, i: any) => {
                return (
                  <IonCard className="director">
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
                      <IonRadioGroup
                        value={selected}
                        onIonChange={(e) =>
                          selectedUsers(e.detail.value, object)
                        }
                      >
                        <IonRadio slot="end" />
                      </IonRadioGroup>
                    </IonItem>
                  </IonCard>
                );
              })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddParticipants;
