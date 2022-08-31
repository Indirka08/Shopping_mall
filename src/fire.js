import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC54HiGPCCahNcvcXDFhhHmTX9tR5lKDTQ",
  authDomain: "shopping-mall-e2306.firebaseapp.com",
  projectId: "shopping-mall-e2306",
  storageBucket: "shopping-mall-e2306.appspot.com",
  messagingSenderId: "922737882012",
  appId: "1:922737882012:web:ce9bd67a16c68ee2630e59",
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
