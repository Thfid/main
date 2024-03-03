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

export {popup , today , logTest}