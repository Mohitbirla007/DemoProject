import React, { useRef, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonAvatar,
  IonNote,
  IonButtons,
  IonButton,
  IonIcon,
  useIonViewDidEnter,
  IonBackButton,
  IonText,
  IonActionSheet,
  IonToast,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  IonTextarea,
  IonThumbnail,
  CreateAnimation,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import {
  addOutline,
  cameraOutline,
  pencil,
  send,
  ellipsisVertical,
  people,
} from "ionicons/icons";
import { auth, realtimedb, storageRef } from "../firebaseConfig";
import "./ChatScreen.css";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { useHistory } from "react-router";
import moment from "moment";

const GroupChatScreen: React.FC = (props) => {
  var isRead = false;
  const [uid, setUid] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [chatList, setChatList] = useState<any>([]);
  const [message, setMessage] = useState<string>("");
  const [showSendButton, setShowSendButton] = useState(false);
  const [totalChat, setTotalChat] = useState<any>(0);
  const [replyToMessage, setReplyToMessage] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionMessage, setActionMessage] = useState(false);
  let history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [firstMsg, setFirstMsg] = useState<any>(false);
  const [busy, setBusy] = useState<boolean>(false);
  const [firstTime, setFirstTime] = useState<any>(false);
  const [propData, setPropData] = useState<any>(props);
  // var groupData = propData?.location?.state?.groupData;
  const [groupData, setgroupData] = useState<any>(
    propData?.location?.state?.userData
  );
  const [userList, setUserList] = useState<any>(
    JSON.parse(groupData?.userList)
  );
  const [locationId, setLocationId] = useState<any>(groupData?.locationId);
  const [opponentUID, setOpponentUID] = useState<any>(groupData?.uid);
  const [opponentProfilePic, setOpponentProfilePic] = useState<any>(
    groupData?.profilePic
  );
  //  Refs
  // const contentRef = useRef<HTMLDivElement>();
  // const swiperRefs = useRef<HTMLDivElement>([]);
  const textareaRef = useRef<HTMLDivElement>();
  const sideRef = useRef<HTMLDivElement>();
  const sendRef = useRef<HTMLDivElement>();
  // const replyToAnimationRef = useRef();

  useIonViewDidEnter(async () => {
    // setFirstTime(true);
    setBusy(true);
    var data = await auth.currentUser;
    var uid: any = data?.uid;
    var email: any = data?.email;
    setUid(uid);
    setEmail(email);
    console.log(
      "ionViewDidEnter event fired",
      data?.uid,
      opponentUID,
      locationId
    );

    fetchChat(locationId, data?.uid);
  });

  function fetchChat(data: string, sentUid: any) {
    var userPath = realtimedb.ref("conversation/" + data);
    console.log("firebase user path", userPath, uid);
    userPath.on("value", (snapshot) => {
      let items: string[] = [];
      let keys: any[] = [];
      console.log("chat data", snapshot.val(), snapshot.key);
      snapshot.forEach(function (childSnapshot) {
        var key: any = childSnapshot.key;
        var data = childSnapshot.val();
        let jsonObject: any = {
          msgType: data.msgType,
          uid: data.uid,
          text: data.text,
          timeStamp: data.timeStamp,
          profilePic: data.profilePic,
          isRead: data.isRead,
          email: data.email,
        };
        items.push(jsonObject);
        keys.push(key);
      });
      setChatList(items);
      setTotalChat(items.length - 1);
      setBusy(false);
      //   console.log("item data fetched", items);
      //   if (items !== null && items !== undefined && items.length > 0) {
      //     setChatList(items);
      //     setTotalChat(items.length - 1);
      //     console.log("item data", items, items.length, keys);
      //     let tempItem: any = items[items.length - 1];
      //     let tempkey: any = keys[keys.length - 1];
      //     let tempUid: any = tempItem.uid;
      // console.log("temp data", tempUid, uid, tempkey, data);
      // if (firstTime) {
      //   setFirstTime(false);
      //   if (tempUid === sentUid) {
      //     console.log("own message");
      //   } else {
      //     console.log("opponent message");
      //     var chatlistpath = realtimedb.ref(
      //       "conversation/" + data + "/" + tempkey
      //     );
      //     chatlistpath
      //       .update({
      //         isRead: true,
      //       })
      //       .then(() => {
      //         setMessage("");
      //       })
      //       .catch(function (e) {});
      //   }
      // }
      //   } else {
      //     setChatList([]);
      //     setTotalChat(0);
      //     setBusy(false);
      //   }
    });
  }

  const toaster = () => {
    setToastMessage("test toast");
    setShowToast(true);
  };

  const widthAnimation = {
    property: "width",
    fromValue: "110%",
    toValue: "100%",
  };

  const fadeAnimation = {
    property: "opacity",
    fromValue: "100%",
    toValue: "0%",
  };

  function handlePrompt(data: string, msg: string) {
    var currDate: any = moment().format();
    console.log("send data", message, currDate, data, msg);
    if (!firstMsg) {
      //add message to firebase
      var userPath = realtimedb.ref("conversation/" + locationId);
      userPath
        .push({
          msgType: data,
          text: data === "text" ? message : msg,
          uid: uid,
          email: email,
          timeStamp: currDate,
          isRead: false,
        })
        .then(() => {
          setMessage("");
        })
        .catch(function (e) {});

      //update recent message and timeStamp
      userList.forEach((element: any) => {
        var chatlistpath = realtimedb.ref(
          "chatlist/" + element.uid + "/" + opponentUID
        );
        chatlistpath
          .update({
            recentMessage:
              data === "text"
                ? email + ": " + message
                : email + ": image uploaded",
            timeStamp: currDate,
            lastSeen: false,
          })
          .then(() => {
            setMessage("");
          })
          .catch(function (e) {});
        console.log("user list", chatlistpath);
      });
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

  async function takePicture() {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      // source: CameraSource.Camera,
      webUseInput: true,
      quality: 100,
    });
    var time: any = new Date();
    let urlPath: any = cameraPhoto.base64String;
    let mediaUpload = storageRef.child("media/" + "chatImage" + time);
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
          setMessage(url);
          handlePrompt("image", url);
          setBusy(false);
        }, 500);
      });
  }

  const sideButtonsAnimation = {
    duration: 200,
    direction: showSendButton ? "normal" : "reverse",
    iterations: "1",
    fromTo: [fadeAnimation],
    easing: "ease-in-out",
  };

  const sendButtonAnimation = {
    duration: showSendButton ? 300 : 100,
    direction: !showSendButton ? "normal" : "reverse",
    iterations: "1",
    fromTo: [fadeAnimation],
    easing: "ease-in-out",
  };

  const textareaAnimation = {
    duration: 200,
    direction: !showSendButton ? "normal" : "reverse",
    iterations: "1",
    fromTo: [widthAnimation],
    easing: "ease-in-out",
  };

  //   function deleteConversation() {
  //     setBusy(true);
  //     console.log("Yes");
  //     var userPath = realtimedb.ref("conversation/" + locationId);
  //     userPath.off();
  //     var deleteOppoentData = realtimedb.ref(
  //       "chatlist/" + opponentUID + "/" + uid
  //     );
  //     deleteOppoentData.remove();
  //     var deleteSelfData = realtimedb.ref("chatlist/" + uid + "/" + opponentUID);
  //     deleteSelfData.remove();
  //     var deleteConversationPath = realtimedb.ref("conversation/" + locationId);
  //     deleteConversationPath.remove();
  //     console.log("SUccessfully removed");
  //     setBusy(false);
  //     history.push({
  //       pathname: "/Messages",
  //     });
  //   }

  return (
    <IonPage className="chat-page">
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear">
            <IonBackButton />
          </IonButton>
          <IonAvatar className="cimage" slot="start">
            <img
              src={
                opponentProfilePic !== null &&
                opponentProfilePic !== "" &&
                opponentProfilePic !== undefined
                  ? opponentProfilePic
                  : "/assets/group_icon.png"
              }
            />
          </IonAvatar>
          <IonList>
            <IonLabel className="title" slot="start">
              {groupData?.groupName}
            </IonLabel>
            {/* <div></div>
            <IonLabel className="title">Music Artist</IonLabel> */}
          </IonList>
          <IonButton
            slot="secondary"
            color="ioncolor"
            onClick={() => {
              history.push({
                pathname: "/Participants",
                state: { groupData: groupData },
              });
            }}
          >
            <IonIcon icon={people} color="danger" />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonList className="message-list">
        {chatList.map((object: any, i: any) => {
          return (
            <IonRow
              className={
                object.uid === uid ? "msgBubble-right" : "msgBubble-left"
              }
            >
              {object.uid !== uid && (
                <IonAvatar className={"avator-style"}>
                  <img
                    src={
                      opponentProfilePic !== null &&
                      opponentProfilePic !== "" &&
                      opponentProfilePic !== undefined
                        ? opponentProfilePic
                        : "/assets/editprofile.png"
                    }
                  />
                </IonAvatar>
              )}
              <IonCard className={"card-style"}>
                <IonItem>
                  <IonCol>
                    {object.uid !== uid && <IonLabel>{object.email}</IonLabel>}
                    {object.msgType === "text" ? (
                      <IonLabel>
                        <p>{object.text}</p>
                      </IonLabel>
                    ) : (
                      <IonThumbnail slot="start">
                        <img src={object.text} />
                      </IonThumbnail>
                    )}
                  </IonCol>
                  <IonNote slot="end">
                    {moment(object.timeStamp).format("DD/MM/YYYY h:mm a")}
                  </IonNote>
                </IonItem>
              </IonCard>
            </IonRow>
          );
        })}
      </IonList>

      <IonFooter className="chat-footer" id="chat-footer">
        <IonGrid>
          <IonRow className="ion-align-items-center">
            {/* <IonCol size="1"> */}
            <IonIcon
              icon={addOutline}
              color="primary"
              onClick={() => takePicture()}
            />
            {/* </IonCol> */}
            {/* <div className="chat-input-container"> */}
            <IonTextarea
              rows={1}
              placeholder={"type here..."}
              value={message}
              onIonChange={(e: any) => setMessage(e.detail.value!)}
            />
            {/* </div> */}
            <IonCol
              size="1"
              className="chat-send-button"
              onClick={() => {
                message !== ""
                  ? handlePrompt("text", "null")
                  : alert("can not send blank message");
              }}
            >
              <IonIcon icon={send} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
      {/* <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        cssClass="my-custom-class"
        header={"Are you sure you want to End Conversation"}
        buttons={[
          {
            text: "No",
            handler: () => {
              console.log("no");
            },
          },
          {
            text: "Yes",
            handler: () => {
              deleteConversation();
            },
          },
        ]}
      /> */}
    </IonPage>
  );
};

export default GroupChatScreen;
