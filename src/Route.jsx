import { h } from 'preact';
import { Router } from 'preact-router';
import createHashHistory from 'history/createHashHistory';
import ReactGA from 'react-ga';
import { oneSignalSettings } from './OneSignalSettings';

/**
|--------------------------------------------------
| Scenes
|--------------------------------------------------
*/

import NotFound from './scenes/NotFound';
import Services from './scenes/Services';
import PublicServices from './scenes/PublicServices';
import Home from './scenes/Home';
import Search from './scenes/Search';
import Profile from './scenes/Profile';
import ProfileUser from './scenes/ProfileUser';
import ResetPassword from './scenes/ResetPassword';
import ForgotPassword from './scenes/ForgotPassword';
import MyRequests from './scenes/MyRequests';
import LawyerDrawer from './scenes/LawyerDrawer';
import SignIn from './scenes/SignIn';
import SignUp from './scenes/SignUp';
import Wizard from './scenes/Wizard';
import Terms from './scenes/Terms';
import SigninType from './scenes/SigninType';
import SelectUserType from './scenes/SelectUserType';
import NewRequest from './scenes/NewRequest';
import LawyerProfile from './scenes/LawyerProfile';
import RequestDetails from './scenes/RequestDetails';
import NewArticle from './scenes/NewArticle';
import EditArticle from './scenes/EditArticle';
import NewQualification from './scenes/NewQualification';
import EditContacts from './scenes/EditContacts';
import EditInfos from './scenes/EditInfos';
import EditAreas from './scenes/EditAreas';
import NewVideo from './scenes/NewVideo';
import ServiceDetails from './scenes/ServiceDetails';
import PublicServiceDetails from './scenes/PublicServiceDetails';
import FrequentProblems from './scenes/FrequentProblems';
import Upload from './scenes/Upload';
import Chat from './scenes/Chat';
import Chats from './scenes/Chats';
import Articles from './scenes/Articles';
import Article from './scenes/Article';
import LawAreas from './scenes/LawAreas';
import Tutorial from './scenes/Tutorial';

import UpdatePayment from './scenes/UpdatePayment';
import Payment from './scenes/Payment';
import Plans from './scenes/Plans';
import Hints from './scenes/Hints';
import Honorarios from './scenes/Honorarios';
import Search2 from "./scenes/Home/index2";

/**
|--------------------------------------------------
| Root
|--------------------------------------------------
*/

const fixScroll = route => {
  ReactGA.pageview(route.url);
  const el = document.getElementById('app');
  if (el) {
    el.scrollTop = 0;
  }
};

const RouterComponent = ({ preloader }) => (
  <div>
    <div>
      <LawyerDrawer />
    </div>
    <Router history={createHashHistory()} onChange={fixScroll}>
      <SelectUserType path="/" />

      <Home path="/home" />
      <Search2 path="/lawyer-drawer" />
      <Home path="/_=_">
        {
          (window.onload = function () {
            console.log(window.location.hash);
            if (window.location.hash == '#/_=_') {
              window.location.hash = '/';
              window.location.reload();
            }
          })
        }
      </Home>
      <Chat path="/chat/:id" />
      <Chats path="/chats" />
      <Hints path="/hints" />
      <LawAreas path="/lawareas" />
      <Articles path="/articles" />
      <Article path="/article/:id" />
      <Search path="/search" />
      <Profile path="/profile" />
      <Plans path="/plans" />
      <ProfileUser path="/profileuser" />
      <ResetPassword path="/resetpassword" />
      <ForgotPassword path="/forgotpassword" />
      <LawyerProfile path="/lawyer/:id" />
      <SignIn path="/signin" />
      <SigninType path="/signintype" />
      <Terms path="/terms" />
      <NewRequest path="/newrequest" />
      <NewVideo path="/newvideo" />
      <NewVideo path="/video/:id" edit />
      <NewArticle path="/newarticle" />
      <EditArticle path="/articles/:id" />
      <NewQualification path="/newqualification" />
      <UpdatePayment path="/updatepayment" />
      <EditContacts path="/editcontacts" />
      <EditInfos path="/editinfos" />
      <EditAreas path="/editareas" />
      <SignUp path="/signup" />
      <Payment path="/payment" />
      <Wizard path="/wizard" />
      <Services path="/services" />
      <PublicServices path="/public-services" />
      <MyRequests path="/requests" />
      <FrequentProblems path="/frequent" />
      <ServiceDetails path="/service/:id" />
      <PublicServiceDetails path="/public-service/:id" />
      <RequestDetails path="/request/:id" />
      <Upload path="/upload" />
      <Honorarios path="/honorarios" />
      <Tutorial path="/tutorial" />
      <NotFound default />
    </Router>
  </div>
);

export default RouterComponent;
