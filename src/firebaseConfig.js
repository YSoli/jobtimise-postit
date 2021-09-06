import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAP34uluF7tN22RfJyHW3r1n5u2_3olu2A",
  authDomain: "postit-aaed4.firebaseapp.com",
  databaseURL: "https://postit-aaed4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "postit-aaed4",
  storageBucket: "postit-aaed4.appspot.com",
  messagingSenderId: "514209411686",
  appId: "1:514209411686:web:3196ae9f83020acab173a7"
}
firebase.initializeApp(firebaseConfig)


export default firebase.initializeApp(firebaseConfig);