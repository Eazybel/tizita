import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyCj_pnEt37FgjIEjCK6nLQHIu10EJj4Txs",
    authDomain: "tizitainsa.firebaseapp.com",
    projectId: "tizitainsa",
    storageBucket: "tizitainsa.firebasestorage.app",
    messagingSenderId: "163148342308",
    appId: "1:163148342308:web:472dedec018e9c84eca4b1"
};
const userInput=document.getElementById("userInput")
const submitBtn=document.getElementById("submitBtn")
const responseContent=document.getElementById("responseContent")
const welcomeMessage=document.getElementById("welcomeMessage")
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (!user) {
      window.location.href="./signup.html"
  } else if(user) {
    const uid = user.uid;
 welcomeMessage.innerText=`Welcome ${user.displayName}`
submitBtn.onclick=()=>{
fetch("/historyUpdate",
{
method:"POST",
headers:{"Content-type":"application/json"},
body:JSON.stringify({"prompt":`${userInput.value}`,"response":"automation responce goes here","email":`${user.email}`})
}
).then(res=>{
    return res.json()
}).then(data=>{
    console.log(data)
})
//     responseContent.innerText=""
//     if(userInput.value.length<1){
//         alert("No questions asked")
//     }else{
// submitBtn.innerText="Loading ..."
// submitBtn.style.backgroundColor="#133458"
//         fetch("https://insachatbot.onrender.com/webhook/4b84d270-681b-421d-a729-3331ef424e7e",
//             {
//                 method:"POST",
//                 headers:{"Content-type":"application/json"},
//                 body:JSON.stringify({"QUESTION":`${userInput.value}`})
//             }
//         ).then(res=>{
//             return res.text()
//         }).then(data=>{
// submitBtn.innerText="Ask Question (ጠይቅ)"
// submitBtn.style.backgroundColor="#8c4a27"
// responseContent.innerText=data
//         }).catch(err=>{
//             alert("Something went wrong please try again")
//             submitBtn.innerText="Ask Question (ጠይቅ)"
// submitBtn.style.backgroundColor="#8c4a27"
// console.log(uid)
//         })
//     }
}
  }
});