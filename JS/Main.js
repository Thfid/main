import * as components from "./Eshada.js"

// Start Showing Pop up
let studint = document.getElementById("studints")
let parent = document.getElementById("parents")
let teatcher = document.getElementById("taetchers")

function mainbtn(para , pop){
    let contnet = document.getElementById("content")
    let popup = document.getElementById(pop)
    para.addEventListener("click" , function(e){
        e.preventDefault()
        popup.style.display = "flex"
        popup.style.opacity = "1"
        contnet.style.display = "none"
    })
    let backbtn = document.getElementById(`${pop}Back`);
    backbtn.addEventListener("click" , function(e){
        popup.style.display = "none"
        contnet.style.display = "flex"
    })
}
mainbtn(studint , "studintPop" )
mainbtn(parent , "parentPop")
// End Showing Pop up


let allpop = document.querySelectorAll(".pop")
let accpetUser = document.createElement("div")
accpetUser.classList.add("accpetUser")
let accpetIcon = document.createElement("i")
accpetIcon.classList.add("fa-solid" , "fa-check")
accpetUser.appendChild(accpetIcon)

// add Enter key Event
function enterKeyEvent(field , button) {
    field.onkeydown = function (e) {
        if (e.keyCode == 13) {
            e.preventDefault()
            button.click()
        }
    };   
}

let popcon = document.querySelectorAll(".pop .container")

// Start Parent
let parntsUsers = []
let parentPop = document.getElementById("parentPop")
let parentsSub = document.getElementById("parentSub")
let parntsField = document.getElementById("parentId");
let parentLink = document.getElementById("parentLink")
// Get parents users
fetch("https://thfid.github.io/DataBase/Students.json")
.then(res=>res.json())
.then(res=>res.map(e=>parntsUsers.push(e[Object.keys(e)].parentId)))
parent.addEventListener("click" ,()=>studintsField.focus())

parentsSub.addEventListener("click" , (eve)=>{
    eve.preventDefault()
    new Promise((res , rej)=>{
        if (parntsUsers.includes(parntsField.value)) {
            res()
        }else rej()
    })
    .then(
        res=>{
            popcon.forEach(e=> e.style.animation =  "FadgeOut 0.3s linear 0.1s  forwards")
            parentPop.prepend(accpetUser)
            accpetUser.style.cssText=`
            display: flex;
            animation: Fadgein 0.3s linear 0.8s forwards ; `
            sessionStorage.setItem("User" , parntsField.value)
    })
    .then(
        res=>{
            setTimeout(()=>parentLink.click(),1500)
        }
    )
    .catch(
        rej=>{
            if(parntsField.value == ""){
                components.popup("info" , "الرجاء إدخال رقم الهوية أولاً")
            } else components.popup("warning" , "خطأ في رقم الهوية")
        }
        )
})
enterKeyEvent(parntsField , parentsSub)
// End Student Login

// Start Student Login
let studintsUsers = []
let studintPop = document.getElementById("studintPop")
let studintsSub = document.getElementById("studintSub")
let studintsField = document.getElementById("studintId");
let studintLink = document.getElementById("studientLink")

fetch("https://thfid.github.io/DataBase/Students.json")
.then(res=>res.json())
.then(res=>res.map(e=>studintsUsers.push(Object.keys(e).join(""))))

studint.addEventListener("click" ,()=>studintsField.focus())

studintsSub.addEventListener("click" , (eve)=>{
    eve.preventDefault()
    new Promise((res , rej)=>{
        if (studintsUsers.includes(studintsField.value)) {
            res()
        }else rej()
    })
    .then(
        res=>{
            popcon.forEach(e=> e.style.animation =  "FadgeOut 0.3s linear 0.1s  forwards")
            studintPop.prepend(accpetUser)
            accpetUser.style.cssText=`
            display: flex;
            animation: Fadgein 0.3s linear 0.8s forwards ; `
            sessionStorage.setItem("User" , studintsField.value)
    })
    .then(
        res=>{
            setTimeout(()=>studintLink.click(),1500)
        }
    )
    .catch(
        rej=>{
            if(studintsField.value == ""){
                components.popup("info" , "الرجاء إدخال رقم الهوية أولاً")
            } else components.popup("warning" , "خطأ في رقم الهوية")
        }
        )
})
enterKeyEvent(studintsField , studintsSub)
// End Student Login

console.log("337406");