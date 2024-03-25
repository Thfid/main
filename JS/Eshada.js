function popup(type , msg){
    let holder = document.createElement("div")
    holder.classList.add("pop-holder")
    switch(type){
        case "warning" :
        holder.innerHTML =`<i class="fa-solid fa-circle-exclamation"></i><span>${msg}</span>`
        holder.style.cssText=`
        border-color: #8c1616;
        color: #8c1616;
        `
        break;

        case "info":
            holder.innerHTML =`<i class="fa-solid fa-triangle-exclamation"></i><span>${msg}</span>`
            holder.style.cssText=`
            border-color: #f7931e;
            color: #f7931e;
            `
        break;

        case "accept":
            holder.innerHTML =`<i class="fa-solid fa-circle-check"></i><span>${msg}</span>`
            holder.style.cssText=`
            border-color: var(--main-color);
            color: var(--main-color);
            `
        break;
    }
    document.body.appendChild(holder)
}
function today(){
    let day = new Date().getDay()
    let daysArray = ["الأحد" , "الإثنين" , "الثلاثاء" , "الأربعاء" , "الخميس" , "الجمعة" , "السبت"]
    return daysArray[day]
}
function logTest(...e){
    console.log(e);
}
function addOverLay(opacity = 0.5){
    let lay = document.createElement("div")
    lay.classList.add("overlay")
    document.body.appendChild(lay)
    lay.style.animation = "Fadgeinhalf 0.3s linear 0.1s forwards"
}
function addOverLayQuarter(){
    let lay = document.createElement("div")
    lay.id = "overlay"
    document.body.appendChild(lay)
    lay.style.animation = "FadgeQuarter 0.3s linear 0.1s forwards"
}
function lockEdit(pass , target){
    addOverLay()
    let lockEdit = document.createElement("div")
    lockEdit.classList.add("lock-edit-pop-up")
    let lockEditholder = document.createElement("div")
    lockEditholder.classList.add("holder")

    let spanclose = document.createElement("span")
    spanclose.classList.add("close")
    let closeicon = document.createElement("i")
    closeicon.classList.add("fa-solid")
    closeicon.classList.add("fa-x")
    spanclose.appendChild(closeicon)
    lockEditholder.appendChild(spanclose)

    let lockEditHandel = document.createElement("div")
    lockEditHandel.classList.add("handel")
    let label = document.createElement("label")
    label.setAttribute("for" , "lock-edit-pop-up")
    label.innerHTML = 'أدخل كلمة المرور';
    let input = document.createElement("input")
    input.setAttribute("type" , "password")
    input.setAttribute("id" , "lock-edit-pop-up")
    input.setAttribute("autocomplete" , "off")
    lockEditHandel.appendChild(label)
    lockEditHandel.appendChild(input)
    lockEditholder.appendChild(lockEditHandel)
    lockEdit.appendChild(lockEditholder)

    document.body.appendChild(lockEdit)

    let lay = document.querySelector(".overlay")


    input.onkeyup = ()=>{
        if(input.value == pass){
            lay.remove()
            lockEdit.remove()
        }
    }
    spanclose.onclick = ()=>{
        let a = document.querySelectorAll("tbody tr")
        a[0].click()
        lockEdit.remove()
        lay.remove()
    }
}

let arabicNumberWriten = ["الأولى" ,"الثانية" ,"الثالثة" ,"الرابعة" ,"الخامسة" ,"السادسة",
"السابعة" ,"الثامنة" ,"التاسعة" ,"العاشرة" , "الحادية عشر" ,
"الثانية عشر" ,"الثالثة عشر" ,"الرابعة عشر" ,"الخامسة عشر"] ;
export {popup , today , logTest , addOverLay ,addOverLayQuarter , lockEdit , arabicNumberWriten}