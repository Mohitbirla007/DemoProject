import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCard,
  IonItemSliding,
  IonItem,
  IonAvatar,
  IonLabel,
  IonNote,
  IonItemOptions,
  useIonViewDidEnter,
  useIonViewWillEnter,
  IonItemOption,
  IonFooter,
  IonAlert,
  IonBackButton,
  IonList,
  IonLoading,
} from "@ionic/react";
import { chevronBack, personAddOutline } from "ionicons/icons";
import "./Participants.css";
import { auth, realtimedb, storageRef } from "../../firebaseConfig";
import { useHistory } from "react-router";
import moment from "moment";

const Tab5: React.FC = (props) => {
  // console.log("props data", props);
  let history = useHistory();
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [showAlert4, setShowAlert4] = useState(false);
  const [showAlert5, setShowAlert5] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selfData, setSelfData] = useState("");
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [propData, setPropData] = useState<any>(props);
  const [busy, setBusy] = useState<boolean>(false);
  const [groupData, setGroupData] = useState(
    propData?.location?.state?.groupData
  );
  // var userData = propData?.location?.state?.userData;
  const [userList, setUserList] = useState<any>(
    JSON.parse(propData?.location?.state?.groupData?.userList)
  );
  const [opponentUID, setOpponentUID] = useState<any>(
    propData?.location?.state?.groupData?.uid
  );
  // console.log("user list", userList);

  useIonViewWillEnter(async () => {
    var data: any = await auth.currentUser;
    var uid: any = data?.uid;

    var index = userList.findIndex((element: any) => element.uid === uid);
    // setIsUserAdmin(
    //   userList[index]?.isAdmin !== undefined ? userList[index].isAdmin : false
    // );
    setSelfData(data);
    console.log(
      "is user admin",
      index,
      isUserAdmin,
      userList[index]?.isAdmin !== undefined ? userList[index].isAdmin : false
    );
  });

  function deleteConversation() {
    setBusy(true);
    userList.forEach((element: any) => {
      var chatlistpath = realtimedb.ref(
        "chatlist/" + element.uid + "/" + opponentUID
      );
      chatlistpath.remove();
    });
    setBusy(false);
    history.replace({
      pathname: "/Messages",
    });
  }

  function removeParticipant() {
    setBusy(true);
    console.log("Yes remove participant", userList, selectedUser);
    let testUser: any = selectedUser;
    let index = userList.findIndex(
      (element: any) => element.email === testUser.email
    );
    userList.splice(index, 1);
    console.log("Yes remove participant", userList, testUser, index);

    userList.forEach((element: any) => {
      var chatlistpath = realtimedb.ref(
        "chatlist/" + element.uid + "/" + opponentUID
      );
      chatlistpath.update({
        userList: JSON.stringify(userList),
      });
      console.log("user list to removed", chatlistpath);
    });
    var removeuserpath = realtimedb.ref(
      "chatlist/" + testUser.uid + "/" + opponentUID
    );
    removeuserpath.remove();
    console.log("Successfully removed");
    setBusy(false);
  }

  function addAdmin() {
    setBusy(true);
    console.log("Yes add Admin", userList, selectedUser);
    let testUser: any = selectedUser;
    let index = userList.findIndex(
      (element: any) => element.email === testUser.email
    );
    userList[index].isAdmin = true;
    console.log("Yes add Admin", userList, testUser, index);

    userList.forEach((element: any) => {
      var chatlistpath = realtimedb.ref(
        "chatlist/" + element.uid + "/" + opponentUID
      );
      chatlistpath.update({
        userList: JSON.stringify(userList),
      });
      console.log("user list to add", chatlistpath);
    });
    console.log("Successfully added");
    setBusy(false);
  }

  function leaveChat() {
    setBusy(true);
    console.log("Yes leave participant", userList, selfData);
    let testUser: any = selfData;
    let index1 = userList.findIndex(
      (element: any) => element.uid === testUser.uid
    );
    userList.splice(index1, 1);
    let index2 = userList.findIndex((element: any) => element.isAdmin === true);
    console.log("Yes leave participant", userList, testUser, index1, index2);
    if (userList.length > 0) {
      if (index2 === -1) {
        console.log("no admin found");
        userList[0].isAdmin = true;
        userList.forEach((element: any) => {
          var chatlistpath = realtimedb.ref(
            "chatlist/" + element.uid + "/" + opponentUID
          );
          chatlistpath.update({
            userList: JSON.stringify(userList),
          });
          console.log("user list to leave", chatlistpath);
        });
        var removeuserpath = realtimedb.ref(
          "chatlist/" + testUser.uid + "/" + opponentUID
        );
        removeuserpath.remove();
      } else {
        console.log("already had an admin");
        userList.forEach((element: any) => {
          var chatlistpath = realtimedb.ref(
            "chatlist/" + element.uid + "/" + opponentUID
          );
          chatlistpath.update({
            userList: JSON.stringify(userList),
          });
          console.log("user list to leave", chatlistpath);
        });
        var removeuserpath = realtimedb.ref(
          "chatlist/" + testUser.uid + "/" + opponentUID
        );
        removeuserpath.remove();
      }
    }
    console.log("Successfully leave");
    setBusy(false);
    history.replace({
      pathname: "/Messages",
    });
  }

  // const renderslider = () => {
  //   if (isUserAdmin) {
  //     return (
  //       <IonItemOptions side="end">
  //         <IonItemOption color="danger" onClick={() => setShowAlert3(true)}>
  //           Remove Participant
  //         </IonItemOption>
  //         <IonItemOption
  //           className="messagedelete"
  //           color="warning"
  //           onClick={() => setShowAlert4(true)}
  //         >
  //           Add as Admin
  //         </IonItemOption>
  //       </IonItemOptions>
  //     );
  //   }
  // };

  return (
    <IonPage>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title">Participants List</IonTitle>
          <IonButton slot="start" fill="clear">
            <IonBackButton />
          </IonButton>
          {isUserAdmin && (
            <IonButton
              className="participantsicon"
              color="warning"
              slot="end"
              fill="clear"
              onClick={() => {
                history.push({
                  pathname: "/Participants",
                  state: { groupData: groupData },
                });
              }}
            >
              <IonIcon icon={personAddOutline} />
            </IonButton>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {userList.map((object: any, i: any) => {
            return (
              <IonCard
                className="director"
                onClick={() => {
                  console.log("user data", object, isUserAdmin);
                  setSelectedUser(object);
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
                    </IonLabel>
                    <IonNote slot="end" className="admin_name">
                      {object.isAdmin ? "Admin" : null}
                    </IonNote>
                  </IonItem>
                  {/* {!object.isAdmin && renderslider()} */}
                  {!object.isAdmin && (
                    <IonItemOptions side="end">
                      <IonItemOption
                        color="danger"
                        onClick={() =>
                          isUserAdmin
                            ? setShowAlert3(true)
                            : setShowAlert5(true)
                        }
                      >
                        Remove Participant
                      </IonItemOption>
                      <IonItemOption
                        className="messagedelete"
                        color="warning"
                        onClick={() =>
                          isUserAdmin
                            ? setShowAlert4(true)
                            : setShowAlert5(true)
                        }
                      >
                        Add as Admin
                      </IonItemOption>
                    </IonItemOptions>
                  )}
                </IonItemSliding>
              </IonCard>
            );
          })}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            onClick={() => setShowAlert1(true)}
            slot="start"
            fill="clear"
          >
            Leave Chat
          </IonButton>
          <div></div>
          <IonButton
            onClick={() =>
              isUserAdmin ? setShowAlert2(true) : setShowAlert5(true)
            }
            slot="end"
            fill="clear"
          >
            End Chat
          </IonButton>
          <IonAlert
            isOpen={showAlert1}
            onDidDismiss={() => setShowAlert1(false)}
            cssClass="my-custom-class"
            header={"Leave Chat"}
            message={
              "You will not receieve messages from this group unless someone adds you to the conversation again."
            }
            buttons={[
              {
                text: "Cancel",
                handler: () => {
                  console.log("Cancel");
                },
              },
              {
                text: "Leave Chat",
                handler: () => {
                  leaveChat();
                },
              },
            ]}
          />

          <IonAlert
            isOpen={showAlert2}
            onDidDismiss={() => setShowAlert2(false)}
            cssClass="my-custom-class"
            header={"End Chat"}
            message={
              "This will remove everyone, including you, from the group."
            }
            buttons={[
              {
                text: "Cancel",
                handler: () => {
                  console.log("Cancel");
                },
              },
              {
                text: "End Chat",
                handler: () => {
                  deleteConversation();
                },
              },
            ]}
          />

          <IonAlert
            isOpen={showAlert3}
            onDidDismiss={() => setShowAlert3(false)}
            cssClass="my-custom-class"
            header={"Remove Participant"}
            message={"Are you sure you want to remove this Participant."}
            buttons={[
              {
                text: "No",
                handler: () => {
                  console.log("No");
                },
              },
              {
                text: "Yes",
                handler: () => {
                  removeParticipant();
                },
              },
            ]}
          />

          <IonAlert
            isOpen={showAlert4}
            onDidDismiss={() => setShowAlert4(false)}
            cssClass="my-custom-class"
            header={"Add as ADMIN"}
            message={"Are you sure you want to add this Participant as ADMIN"}
            buttons={[
              {
                text: "No",
                handler: () => {
                  console.log("No");
                },
              },
              {
                text: "Yes",
                handler: () => {
                  addAdmin();
                },
              },
            ]}
          />

          <IonAlert
            isOpen={showAlert5}
            onDidDismiss={() => setShowAlert5(false)}
            cssClass="my-custom-class"
            message={
              "You do not have ADMIN permision to perform this operation"
            }
            buttons={[
              {
                text: "close",
                handler: () => {
                  console.log("close");
                },
              },
            ]}
          />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Tab5;
