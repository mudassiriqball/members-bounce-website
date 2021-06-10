import React from "react"
import { Redirect } from "react-router-dom"

// // Pages Component
import Chat from "../pages/Chat/Chat"

// Profile
import UserProfile from "../pages/Authentication/user-profile"


// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register/index"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Login2 from "../pages/AuthenticationInner/Login2"
import Register1 from "../pages/AuthenticationInner/Register"
import Register2 from "../pages/AuthenticationInner/Register2"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2"
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword"
import ForgetPwd2 from "../pages/AuthenticationInner/ForgetPassword2"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2"
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail"
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2"
import EmailVerification from "../pages/AuthenticationInner/auth-email-verification"
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2"
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification"
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2"

// Dashboard
import Dashboard from "../pages/Dashboard"

//Pages
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"

//Contacts
import { Home, Events, About, Membership, ContactUs, } from "pages/Landing"
import routeNames from "./routeNames"
import CreateTop100BucketList from "pages/Top100BucketList/CreateTop100BucketList"
import MyTop100BucketList from "pages/Top100BucketList/MyTop100BucketList"
import Top100BucketListPlayed from "pages/Top100BucketList/Top100BucketListPlayed"
import CreateCustomBucketList from "pages/CustomBucketList/CreateCustomBucketList"
import MyCustomBucketList from "pages/CustomBucketList/MyCustomBucketList"
import CustomBucketListPlayed from "pages/CustomBucketList/CustomBucketListPlayed"
import PlayNowCreateNewOffer from "pages/PlayNow/PlayNowCreateNewOffer"
import PlayNowPrivateAndMunicipal from "pages/PlayNow/PlayNowPrivateAndMunicipal"
import PlayNowTop100 from "pages/PlayNow/PlayNowTop100"
import PlayNowHomeClub from "pages/PlayNow/PlayNowHomeClub"
import PlayNowMyRequests from "pages/PlayNow/PlayNowMyRequests/index"
import PlayNowMyListings from "pages/PlayNow/PlayNowMyListings/index"
import ReciprocalGolfCreateNewRequest from "pages/ReciprocalGolf/ReciprocalGolfCreateNewRequest"
import ReciprocalGolfAllRequests from "pages/ReciprocalGolf/ReciprocalGolfAllRequests"
import ReciprocalGolfMyRequests from "pages/ReciprocalGolf/ReciprocalGolfMyRequests"
import ReciprocalGolfMyListings from "pages/ReciprocalGolf/ReciprocalGolfMyListings"
import ReferFriend from "pages/ReferFriend"
import ViewMatches from "pages/PlayNow/PlayNowMyListings/ViewMatches"
import ViewAndRequest from "pages/PlayNow/ViewAndRequest"

const userRoutes = [
  { path: routeNames.Private.Dashboard, component: Dashboard },

  // Top 100 Bucket List
  { path: routeNames.Private.CreateTop100BucketList, component: CreateTop100BucketList },
  { path: routeNames.Private.MyTop100BucketList, component: MyTop100BucketList },
  { path: routeNames.Private.Top100BucketListPlayed, component: Top100BucketListPlayed },

  // Custom Bucket List
  { path: routeNames.Private.CreateCustomBucketList, component: CreateCustomBucketList },
  { path: routeNames.Private.MyCustomBucketList, component: MyCustomBucketList },
  { path: routeNames.Private.CustomBucketListPlayed, component: CustomBucketListPlayed },

  // Play Now
  { path: routeNames.Private.PlayNow_CreateNewRequest, component: PlayNowCreateNewOffer },
  { path: routeNames.Private.PlayNow_PrivateAndMunicipal, component: PlayNowPrivateAndMunicipal },
  { path: routeNames.Private.PlayNow_Top100, component: PlayNowTop100 },
  { path: routeNames.Private.PlayNow_HomeClub, component: PlayNowHomeClub },
  { path: routeNames.Private.PlayNow_MyRequests, component: PlayNowMyRequests },
  { path: routeNames.Private.PlayNow_MyListings, component: PlayNowMyListings },
  { path: routeNames.Private.PlayNow_ViewMatches, component: ViewMatches },
  { path: routeNames.Private.PlayNow_ViewAndRequest, component: ViewAndRequest },

  // Reciprocal Golf
  { path: routeNames.Private.ReciprocalGolf_CreateNewRequest, component: ReciprocalGolfCreateNewRequest },
  { path: routeNames.Private.ReciprocalGolf_AllRequests, component: ReciprocalGolfAllRequests },
  { path: routeNames.Private.ReciprocalGolf_MyRequests, component: ReciprocalGolfMyRequests },
  { path: routeNames.Private.ReciprocalGolf_MyListings, component: ReciprocalGolfMyListings },

  // Profile
  { path: '', component: UserProfile },
  { path: '', component: Chat },

  // Refer
  { path: routeNames.Private.ReferFriend, component: ReferFriend },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to={routeNames.Dashboard} /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: routeNames.Login, component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  // Landing
  { path: routeNames.Home, component: Home },
  { path: routeNames.AboutUs, component: About },
  { path: routeNames.Membership, component: Membership },
  { path: routeNames.Events, component: Events },
  { path: routeNames.ContactUs, component: ContactUs },


  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-login-2", component: Login2 },
  { path: "/pages-register", component: Register1 },
  { path: "/pages-register-2", component: Register2 },
  { path: "/page-recoverpw", component: Recoverpw },
  { path: "/page-recoverpw-2", component: Recoverpw2 },
  { path: "/pages-forgot-pwd", component: ForgetPwd1 },
  { path: "/auth-recoverpw-2", component: ForgetPwd2 },
  { path: "/auth-lock-screen", component: LockScreen },
  { path: "/auth-lock-screen-2", component: LockScreen2 },
  { path: "/page-confirm-mail", component: ConfirmMail },
  { path: "/page-confirm-mail-2", component: ConfirmMail2 },
  { path: "/auth-email-verification", component: EmailVerification },
  { path: "/auth-email-verification-2", component: EmailVerification2 },
  { path: "/auth-two-step-verification", component: TwostepVerification },
  { path: "/auth-two-step-verification-2", component: TwostepVerification2 },
]

export { userRoutes, authRoutes }
