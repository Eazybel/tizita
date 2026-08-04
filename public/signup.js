const signInBtn=document.getElementById("signInBtn")
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";
  const firebaseConfig = {
    apiKey: "AIzaSyCj_pnEt37FgjIEjCK6nLQHIu10EJj4Txs",
    authDomain: "tizitainsa.firebaseapp.com",
    projectId: "tizitainsa",
    storageBucket: "tizitainsa.firebasestorage.app",
    messagingSenderId: "163148342308",
    appId: "1:163148342308:web:472dedec018e9c84eca4b1"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider=new GoogleAuthProvider()
signInBtn.onclick=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    window.location.href="./index.html"
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
