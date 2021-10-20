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
  CreateAnimation,
} from "@ionic/react";
import { addOutline, cameraOutline, send } from "ionicons/icons";
import { auth, realtimedb, storageRef } from "../firebaseConfig";
import "./ChatScreen.css";
import { Plugins, CameraResultType } from "@capacitor/core";
const { Camera } = Plugins;

const ChatScreen: React.FC = (props) => {
  const [uid, setUid] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [chatList, setChatList] = useState<any>([]);
  const [message, setMessage] = useState<string>("");
  const [showSendButton, setShowSendButton] = useState(false);
  const [replyToMessage, setReplyToMessage] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionMessage, setActionMessage] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [firstMsg, setFirstMsg] = useState<any>(false);
  const [propData, setPropData] = useState<any>(props);
  // console.log("props data", props);
  // var userData = propData?.location?.state?.userData;
  const [userData, setUserData] = useState<any>(
    propData?.location?.state?.userData
  );
  const [locationId, setLocationId] = useState<any>(userData?.locationId);
  const [opponentUID, setOpponentUID] = useState<any>(userData?.uid);
  //  Refs
  // const contentRef = useRef<HTMLDivElement>();
  // const swiperRefs = useRef<HTMLDivElement>([]);
  const textareaRef = useRef<HTMLDivElement>();
  const sideRef = useRef<HTMLDivElement>();
  const sendRef = useRef<HTMLDivElement>();
  // const replyToAnimationRef = useRef();

  useIonViewDidEnter(async () => {
    var data = await auth.currentUser;
    var uid = data?.uid;
    var email = data?.email;
    setUid(uid!);
    setEmail(email!);
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
        fetchChat(snapshot.val().locationId);
      } else {
        setFirstMsg(true);
      }
    });
  });

  function fetchChat(data: string) {
    var userPath = realtimedb.ref("conversation/" + data);
    console.log("firebase user path", userPath);
    userPath.on("value", (snapshot) => {
      let items: string[] = [];
      console.log("chat data", snapshot.val(), snapshot.key);
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var data = childSnapshot.val();
        let jsonObject: any = {
          msgType: data.msgType,
          uid: data.uid,
          text: data.text,
          timeStamp: data.timeStamp,
        };
        items.push(jsonObject);
      });
      setChatList(items);
      console.log("item data", items);
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

  function handlePrompt(data: string) {
    var currDate: any = new Date().toLocaleString("en-IN");
    if (!firstMsg) {
      console.log("send data", message, currDate);
      //add message to firebase
      var userPath = realtimedb.ref("conversation/" + locationId);
      userPath
        .push({
          msgType: "text",
          text: message,
          uid: uid,
          timeStamp: currDate,
        })
        .then(() => {
          setMessage("");
        })
        .catch(function (e) {});

      //update recent message and timeStamp
      var chatlistpath = realtimedb.ref("chatlist/" + uid + "/" + opponentUID);
      chatlistpath
        .update({
          recentMessage: message,
          timeStamp: currDate,
        })
        .then(() => {
          setMessage("");
        })
        .catch(function (e) {});
    } else {
      var locId = makeid(20);
      setLocationId(locId);
      //generate data in conversation list
      var userPath = realtimedb.ref("conversation/" + locId);
      userPath
        .push({
          msgType: "text",
          text: message,
          uid: uid,
          timeStamp: currDate,
        })
        .then(() => {
          setMessage("");
        })
        .catch(function (e) {});
      //generate data in chatlist self
      var chatlistpath = realtimedb.ref("chatlist/" + uid + "/" + opponentUID);
      chatlistpath
        .set({
          locationId: locId,
          profilePic: "",
          userName: "",
          recentMessage: message,
          email: userData?.email,
          uid: opponentUID,
          timeStamp: currDate,
        })
        .then(() => {
          setMessage("");
        })
        .catch(function (e) {});
      //generate data in chatlist opponent
      var chatlistpath = realtimedb.ref("chatlist/" + opponentUID + "/" + uid);
      chatlistpath
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
        .catch(function (e) {});
      setFirstMsg(false);
      fetchChat(locId);
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
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
    var imageUrl = image.webPath;
    console.log("image path", image, imageUrl);
    // storageRef.put
    // Can be set to the src of an image now
    // this.setState({
    // photo: imageUrl
    // })
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
          return (
            <IonCard
              className={
                object.uid === uid ? "msgBubble-right" : "msgBubble-left"
              }
            >
              <IonItem className="message-bubblesize">
                <IonLabel>
                  <p>{object.text}</p>
                </IonLabel>
                <IonNote slot="end">{object.timeStamp}</IonNote>
              </IonItem>
            </IonCard>
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
              onClick={() => handlePrompt("send button")}
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
