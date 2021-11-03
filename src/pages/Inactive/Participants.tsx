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
  IonItemOption,
  IonFooter,
  IonAlert,
  IonBackButton,
  IonList,
} from "@ionic/react";
import { chevronBack, personAddOutline } from "ionicons/icons";
import "./Participants.css";
import moment from "moment";

const Tab5: React.FC = (props) => {
  console.log("props data", props);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [showAlert4, setShowAlert4] = useState(false);
  const [propData, setPropData] = useState<any>(props);
  // console.log("props data", props);
  // var userData = propData?.location?.state?.userData;
  const [userList, setUserList] = useState<any>(
    JSON.parse(propData?.location?.state?.groupData?.userList)
  );
  console.log("user list", userList);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title">Participants List</IonTitle>
          <IonButton slot="start" fill="clear">
            <IonBackButton />
          </IonButton>
          <IonButton
            className="participantsicon"
            color="warning"
            href="/addparticipants"
            slot="end"
            fill="clear"
          >
            <IonIcon icon={personAddOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {userList.map((object: any, i: any) => {
            return (
              <IonCard
                className="director"
                onClick={() => {
                  console.log("user data", object);
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
                  {!object.isAdmin && (
                    <IonItemOptions side="end">
                      <IonItemOption
                        color="danger"
                        onClick={() => setShowAlert3(true)}
                      >
                        Remove Participant
                      </IonItemOption>
                      <IonItemOption
                        className="messagedelete"
                        color="warning"
                        onClick={() => setShowAlert4(true)}
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
            onClick={() => setShowAlert2(true)}
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
              "You will not receieve messages from this group unless someone aadds you to the conversation again."
            }
            buttons={["Cancel", "Leave Chat"]}
          />

          <IonAlert
            isOpen={showAlert2}
            onDidDismiss={() => setShowAlert2(false)}
            cssClass="my-custom-class"
            header={"End Chat"}
            message={
              "This will remove everyone, including you, from the group."
            }
            buttons={["Cancel", "End Chat"]}
          />

          <IonAlert
            isOpen={showAlert3}
            onDidDismiss={() => setShowAlert3(false)}
            cssClass="my-custom-class"
            header={"Remove Participant"}
            message={"Are you sure you want to remove this Participant."}
            buttons={["No", "Yes"]}
          />

          <IonAlert
            isOpen={showAlert4}
            onDidDismiss={() => setShowAlert4(false)}
            cssClass="my-custom-class"
            header={"Add as ADMIN"}
            message={"Are you sure you want to add this Participant as ADMIN"}
            buttons={["No", "Yes"]}
          />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Tab5;
