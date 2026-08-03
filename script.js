const userInput=document.getElementById("userInput")
const submitBtn=document.getElementById("submitBtn")
const responseContent=document.getElementById("responseContent")
submitBtn.onclick=()=>{
    responseContent.innerText="sucess"
    console.log("sucess")
    fetch("https://insachatbot.onrender.com/webhook-test/4b84d270-681b-421d-a729-3331ef424e7e",
        {
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({"QUESTION":"what is insa"})
        }
    ).then(res=>{
        return res.json()
    }).then(data=>{
        console.log(data)
    })
}