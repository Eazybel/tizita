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
  }
});

// FAQ toggle behavior: expand/collapse answers
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
// WEB SOCKET APIL DEMONISTRATION

// Chat Modal Controls
const liveChatBtn = document.getElementById('liveChatBtn');
const chatModal = document.getElementById('chatModal');
const closeChatBtn = document.getElementById('closeChatBtn');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatInput = document.getElementById('chatInput');
const chatDisplay = document.getElementById('chatDisplay');

// Open Chat Popup
liveChatBtn.addEventListener('click', () => {
  chatModal.style.display = 'flex';
  chatModal.setAttribute('aria-hidden', 'false');
});

// Close Chat Popup
closeChatBtn.addEventListener('click', () => {
  chatModal.style.display = 'none';
  chatModal.setAttribute('aria-hidden', 'true');
});

// Send Chat Message
function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg user';
  msgDiv.textContent = text;
  
  chatDisplay.appendChild(msgDiv);
  chatInput.value = '';
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

sendChatBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});