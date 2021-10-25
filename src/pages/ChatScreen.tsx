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
} from "@ionic/react";
import { addOutline, cameraOutline, send } from "ionicons/icons";
import { auth, realtimedb, storageRef } from "../firebaseConfig";
import "./ChatScreen.css";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import moment from "moment";

const ChatScreen: React.FC = (props) => {
  var isRead = false;
  const [uid, setUid] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [chatList, setChatList] = useState<any>([]);
  const [message, setMessage] = useState<string>("");
  const [showSendButton, setShowSendButton] = useState(false);
  const [totalChat, setTotalChat] = useState<any>(0);
  const [replyToMessage, setReplyToMessage] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionMessage, setActionMessage] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [firstMsg, setFirstMsg] = useState<any>(false);
  const [busy, setBusy] = useState<boolean>(false);
  const [firstTime, setFirstTime] = useState<any>(true);
  const [propData, setPropData] = useState<any>(props);
  // console.log("props data", props);
  // var userData = propData?.location?.state?.userData;
  const [userData, setUserData] = useState<any>(
    propData?.location?.state?.userData
  );
  const [locationId, setLocationId] = useState<any>(userData?.locationId);
  const [opponentUID, setOpponentUID] = useState<any>(userData?.uid);
  const [opponentProfilePic, setOpponentProfilePic] = useState<any>(userData?.profilePic);
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
    console.log("ionViewDidEnter event fired", data?.uid, opponentUID);
    //fetching opponent message location id
    var locationIdPath = realtimedb.ref(
      "chatlist/" + data?.uid + "/" + opponentUID
    );
    console.log("locationIdpath", locationIdPath);
    locationIdPath.once("value", (snapshot) => {
      if (snapshot.val() !== null && snapshot.val() !== undefined) {
        console.log("opponent data", snapshot.val(), snapshot.key);
        setLocationId(snapshot.val().locationId);
        fetchChat(snapshot.val().locationId, data?.uid);
        var chatlistpath = realtimedb.ref(
          "chatlist/" + uid + "/" + opponentUID
        );
        chatlistpath
          .update({
            lastSeen: false,
          })
          .then(() => {
            setMessage("");
          })
          .catch(function (e) { });
      } else {
        setFirstMsg(true);
      }
      setBusy(false);
    });
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
        };
        items.push(jsonObject);
        keys.push(key);
      });
      setChatList(items);
      setTotalChat(items.length - 1);
      console.log("item data", items, items.length, keys);
      let tempItem: any = items[items.length - 1];
      let tempkey: any = keys[keys.length - 1];
      let tempUid: any = tempItem.uid;
      console.log("temp data", tempUid, uid, tempkey, data);
      if (firstTime) {
        setFirstTime(false);
        if (tempUid === sentUid) {
          console.log("own message");
        } else {
          console.log("opponent message");
          var chatlistpath = realtimedb.ref(
            "conversation/" + data + "/" + tempkey
          );
          chatlistpath
            .update({
              isRead: true,
            })
            .then(() => {
              setMessage("");
            })
            .catch(function (e) { });
        }
      }
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
          timeStamp: currDate,
          isRead: false,
        })
        .then(() => {
          setMessage("");
        })
        .catch(function (e) { });

      //update recent message and timeStamp
      var chatlistpathself = realtimedb.ref(
        "chatlist/" + uid + "/" + opponentUID
      );
      chatlistpathself
        .update({
          recentMessage: data === "text" ? message : "image uploaded",
          timeStamp: currDate,
          lastSeen: false,
        })
        .then(() => {
          setMessage("");
        })
        .catch(function (e) { });
      var chatlistpathopponent = realtimedb.ref(
        "chatlist/" + opponentUID + "/" + uid
      );
      chatlistpathopponent
        .update({
          recentMessage: data === "text" ? message : "image uploaded",
          timeStamp: currDate,
          lastSeen: true,
        })
        .then(() => {
          setMessage("");
        })
        .catch(function (e) { });
    } else {
      var locId = makeid(20);
      setLocationId(locId);
      //generate data in conversation list
      var userPath = realtimedb.ref("conversation/" + locId);
      userPath
        .push({
          msgType: data,
          text: data === "text" ? message : msg,
          uid: uid,
          timeStamp: currDate,
          isRead: false,
        })
        .then(() => {
          setMessage("");
        })
        .catch(function (e) { });
      //generate data in chatlist self
      var chatlistpathself = realtimedb.ref(
        "chatlist/" + uid + "/" + opponentUID
      );
      chatlistpathself
        .set({
          locationId: locId,
          profilePic: "",
          userName: "",
          recentMessage: data === "text" ? message : "image uploaded",
          email: userData?.email,
          uid: opponentUID,
          timeStamp: currDate,
          lastSeen: false,
        })
        .then(() => {
          setMessage("");
        })
        .catch(function (e) { });
      //generate data in chatlist opponent
      var chatlistpathopponent = realtimedb.ref(
        "chatlist/" + opponentUID + "/" + uid
      );
      chatlistpathopponent
        .set({
          locationId: locId,
          profilePic: "",
          userName: "",
          recentMessage: message,
          email: email,
          uid: uid,
          timeStamp: currDate,
        })
        .then(() => {
          setMessage("");
        })
        .catch(function (e) { });
      setFirstMsg(false);
      fetchChat(locId, "null");
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

  return (
    <IonPage className="chat-page">
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start">
            <IonBackButton />
          </IonButton>
          <IonTitle>
            <div className="chat-contact">
              {/* <img src={contact.avatar} alt="avatar" /> */}
              <div className="chat-contact-details">
                <p>{userData?.email}</p>
                {/* <IonText color="medium">last seen today at 22:10</IonText> */}
              </div>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonList className="message-list">
        {chatList.map((object: any, i: any) => {
          isRead = object.isRead;
          console.log("isread", isRead, i);
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
              <IonNote className={"seen-style"}>
                {totalChat === i
                  ? isRead
                    ? object.uid === uid
                      ? "Seen"
                      : null
                    : null
                  : null}
              </IonNote>
              <IonCard className={"card-style"}>
                <IonItem>
                  {object.msgType === "text" ? (
                    <IonLabel>
                      <p>{object.text}</p>
                    </IonLabel>
                  ) : (
                    <IonThumbnail slot="start">
                      <img src={object.text} />
                    </IonThumbnail>
                  )}

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
            <IonCol size="1">
              <IonIcon
                icon={addOutline}
                color="primary"
                onClick={() => takePicture()}
              />
            </IonCol>
            <div className="chat-input-container">
              <IonTextarea
                rows={1}
                placeholder={"type here..."}
                value={message}
                onIonChange={(e: any) => setMessage(e.detail.value!)}
              />
            </div>
            <IonCol
              size="1"
              className="chat-send-button"
              onClick={() => handlePrompt("text", "null")}
            >
              <IonIcon icon={send} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default ChatScreen;
