const userInput=document.getElementById("userInput")
const submitBtn=document.getElementById("submitBtn")
const responseContent=document.getElementById("responseContent")
submitBtn.onclick=()=>{
    if(userInput.value.length<1){
        alert("No questions asked")
    }else{
submitBtn.innerText="Loading ..."
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
responseContent.innerText=data
        })
    }
}