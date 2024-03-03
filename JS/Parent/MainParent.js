import HijriJS from "../Hijri.js"
import * as components from "../Eshada.js"

// Welcome User
// GitHub
let users = []
let childrens =[]
fetch("https://thfid.github.io/DataBase/Students.json")
// fetch("../DataBase/Teatchers.JSON")
.then(res=>res.json())
.then(res=>res.map(e=>users.push(e)))
.then(res=>{
    users.map(e=>{
        if ( sessionStorage.getItem("User") == e[Object.keys(e)].parentId){
            let user = document.getElementById("user-welcome")
            user.innerText = 
            `مرحبا ${e[Object.keys(e)].studintName.split(" ")[1].replace("_" , " ")} \
             ${e[Object.keys(e)].studintName.split(" ")[e[Object.keys(e)].studintName.split(" ").length - 1].replace("_" , " ")}`
            //  Add childerns
            childrens.push(e[Object.keys(e)].studintId)
        }
    })
})

// Next && Back Buttons
let selectedDay = HijriJS.today().toString().split("/")[0]
let selectedMonth = HijriJS.today().toString().split("/")[1]
let selectedYear = HijriJS.today().toString().split("/")[2].slice(0,4)
let currentWeek = Math.floor(+selectedDay / 8)

// Title
let weektitle = document.querySelector(".studint-taple h1")
let monthArray = ["صفر" , "محرم", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شعبان", "ذو القعدة", "ذو الحجة"]
let monthtitle = monthArray[+selectedMonth - 1]

function tableTitle(){
switch(currentWeek){
    case 0 :
        weektitle.innerHTML = ` الأسبوع الأول من شهر ${monthtitle}`
        break;
    case 1 :
        weektitle.innerHTML = ` الأسبوع الثاني من شهر ${monthtitle}`
        break;
    case 2 :
        weektitle.innerHTML = ` الأسبوع الثالث من شهر ${monthtitle}`
        break;
    case 3 :
        weektitle.innerHTML = ` الأسبوع الرابع من شهر ${monthtitle}`
        break;
    case 4 :
        weektitle.innerHTML = ` الأيام الأخيرة من شهر ${monthtitle}`
        break;
}
}
tableTitle()


let nextDataBtn = document.getElementById("next-data")
let preDataBtn = document.getElementById("previous-data")

nextDataBtn.addEventListener("click" , ()=>{
    currentWeek < 4 ? currentWeek += 1 : components.popup("info" , "لايوجد أكثر من 30 يوم في الشهر") 
    StartData()
    tableTitle()
})
preDataBtn.addEventListener("click" , ()=>{
    currentWeek > 0 ? currentWeek -= 1 : components.popup("info" , "هذا أول أسبوع في الشهر الحالي")
    StartData()
    tableTitle()

})

let tableBody = document.querySelector("table tbody")
// Start Giting Data
function StartData(){
    // GitHub
    fetch("https://thfid.github.io/DataBase/PeriodicEvaluation.json")
    // fetch("../DataBase/PeriodicEvaluation.JSON")
    .then(res=>{
        tableBody.innerHTML = ``
        return res.json()
    })
    .then(res=>{
        let sunday = document.querySelector("table thead tr td.day-1 span.date")
        let monday = document.querySelector("table thead tr td.day-2 span.date")
        let tuseday = document.querySelector("table thead tr td.day-3 span.date")
        let wednesday = document.querySelector("table thead tr td.day-4 span.date")
        let thursday = document.querySelector("table thead tr td.day-5 span.date")
        let dayArray = [sunday , monday , tuseday , wednesday , thursday]
        dayArray.map(e=>e.innerHTML = "")

        let monthData = res[selectedYear][selectedMonth]
        let weekData = monthData.slice((currentWeek * 5) , ((currentWeek * 5) + 5))
        let tableCount = 0
        weekData.map(day=>{ 
            let totaldata = day[Object.keys(day)];
            switch(totaldata.day){
                case "الأحد":
                    sunday.innerHTML = totaldata.date.split("/")[0]
                    break;

                case "الإثنين":
                    monday.innerHTML = totaldata.date.split("/")[0]
                    break;

                case "الثلاثاء":
                    tuseday.innerHTML = totaldata.date.split("/")[0]
                    break;

                case "الأربعاء":
                    wednesday.innerHTML = totaldata.date.split("/")[0]
                    break;

                case "الخميس":
                    thursday.innerHTML = totaldata.date.split("/")[0]
                    break;
            } 
        })
        fillDayDate()
        getdata(weekData)
        let addedChildrens = []
        function getdata(weekArray){
                new Promise((res , rej)=>{
                    if(weekArray.length){
                        res()
                    }else rej()
                }).then(
                    res=>{
                        // Extract Every Single Day
                        weekArray.map(element=>{
                            let day = element[Object.keys(element)];
                            day.daily.sort((a , b)=>{
                                let first =  a[Object.keys(a)].studintname
                                let second =  b[Object.keys(b)].studintname
                                if (first < second) {
                                    return -1;
                                }
                                if (first > second) {
                                    return 1;
                                }
                                return 0;
                            });
                            let check = day.daily.some(obj=>{
                              return childrens.includes(Object.keys(obj).join(""))
                            })
                           if(check){
                            day.daily.map(ele=>{
                                if(childrens.includes(Object.keys(ele).join("")) && !addedChildrens.includes(Object.keys(ele).join(""))){
                                    let data = ele[Object.keys(ele)]
                                        tableCount += 1
                                        tableBody.innerHTML += `
                                        <tr class="a${Object.keys(ele).join("")}">
                                        <th class="number body col-sticky">${tableCount}</th>
                                        <th class="name body col-sticky ">${data.studintname}</th>
    
                                        <td class="sunday">
                                            <div class="hundel">
                                                <div class="holder">
                                                    <span class="memo">
                                                        <span class="surah"></span>
                                                        <div class="memo-rate rate"></div>
                                                    </span>
                                                    <span class="rev">
                                                        <span class="from-to"></span>
                                                        <div class="rev-rate rate"></div>
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
    
                                        <td class="monday">
                                            <div class="hundel">
                                                <div class="holder">
                                                    <span class="memo">
                                                        <span class="surah"></span>
                                                        <div class="memo-rate rate"></div>
                                                    </span>
                                                <span class="rev">
                                                    <span class="from-to"></span>
                                                        <div class="rev-rate rate"></div>
                                                    </span>
                                                </div>               
                                            </div>
                                        </td>
    
                                        <td class="tuseday">
                                            <div class="hundel">
                                                <div class="holder">
                                                    <span class="memo">
                                                        <span class="surah"></span>
                                                        <div class="memo-rate rate"></div>
                                                    </span>
                                                    <span class="rev">
                                                        <span class="from-to"></span>
                                                        <div class="rev-rate rate"></div>
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
    
                                        <td class="wednesday">
                                            <div class="hundel">
                                                <div class="holder">
                                                    <span class="memo">
                                                        <span class="surah"></span>
                                                        <div class="memo-rate rate"></div>
                                                    </span>
                                                    <span class="rev">
                                                        <span class="from-to"></span>
                                                        <div class="rev-rate rate"></div>
                                                    </span>
                                                </div>
                                            </div>   
                                        </td>
    
                                        <td class="thursday">
                                            <div class="hundel">
                                                <div class="holder">
                                                    <span class="memo">
                                                        <span class="surah"></span>
                                                        <div class="memo-rate rate"></div>
                                                    </span> 
                                                    <span class="rev">
                                                        <span class="from-to"></span>
                                                        <div class="rev-rate rate"></div>
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
    
                                    </tr>                                        `
                                        addedChildrens.push(Object.keys(ele).join(""));
                            }})


                            function fillCells(data ,id ,day){
                                let currentmemo = document.querySelector(`tr.a${id} td.${day} .holder .memo .surah`)
                                let currentrev = document.querySelector(`tr.a${id} td.${day} .holder .rev .from-to`)
                                let memoRate = document.querySelector(`tr.a${id} td.${day} .memo-rate`)
                                let revRate = document.querySelector(`tr.a${id} td.${day} .rev-rate`)
    
                                currentmemo.innerHTML = `${data.memoSurah != "" ? `${data.memoSurah} (${data.memoSurahFrom} - ${data.memoSurahTo})` : ``}`
                                if(data.memoSurah == "" && data.memoState == true && data.memoSurahFrom == ""){
                                    currentmemo.classList.add("miss-memo")
                                    currentmemo.innerHTML = "لم يسمع"
                                }else if(data.memoSurah != "" && data.memoSurahFrom == "" ){
                                    currentmemo.innerHTML = `${data.memoSurah}`
                                } else if (data.memoSurah == "" && data.memoSurahFrom != ""){
                                    currentmemo.innerHTML = `${data.memoSurahFrom} - ${data.memoSurahTo}`
                                } else if (data.memoSurah == "" && data.memoState == false){
                                    currentmemo.innerHTML = "بدون درس"
                                } 
    
    
                                function revCell(){
                                        if(data.AttendanceState == 0 || data.AttendanceState == 3  || data.AttendanceState == 4){
                                            if(data.reviewSurahFrom != "" && data.reviewSurahTo != ""){
                                                return `${data.reviewSurahFrom} - ${data.reviewSurahTo}`
                                            }else if (data.reviewSurahFrom != "" && data.reviewSurahTo == ""){
                                                return `${data.reviewSurahFrom}`
                                            }
                                            else return  ``
                                        }else{
                                            let attendence = document.querySelector(`tr.a${id} td.${day} .holder`)
                                            if(data.AttendanceState == 2){
                                                attendence.innerHTML = "غائب"
                                                let cell = document.querySelector(`tr.a${id} td.${day}`)
                                                cell.style.backgroundColor = "#c17c197a"
                                            } 
                                            else if (data.AttendanceState == 1) {
                                                attendence.innerHTML = "إجازة"
                                            }
                                            else if (data.AttendanceState == 5) {
                                                attendence.innerHTML = "غياب بعذر"
                                            }
                                        }
                                }
    
                                currentrev.innerHTML = `${revCell()}`
                                if(data.reviewSurahFrom == "" && data.reviewState == true){
                                    currentrev.classList.add("miss-rev")
                                    currentrev.innerHTML = "لم يسمع"
                                } else if (data.reviewSurahFrom == "" && data.reviewState == false){
                                    currentrev.innerHTML = "بدون مراجعة"
                                }
    
                                // Rate calc
                                if(data.AttendanceState == 0 || data.AttendanceState == 3 || data.AttendanceState == 4){
                                  
                                    let memoriztion = 10
                                    memoriztion = memoriztion - (data.hesitateds / 2) - data.misteaks 
                                    if(!data.memoFirstTime){memoriztion -= 1}
    
                                    let review = 10
                                    review = review - (data.hesitatedsRev / 2) - data.misteaksRev
                                    if(!data.reviewFirstTime){review -= 1}
    
                                    let behavior = 0
                                    behavior = (behavior + (data.behaviorArray.length * 0.25))
                                    // Clac Non-Compliance Account
                                    if(data.memoState == true && data.memoSurah == "" && data.memoSurahFrom == ""){
                                        memoriztion = 0
                                    }
                                    if(data.reviewState == true && data.reviewSurahFrom == ""){
                                        review = 0
                                    }
    
                                    // Clac Depending On State
                                    if(data.memoState){memoRate.innerHTML = memoriztion}
                                    else{memoRate.style.display = "none"}
    
                                    if(data.reviewState){revRate.innerHTML = review}
                                    else{revRate.style.display = "none"}
    
                                    if(memoRate.innerHTML < 0) memoRate.innerHTML = 0
                                    if(revRate.innerHTML < 0) memoRate.innerHTML = 0
                                    // Add Color When Lower Then Recommend
                                    function ratecolored(rate){
                                        if(+rate.innerHTML >= 7.5)rate.style.borderColor = "var(--main-color)"
                                        if(+rate.innerHTML < 7.5 && +rate.innerHTML >= 5 ){
                                            rate.style.borderColor = "#c19619"
                                            rate.style.color = "#c19619"
                                        }
                                        if(+rate.innerHTML < 5 ){
                                            rate.style.borderColor = "#c11d19"
                                            rate.style.color = "#c11d19"
                                        }
                                    }
                                    ratecolored(memoRate)
                                    ratecolored(revRate)
                                    if(data.rememo){
                                        currentmemo.innerHTML = `<i class="fa-solid fa-repeat"></i> ${currentmemo.innerHTML} `
                                        currentmemo.style.color = "#c19619"
                                        memoRate.style.color = "#c19619"
                                        memoRate.style.borderColor = "#c19619"
                                    }
                                    if(data.rereview){
                                        currentrev.innerHTML = `<i class="fa-solid fa-repeat"></i>  ${currentrev.innerHTML} `;
                                        currentrev.style.color = "#c19619"
                                        revRate.style.color = "#c19619"
                                        revRate.style.borderColor = "#c19619"
                                    }    
                                    
                                    
                                } 
    
                                }
                                switch(day.day){
                                case "الأحد":
                                    day.daily.map(e=>{
                                        if(childrens.includes(Object.keys(e).join(""))){
                                            fillCells(e[Object.keys(e)] , Object.keys(e).join("") , `sunday`)
                                        }
                                    })
                                    break;
                                case "الإثنين":
                                    day.daily.map(e=>{
                                        if(childrens.includes(Object.keys(e).join(""))){
                                            fillCells(e[Object.keys(e)] , Object.keys(e).join("") , `monday`)
                                        }
                                    })
                                    break;
                                case "الثلاثاء":
                                    day.daily.map(e=>{
                                        if(childrens.includes(Object.keys(e).join(""))){
                                            fillCells(e[Object.keys(e)] , Object.keys(e).join("") , `tuseday`)
                                        }
                                    })
                                    break;
                                case "الأربعاء":
                                    day.daily.map(e=>{
                                        if(childrens.includes(Object.keys(e).join(""))){
                                            fillCells(e[Object.keys(e)] , Object.keys(e).join("") , `wednesday`)
                                        }
                                    })
                                    break;  
                                case "الخميس":
                                    day.daily.map(e=>{
                                        if(childrens.includes(Object.keys(e).join(""))){
                                            fillCells(e[Object.keys(e)] , Object.keys(e).join("") , `thursday`)
                                        }
                                    })
                                    break;
                            }
                        
                    }})
                    let allrate = document.querySelectorAll(".rate")
                            Object.values(allrate).map(e=>{
                                e.innerHTML == "" ? e.style.display = "none" : e
                            })
                    },
                    rej=>{
                        tableBody.innerHTML +=`
                        <tr >
                        <th colspan="7" class="no-Data">لا يوجد بيانات لعرضها</th>
                        </tr>
                        `    
                    }
                )

            }
        function fillDayDate(){
            dayArray.map((element , index , array)=>{
                if(element.innerHTML == ""){
                    if(array[0].innerHTML){
                        element.innerHTML = (+array[index-1].innerHTML + 1).toString().padStart(2 , "0")
                    }
                }
            })
        }
        fillDayDate()
    })
}
StartData()

// Remove Shift From Scroll Horizontall
let tableScroll = document.querySelector(".studint-taple .container")
tableScroll.scrollLeft = 1000
tableScroll.addEventListener("wheel" , (e)=>{
    e.preventDefault()
    tableScroll.scrollLeft += e.deltaY
})


