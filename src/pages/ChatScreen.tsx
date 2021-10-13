import React, { useRef, useState } from "react";
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
import {
  addOutline,
  callOutline,
  cameraOutline,
  micOutline,
  pencil,
  personCircle,
  send,
  videocamOffOutline,
} from "ionicons/icons";
import db, { auth, realtimedb } from "../firebaseConfig";
import "./ChatScreen.css";
import { iteratorSymbol } from "@reduxjs/toolkit/node_modules/immer/dist/internal";

const ChatScreen: React.FC = () => {
  const [uid, setUid] = useState<string>("");
  const [chatList, setChatList] = useState<any>([]);
  const [message, setMessage] = useState<string>("");
  const [showSendButton, setShowSendButton] = useState(false);
  const [replyToMessage, setReplyToMessage] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionMessage, setActionMessage] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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
    setUid(uid!);
    console.log("ionViewDidEnter event fired", data);

    var userPath = realtimedb.ref("conversation/12345");
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
  });

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

  // const handlePrompt = async () => {

  //   console.log("handlePrompt");
  // };
  function handlePrompt(data: string) {
    var currDate: any = new Date();
    console.log("send data", message, currDate);
    var userPath = realtimedb.ref("conversation/12345");
    userPath
      .push({
        msgType: "text",
        text: message,
        uid: uid,
        timestamp: currDate,
      })
      .then(() => {
        setMessage("");
      })
      .catch(function (e) {});
  }
  // const handleSend = async (data) => {
  //   console.log("handlePrompt");
  // };

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
                <p>test chat screen</p>
                {/* <IonText color="medium">last seen today at 22:10</IonText> */}
              </div>
            </div>
          </IonTitle>

          {/* <IonButtons slot="end">
            <IonButton
              fill="clear"
              onClick={() =>
                // toaster(
                //   "As this is a UI only, video calling wouldn't work here."
                // )
                toaster()
              }
            >
              <IonIcon icon={videocamOffOutline} />
            </IonButton>

            <IonButton
              fill="clear"
              onClick={() =>
                // toaster("As this is a UI only, calling wouldn't work here.")
                toaster()
              }
            >
              <IonIcon icon={callOutline} />
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>

      {/* <IonContent id="main-chat-content" ref={contentRef}>
        {chat.map((message, index) => {
          const repliedMessage = chat.filter(
            (subMessage) =>
              parseInt(subMessage.id) === parseInt(message.replyID)
          )[0];

          return (
            <div
              ref={(ref) => (swiperRefs.current[index] = ref)}
              id={`chatBubble_${message.id}`}
              key={index}
              className={`chat-bubble ${
                message.sent ? "bubble-sent" : "bubble-received"
              }`}
              {...longPressEvent}
            >
              <div id={`chatText_${message.id}`}>
                <ChatRepliedQuote
                  message={message}
                  contact={contact}
                  repliedMessage={repliedMessage}
                />

                {message.preview}
                {message.image && message.imagePath && (
                  <img src={message.imagePath} alt="chat message" />
                )}
                <ChatBottomDetails message={message} />
              </div>

              <div className={`bubble-arrow ${message.sent && "alt"}`}></div>
            </div>
          );
        })}

        <IonActionSheet
          header="Message Actions"
          subHeader={actionMessage && actionMessage.preview}
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={actionSheetButtons}
        />

        <IonToast
          color="primary"
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          position="bottom"
          duration="3000"
        />
      </IonContent> */}

      {/* {replyToMessage && <ReplyTo {...replyToProps} />} */}

      <IonList>
        {chatList.map((object: any, i: any) => {
          return (
            <IonCard className="director" routerLink="/ChatScreen">
              <IonItem lines="none">
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
                onClick={() => handlePrompt("add button")}
              />
            </IonCol>

            <div className="chat-input-container">
              {/* <CreateAnimation
                duration={200}
                fromTo={widthAnimation}
                easing="ease-out"
                iterations={1}
                direction={!showSendButton ? "normal" : "reverse"}
                // duration: 200,
                // direction: !showSendButton ? "normal" : "reverse",
                // iterations: "1",
                // fromTo: [widthAnimation],
                // easing: "ease-in-out",
              > */}
              <IonTextarea
                rows={1}
                placeholder={"type here..."}
                value={message}
                onIonChange={(e: any) => setMessage(e.detail.value!)}
              />
              {/* </CreateAnimation> */}
            </div>

            {/* <CreateAnimation
              duration={200}
              fromTo={fadeAnimation}
              easing="ease-out"
              iterations={1}
              direction={!showSendButton ? "normal" : "reverse"}
            > */}
            <IonCol size="1">
              <IonIcon
                icon={cameraOutline}
                color="primary"
                onClick={() => handlePrompt("camera button")}
              />
            </IonCol>

            {/* <IonCol size="1">
                <IonIcon icon={micOutline} color="primary" />
              </IonCol> */}
            {/* </CreateAnimation> */}

            {/* <CreateAnimation
              duration={200}
              fromTo={fadeAnimation}
              easing="ease-out"
              iterations={1}
              direction={!showSendButton ? "normal" : "reverse"}
            > */}
            <IonCol
              size="1"
              className="chat-send-button"
              onClick={() => handlePrompt("send button")}
            >
              <IonIcon icon={send} />
            </IonCol>
            {/* </CreateAnimation> */}
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default ChatScreen;
