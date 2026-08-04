import { getAuth, onAuthStateChanged } from "firebase/auth";
 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
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
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("sucess")
    const uid = user.uid;
    // ...
  } else {
    console.log("not sucess")
  }
});