import firebase from "firebase";

var config = {
    apiKey: "AIzaSyBfGoBrI60xbVCcBPuxpWuAr5nKiLGZALw",
    authDomain: "chennai-students-kondattam.firebaseapp.com",
    databaseURL: "https://chennai-students-kondattam.firebaseio.com",
    projectId: "chennai-students-kondattam",
    storageBucket: "chennai-students-kondattam.appspot.com",
    messagingSenderId: "770665353073",
    appId: "1:770665353073:web:3d81f319eb8727a0a7b0d0",
    measurementId: "G-N77PVY1TTN"
};

firebase.initializeApp(config)
export const Auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.database();
