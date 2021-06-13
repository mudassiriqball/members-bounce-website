import firebase from 'firebase';

// Initialize firebase
var firebaseConfig = {
  apiKey: "AIzaSyDfhe0w6m7yUZgkgdP5pIyYVj0nwoxbKLs",
  authDomain: "members-bounce-abe10.firebaseapp.com",
  projectId: "members-bounce-abe10",
  storageBucket: "members-bounce-abe10.appspot.com",
  messagingSenderId: "517239518560",
  appId: "1:517239518560:web:c5fd323152d84a3ba81a05",
  measurementId: "G-Q76FGHKK2G",
  databaseURL: "https://members-bounce-abe10-default-rtdb.firebaseio.com/"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
