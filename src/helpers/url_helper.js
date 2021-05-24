const baseUrl = 'http://18.134.246.3:5000/api';
// const baseUrl = 'http://localhost:5000/api';

export default {
  LOGIN: baseUrl + '/users/auth/login-user',
  GET_TOKEN: baseUrl + '/users/auth/get/token',
  REGISTER: baseUrl + '/users/auth/register/register-user',
  CHANGE_CUSTOMER_STATUS: baseUrl + '/users/customer/status/change-customer-status/',
  SEND_CODE: baseUrl + '/users/auth/send-code/',
  CHANGE_EMAIL: baseUrl + '/users/change/email/',
  REQUEST_CHANGE_HOME_CLUB: baseUrl + '/users/request/to-update/home-club/',
  ADD_REFER_FRIEND: baseUrl + '/refer-friend/add/',
  GET_ALL_USERS_BY_HOME_CLUB: baseUrl + '/users/all-users/by-home-club/',

  // Bucket List
  CREATE_BUCKET_LIST: baseUrl + '/bucket-lists/create/bucket-list/',
  MY_BUCKET_LIST: baseUrl + '/bucket-lists/get-by-id/my-bucket-list/',
  TOP_HUNDRED_PLAYED: baseUrl + '/bucket-lists/get-played/my-bucket-list/top-hundred/',
  SET_PLAYED_MY_BUCKET_LIST: baseUrl + '/bucket-lists/my-bucket/set-played/by-id/',
  DELETE_MY_BUCKET_LIST: baseUrl + '/bucket-lists/my-bucket/remove-item/by-id/',

  // Custom Bucket List
  CREATE_CUSTOM_BUCKET_LIST: baseUrl + '/custom-bucket-lists/create/bucket-list/',
  MY_CUSTOM_BUCKET_LIST: baseUrl + '/custom-bucket-lists/get-by-id/my-bucket-list/',
  CUSTOM_BUCKET_LIST_PLAYED: baseUrl + '/custom-bucket-lists/get-played/my-bucket-list/top-hundred/',
  SET_PLAYED_MY_CUSTOM_BUCKET_LIST: baseUrl + '/custom-bucket-lists/my-bucket/set-played/by-id/',
  DELETE_MY_CUSTOM_BUCKET_LIST: baseUrl + '/custom-bucket-lists/my-bucket/remove-item/by-id/',

  VERIFY_USER_NAME: baseUrl + '/users/auth/verify-user/',
  USER_BY_ID: baseUrl + '/users/get-user/id/user-by-id/',
  USERS_BY_STATUS: baseUrl + '/users/all-users/page/limit/by-status/',
  USERS_SEARCH_BY_STATUS: baseUrl + '/users/all-users/search/by-status/',
  USER_BY_USERNAME: baseUrl + '/users/get-user/id/user/by-email/',
  ALL_APPROVED_LAWYERS: baseUrl + "/users/all/users/lawyers/approved",
  ALL_CUSTOMERS: baseUrl + "/users/all/users/customers",

  // Lists
  GOLF_COURSES_LIST_REG_AND_PROFILE: baseUrl + "/xlsx/golf-courses",
  COURSES_LOCATION_LIST: baseUrl + "/xlsx/courses/location/all",
  TOP_100_BUCKET_LIST: baseUrl + "/xlsx/bucket-list/top-hundred/all",
  MEMBERS_ONLY_CLUBS: baseUrl + "/xlsx/bucket-list/members-only-clubs/all",

  // Play Now
  CREATE_NEW_PLAY_NOW_OFFER: baseUrl + '/play-now-offers/create/play-now/new-offer/',
  MY_PLAY_NOW_LISTINGS: baseUrl + '/play-now-offers/my-listing/',
  PRIVATE_MUNICIPAL_PLAY_NOW_LIST: baseUrl + '/play-now-offers/play-now/private-and-municipal/courses/all',
  TOP_HUNDRED_PLAY_NOW_OFFERS: baseUrl + '/play-now-offers/play-now/top/hundred/offers/all',
  HOME_CLUB_PLAY_NOW_LIST: baseUrl + '/play-now-offers/play-now/home-club-offers/only-play-with-home-club/',
  PLAY_NOW_OFFER_BY_ID: baseUrl + '/play-now-offers/play-now/single-offer/by-id/',
  MY_PLAY_NOW_REQUESRS: baseUrl + '/play-now-offers/my-play-now-requests/',
  ACCEPT_REQUEST_PLAY_NOW_OFFER: baseUrl + '/play-now-offers/my-listing/accept-offer/',
  DECLINE_REQUEST_PLAY_NOW_OFFER: baseUrl + '/play-now-offers/my-listing/decline-offer/',
  REQUEST_PLAY_NOW_OFFER: baseUrl + '/play-now-offers/request/play-now/offer/',
  DELETE_MY_LISTNING_OFFER: baseUrl + '/play-now-offers/delete-item/by-id/',
  DELETE_MY_PLAY_NOW_REQUEST: baseUrl + '/play-now-offers/my-request/delete/',
  UPDATE_PLAY_NOW_MATCH_STATUS: baseUrl + '/play-now-offers/match/update-status/',

  // Reciprocal Play
  CREATE_NEW_RECIPROCAL_PLAY_REQUEST: baseUrl + '/reciprocal-play/create/reciprocal-play/new-offer/',
  MY_RECIPROCAL_PLAY_REQUESTS: baseUrl + '/reciprocal-play/my-requests/all',
  MY_RECIPROCAL_PLAY_LISTING: baseUrl + '/reciprocal-play/my-listing/',
  RECIPROCAL_PLAY_REQUEST_BY_ID: baseUrl + '/reciprocal-play/reciprocal-play/single-offer/by-id/',
  ACCEPT_REQUEST_RECIPROCAL_PLAY_REQUEST: baseUrl + '/reciprocal-play/my-listing/accept-offer/',
  DECLINE_REQUEST_RECIPROCAL_PLAY_REQUEST: baseUrl + '/reciprocal-play/my-listing/decline-offer/',
  RECIPROCAL_PLAY_ALL_REQUESTS: baseUrl + '/reciprocal-play/reciprocal-play/all-requests',
  REQUEST_RECIPROCAL_REQUEST: baseUrl + '/reciprocal-play/request/reciprocal-play/offer/',
  DELETE_RECIPROCAL_PLAY_REQUEST: baseUrl + '/reciprocal-play/my-request/delete/',
  DELETE_RECIPROCAL_LISTING_OFFER: baseUrl + '/reciprocal-play/my-listing/delete/',
  DELETE_RECIPROCAL_LISTING_OR_REQUEST_PERMANENTLY_BY_USER_ID: baseUrl + '/reciprocal-play/listing-or-request/delete-permanently/by-user-id/',
  UPDATE_RECIPROCAL_PLAY_MATCH_STATUS: baseUrl + '/reciprocal-play/match/update-status/',

  // PUT
  UPDATE_PASSWORD: baseUrl + '/users/reset-password/',
  UPDATE_PROFILE: baseUrl + '/users/profile/id/update/',
  UPLOAD_AVATAR: baseUrl + '/users/upload/avatar/',
  ADD_REVIEW: baseUrl + '/users/add/review/',

  // DELETE

  // Friends-list
  ADD_FRIEND: baseUrl + '/friend-list/add/',
  REMOVE_FRIEND: baseUrl + '/friend-list/remove/',
  GET_ALL_FRIEND: baseUrl + '/friend-list/get-all-friends/',
  REMOVE_ALL_FRIEND: baseUrl + '/friend-list/remove/all/',
  GET_ALL_USERS_FOR_ADD_FRIEND: baseUrl + '/users/get-all/approved-users/except-admin',

  // Notifications
  USER_ALL_NOTIFICATION: baseUrl + '/notifications/get/user-notifications/',
  SEND_NOTIFICATION: baseUrl + '/notifications/add/',
  MARK_READ__NOTIFICATION: baseUrl + '/notifications/mark-as-read/',
  MARK_ALL_READ_NOTIFICATION: baseUrl + '/notifications/mark-as-read/all/',
  DELETE_SINGLE_NOTIFICATION: baseUrl + '/notifications/delete/single-notification/',
  DELETE_ALL_NOTIFICATIONS: baseUrl + '/notifications/delete/user-notifications/all/',

  // Rate & Review
  RATE_AND_REVIEW_PLAYER: baseUrl + '/users/rate-and-review/',

  // Payment
  DO_PAYMENT: baseUrl + '/payments/do-payment/',
}
//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register"

//LOGIN
export const POST_LOGIN = baseUrl + "/post-fake-login"
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login"
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd"
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd"

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile"
export const POST_EDIT_PROFILE = "/post-fake-profile"

//PRODUCTS
export const GET_PRODUCTS = "/products"
export const GET_PRODUCTS_DETAIL = "/product"

//Mails
export const GET_INBOX_MAILS = "/inboxmails"
export const ADD_NEW_INBOX_MAIL = "/add/inboxmail"
export const DELETE_INBOX_MAIL = "/delete/inboxmail"

//starred mail
export const GET_STARRED_MAILS = "/starredmails"

//important mails
export const GET_IMPORTANT_MAILS = "/importantmails"

//Draft mail
export const GET_DRAFT_MAILS = "/draftmails"

//Send mail
export const GET_SENT_MAILS = "/sentmails"

//Trash mail
export const GET_TRASH_MAILS = "/trashmails"

//CALENDER
export const GET_EVENTS = "/events"
export const ADD_NEW_EVENT = "/add/event"
export const UPDATE_EVENT = "/update/event"
export const DELETE_EVENT = "/delete/event"
export const GET_CATEGORIES = "/categories"

//CHATS
export const GET_CHATS = "/chats"
export const GET_GROUPS = "/groups"
export const GET_CONTACTS = "/contacts"
export const GET_MESSAGES = "/messages"
export const ADD_MESSAGE = "/add/messages"

//ORDERS
export const GET_ORDERS = "/orders"
export const ADD_NEW_ORDER = "/add/order"
export const UPDATE_ORDER = "/update/order"
export const DELETE_ORDER = "/delete/order"

//CART DATA
export const GET_CART_DATA = "/cart"

//CUSTOMERS
export const GET_CUSTOMERS = "/customers"
export const ADD_NEW_CUSTOMER = "/add/customer"
export const UPDATE_CUSTOMER = "/update/customer"
export const DELETE_CUSTOMER = "/delete/customer"

//SHOPS
export const GET_SHOPS = "/shops"

//CRYPTO
export const GET_WALLET = "/wallet"
export const GET_CRYPTO_ORDERS = "/crypto/orders"

//INVOICES
export const GET_INVOICES = "/invoices"
export const GET_INVOICE_DETAIL = "/invoice"

//PROJECTS
export const GET_PROJECTS = "/projects"
export const GET_PROJECT_DETAIL = "/project"
export const ADD_NEW_PROJECT = "/add/project"
export const UPDATE_PROJECT = "/update/project"
export const DELETE_PROJECT = "/delete/project"

//TASKS
export const GET_TASKS = "/tasks"

//CONTACTS
export const GET_USERS = "/users"
export const GET_USER_PROFILE = "/user"
export const ADD_NEW_USER = "/add/user"
export const UPDATE_USER = "/update/user"
export const DELETE_USER = "/delete/user"