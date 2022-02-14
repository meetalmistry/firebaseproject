import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyBIQmZIS7mAPhXx1hnrJeMEXVYXIU6hqSY",
    authDomain: "fir-dashboard-a042e.firebaseapp.com",
    projectId: "fir-dashboard-a042e",
    storageBucket: "fir-dashboard-a042e.appspot.com",
    messagingSenderId: "338259388034",
    appId: "1:338259388034:web:2eb68c0311401ce1e7b69b"
  };
  
  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();