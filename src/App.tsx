import React, { useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  homeOutline,
  walletOutline,
  chatboxOutline,
  personOutline,
  calendarOutline,
} from "ionicons/icons";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import Categories from "./pages/Inactive/Categories";
import Trending from "./pages/Inactive/Trending";
import Recommended from "./pages/Inactive/Recommended";
import Popular from "./pages/Inactive/Popular";
import Newest from "./pages/Inactive/Newest";
import Schedule from "./pages/Schedule";
import Bookings from "./pages/Bookings";
import Filter from "./pages/Inactive/Filter";
import Messages from "./pages/Messages";
import NewMessage from "./pages/Inactive/NewMessage";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ViewProfile from "./pages/ViewProfile";
import Authentication from "./pages/Inactive/Authentication";
import Report from "./pages/Report";
import Services from "./pages/Services";
import Cover from "./pages/Cover";
import Login from "./pages/Login";
import ChatScreen from "./pages/ChatScreen";
import ChatList from "./pages/ChatList";
import Register from "./pages/Register";
import RegisterDetails from "./pages/RegisterDetails";
import Verification from "./pages/Inactive/Verification";
import Forgotten from "./pages/Forgotten";
import ResetPassword from "./pages/ResetPassword";
import Tutorial from "./pages/Tutorial";
import Notifications from "./pages/Notifications";
import NotificationsSettings from "./pages/NotificationsSettings";
import BookingProcess from "./pages/BookingProcess";
import BookingSummary from "./pages/BookingSummary";
import ApprovalSummary from "./pages/ApprovalSummary";
import Conversation from "./pages/Conversation";
import Participants from "./pages/Inactive/Participants";
import AddParticipants from "./pages/Inactive/AddParticipants";
import Accounts from "./pages/Inactive/Accounts";
import RemoveAccount from "./pages/RemoveAccount";
import PaymentSummary from "./pages/PaymentSummary";
import Agreement from "./pages/Agreement";
import Payment from "./pages/Payment";
import Card from "./pages/Card";
import Team from "./pages/Inactive/Team";
import Reviews from "./pages/Inactive/Reviews";
import AddReview from "./pages/Inactive/AddReview";
import Settings from "./pages/Settings";
import NewService from "./pages/NewService";
import InviteFriends from "./pages/Inactive/InviteFriends";
import Membership from "./pages/Inactive/Membership";
import Availabilty from "./pages/Availabilty";
import Unavailabilty from "./pages/Unavailabilty";
import Splits from "./pages/Inactive/Splits";
import SplitPercentages from "./pages/Inactive/SplitPercentages";
import Security from "./pages/Security";
import Policies from "./pages/Inactive/Policies";
import Test from "./pages/Inactive/Test";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* FIREBASE */
import { auth } from "./firebaseConfig";

// REACT REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  selectToken,
  selectUser,
} from "./reducer/User/userSlice";

const App: React.FC = () => {
  const user = useSelector(selectUser); // REDUX USER-REDUCER SELECTOR
  const token = useSelector(selectToken); // REDUX USER-REDUCER SELECTOR
  const dispatchUser = useDispatch(); // REDUX DISPATCHUSER
  const dispatchToken = useDispatch(); // REDUX DISPATCHTOKEN
  const history = useHistory(); // REDUX DISPATCHTOKEN

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatchUser(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatchUser(logout());
      }
    });
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/explore" component={Explore} exact={true} />
            <Route path="/search" component={Search} exact={true} />
            <Route path="/trending" component={Trending} exact={true} />
            <Route path="/recommeneded" component={Recommended} exact={true} />
            <Route path="/popular" component={Popular} exact={true} />
            <Route path="/newest" component={Newest} exact={true} />
            <Route path="/schedule" component={Schedule} exact={true} />
            <Route path="/bookings" component={Bookings} exact={true} />
            <Route path="/filter" component={Filter} exact={true} />
            <Route path="/messages" component={Messages} exact={true} />
            <Route path="/newmessage" component={NewMessage} exact={true} />
            <Route path="/profile" component={Profile} />
            <Route path="/editprofile" component={EditProfile} />
            <Route path="/viewprofile/:id" component={ViewProfile} />
            <Route path="/authentication" component={Authentication} />
            <Route path="/report" component={Report} />
            <Route
              path="/"
              render={() => <Redirect to="/cover" />}
              exact={true}
            />
            <Route path="/cover" component={Cover} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/verification" component={Verification} exact />
            <Route path="/forgotten" component={Forgotten} exact />
            <Route path="/resetpassword" component={ResetPassword} exact />
            <Route path="/tutorial" component={Tutorial} exact />
            <Route path="/notifications" component={Notifications} exact />
            <Route
              path="/notificationssettings"
              component={NotificationsSettings}
              exact
            />
            <Route path="/categories" component={Categories} exact={true} />
            <Route path="/services" component={Services} />
            <Route path="/bookingprocess" component={BookingProcess} exact />
            <Route path="/bookingsummary" component={BookingSummary} exact />
            <Route path="/approvalsummary" component={ApprovalSummary} exact />
            <Route path="/conversation" component={Conversation} exact />
            <Route path="/participants" component={Participants} exact />
            <Route path="/addparticipants" component={AddParticipants} exact />
            <Route path="/accounts" component={Accounts} exact />
            <Route path="/removeaccount" component={RemoveAccount} exact />
            <Route path="/paymentsummary" component={PaymentSummary} exact />
            <Route path="/agreement" component={Agreement} exact />
            <Route path="/payment" component={Payment} exact />
            <Route path="/card" component={Card} exact />
            <Route path="/team" component={Team} exact />
            <Route path="/reviews" component={Reviews} exact />
            <Route path="/addreview" component={AddReview} exact />
            <Route path="/settings" component={Settings} exact />
            <Route path="/invitefriends" component={InviteFriends} exact />
            <Route path="/membership" component={Membership} exact />
            <Route path="/availabilty" component={Availabilty} exact />
            <Route path="/unavailabilty" component={Unavailabilty} exact />
            <Route path="/splits" component={Splits} exact />
            <Route
              path="/splitpercentages"
              component={SplitPercentages}
              exact
            />
            <Route path="/security" component={Security} exact />
            <Route path="/policies" component={Policies} exact />
            <Route path="/test" component={Test} exact />
            <Route path="/NewService" component={NewService} exact />
            <Route path="/ChatScreen" component={ChatScreen} exact />
            <Route path="/ChatList" component={ChatList} exact />
            <Route path="/registerdetails" component={RegisterDetails} exact />
          </IonRouterOutlet>
          <IonTabBar style={{ display: user ? "flex" : "none" }} slot="bottom">
            <IonTabButton tab="explore" href="/explore">
              <IonIcon icon={homeOutline} />
            </IonTabButton>
            <IonTabButton tab="schedule" href="/schedule">
              <IonIcon icon={calendarOutline} />
            </IonTabButton>
            <IonTabButton tab="bookings" href="/bookings">
              <IonIcon icon={walletOutline} />
            </IonTabButton>
            <IonTabButton tab="messages" href="/messages">
              <IonIcon icon={chatboxOutline} />
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={personOutline} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
