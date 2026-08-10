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
const 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// authentication / fetching automationdsta/ setting local storage code block {#0e7,47}
onAuthStateChanged(auth, (user) => {
  if (!user) {
      window.location.href="./signup.html"
  } else if(user) {
    const uid = user.uid;
 welcomeMessage.innerText=`Welcome ${user.displayName}`
submitBtn.onclick=()=>{
    responseContent.innerText=""
    if(userInput.value.length<1){
        alert("No questions asked")
    }else{
submitBtn.innerText="Loading ..."
submitBtn.style.backgroundColor="#133458"
        fetch("https://insachatbot.onrender.com/webhook/4b84d270-681b-421d-a729-3331ef424e7e",
            {
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({"QUESTION":`${userInput.value}`})
            }
        ).then(res=>{
            return res.text()
        }).then(data=>{
submitBtn.innerText="Ask Question (ጠይቅ)"
submitBtn.style.backgroundColor="#8c4a27"
responseContent.innerText=data
        // simple localStorage save of the prompt/response pair
        const historyKey = 'tizita_history'
        const existing = JSON.parse(localStorage.getItem(historyKey) || '[]')
        existing.unshift({ question: userInput.value, answer: data, timestamp: Date.now() })
        localStorage.setItem(historyKey, JSON.stringify(existing))
        }).catch(err=>{
            alert("Something went wrong please try again")
            submitBtn.innerText="Ask Question (ጠይቅ)"
submitBtn.style.backgroundColor="#8c4a27"
console.log(uid)
        })
    }

}
// WEB SOCKET APIL DEMONISTRATION

const SOCKET_SERVER_URL = window.location.hostname === "localhost"
  ? "http://127.0.0.1:5000"
  : "https://tizita-rltw.onrender.com";
const socket = io(SOCKET_SERVER_URL);

// DOM Elements
const liveChatBtn = document.getElementById('liveChatBtn');
const chatModal = document.getElementById('chatModal');
const closeChatBtn = document.getElementById('closeChatBtn');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatInput = document.getElementById('chatInput');
const chatDisplay = document.getElementById('chatDisplay');



// Geting active user name from Auth context {#6ef,14}
const currentUserName = (typeof user !== 'undefined' && user?.displayName) 
  ? user.displayName 
  : "Anonymous";

// Open/Close Modal
liveChatBtn.addEventListener('click', () => {
  chatModal.style.display = 'flex';
  chatModal.setAttribute('aria-hidden', 'false');
});

closeChatBtn.addEventListener('click', () => {
  chatModal.style.display = 'none';
  chatModal.setAttribute('aria-hidden', 'true');
});


//  Update active user count badge {#3fb,3}
socket.on('user_count', (count) => {
  liveChatBtn.textContent = `Chat with Active Users (${count})`;
});


// Receive message with Sender Name from other users  {#d11,3}
socket.on('receive_message', (data) => {
  appendMessage(data.text, 'incoming', data.senderName, data.time);
});


// Send Message Function {#dd1,17}
function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. Display locally as sent message
  appendMessage(text, 'user', 'You', time);

  // 2. Emit message along with user's displayName
  socket.emit('send_message', { 
    text: text,
    senderName: currentUserName
  });

  chatInput.value = '';
}


// Helper Function to Render Message Box with Sender Name {#650,31}
function appendMessage(text, type, senderName, time = '') {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${type}`;
  
  // Sender Name Header
  const nameDiv = document.createElement('div');
  nameDiv.className = 'chat-sender';
  nameDiv.textContent = senderName;
  msgDiv.appendChild(nameDiv);


  
  const bodyDiv = document.createElement('div');
  bodyDiv.className = 'chat-body';
  
  const textSpan = document.createElement('span');
  textSpan.textContent = text;
  bodyDiv.appendChild(textSpan);

  if (time) {
    const timeSpan = document.createElement('small');
    timeSpan.className = 'chat-time';
    timeSpan.textContent = time;
    bodyDiv.appendChild(timeSpan);
  }

  msgDiv.appendChild(bodyDiv);

  chatDisplay.appendChild(msgDiv);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// 
// Event Listeners and send message function envoker {#322,6}
sendChatBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});
  }
});

// FAQ toggle behavior: expand/collapse answers {#8aa,32}

document.addEventListener('DOMContentLoaded', () => {
    const qBtns = document.querySelectorAll('.faq-question');
    qBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const ans = btn.nextElementSibling;
            const isOpen = ans.classList.toggle('open');
                        // keep ARIA state in sync for screen readers
                        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });

        // Documentation modal behavior
        const docButton = document.getElementById('docBtn')
        const docModal = document.getElementById('docModal')
        const docClose = docModal && docModal.querySelector('.close-btn')
        function openDoc() {
            if (!docModal) return
            docModal.style.display = 'block'
        }
        function closeDoc() {
            if (!docModal) return
            docModal.style.display = 'none'
        }
        function handleEsc(e) {
            if (e.key === 'Escape') closeDoc()
        }
        if (docButton) docButton.addEventListener('click', openDoc)
        if (docClose) docClose.addEventListener('click', closeDoc)
        if (docModal) docModal.addEventListener('click', (e) => { if (e.target === docModal) closeDoc() })
});
