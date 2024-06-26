import HijriJS from "./Hijri.js"
import * as surahData from "./surah.js";
import * as components from "./Eshada.js"


let users =[]
let mosqueNumber = ""
let teatchers = '';
if(sessionStorage.getItem("Info")){
let data  = JSON.parse(sessionStorage.getItem("Info"))
mosqueNumber = data.mosqueN.slice(1)
teatchers = data.teatchersId;
}else{
    // Here but the 501 error
}
let goBack = document.getElementById("goback")
goBack.onclick = ()=>{
    history.back()
}
// Start Up Down Buttons
let upbutton = document.querySelector(".up-down-holder .up");
let centerbutton = document.querySelector(".up-down-holder .center");
let downbutton = document.querySelector(".up-down-holder .down");

upbutton.onclick = () => {
  scrollTo(0, 0);
};
centerbutton.onclick = () => {
  scrollTo(0, 350);
};
downbutton.onclick = () => {
  scrollTo(0, 2000);
};
// End Up Down Buttons

// Get Surah Array from other file
let surahArray = []
surahData.surah.forEach(e=>{surahArray.push(Object.keys(e).join(""))})
surahArray.reverse()


let selectedDay = HijriJS.today().toString().split("/")[0]
let selectedMonth = HijriJS.today().toString().split("/")[1]
let selectedYear = HijriJS.today().toString().split("/")[2].slice(0,4)
let currentYear = selectedYear
let currentMonth = +selectedMonth
let currentWeek = Math.floor(+selectedDay / 7)

let tableTitleH1 = document.getElementById("TitleOfTable")
let monthArray = ["صفر" , "محرم", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"]

function tableTitle(){
    let monthtitle = monthArray[+currentMonth - 1]
    let reportType = document.querySelector(".report-type-control.active")
    if(reportType.id == "weekly"){
    switch(currentWeek){
        case 0 :
            tableTitleH1.innerHTML = ` الأسبوع الأول من شهر ${monthtitle}`
            break;
        case 1 :
            tableTitleH1.innerHTML = ` الأسبوع الثاني من شهر ${monthtitle}`
            break;
        case 2 :
            tableTitleH1.innerHTML = ` الأسبوع الثالث من شهر ${monthtitle}`
            break;
        case 3 :
            tableTitleH1.innerHTML = ` الأسبوع الرابع من شهر ${monthtitle}`
            break;
        case 4 :
            tableTitleH1.innerHTML = ` الأيام الأخيرة من شهر ${monthtitle}`
            break;
        }
    } else if(reportType.id == "monthly"){
        tableTitleH1.innerHTML = `شهر ${monthArray[+currentMonth - 1]}`
    }
}
tableTitle()


let nextDataBtn = document.getElementById("next-data")
let preDataBtn = document.getElementById("previous-data")

nextDataBtn.addEventListener("click" , ()=>{
    let reportType = document.querySelector(".report-type-control.active")
    if(reportType.id == "weekly" && currentWeek < 4){
        currentWeek += 1
    } else if(reportType.id == "weekly" && currentWeek == 4) {
        currentWeek = 0
        currentMonth += 1
    }
    if(reportType.id == "monthly"  && currentMonth < 11 ){
        currentMonth +=1
    }
    tableTitle()
    StartData(reportType.id)
})
preDataBtn.addEventListener("click" , ()=>{
    let reportType = document.querySelector(".report-type-control.active")
    if(reportType.id == "weekly" && currentWeek > 0 ){
        currentWeek -= 1
    } else if (reportType.id == "weekly" && currentWeek == 0 ){
        currentWeek = 4
        currentMonth -= 1
    }
    if(reportType.id == "monthly" && currentMonth > 0){
        currentMonth -= 1
    }
    tableTitle()
    StartData(reportType.id)
})

let addedStudint = []
let tableBody = document.querySelector("table tbody")

let weekly = document.getElementById("weekly")
let monthly = document.getElementById("monthly")
let yearly = document.getElementById("yearly")
let reportTypeArray = [weekly , monthly , yearly]
function changeRebortType(btn){
    btn.addEventListener("click" , ()=>{
        reportTypeArray.forEach(e=>e.classList.remove("active"))
        btn.classList.add("active")
        StartData(btn.id)
        tableTitle()
    })
}
changeRebortType(weekly)
changeRebortType(monthly)
changeRebortType(yearly) 


// Start Giting Data
function StartData(reportType){
    addedStudint = []
// GitHub
fetch(`https://thfid.github.io/DataBase/${mosqueNumber}/${currentYear.slice(2)}/${currentMonth.toString().padStart(2,"0")}/PeriodicEvaluation.json`)
// fetch(`../DataBase/${mosqueNumber}/${currentYear.slice(2)}/${currentMonth.toString().padStart(2,"0")}/PeriodicEvaluation.JSON`)
.then(res=>{
    tableBody.innerHTML = ``
    return res.json()
},
rej=>{return components.popup("info" , "لا يوجد بيانات للشهر المحدد")}
)
.then(res=>{
    let database = res[currentMonth.toString().padStart(2,"0")]
    switch (reportType) {
        case "weekly":
            let defferentDays = 0
            let weekData
            switch(database[0][Object.keys(database[0])].day){
                case "الأحد" : 
                defferentDays = 0
                break;
                case "الإثنين" : 
                defferentDays = 1
                break;
                case "الثلاثاء" : 
                defferentDays = 2
                break;
                case "الأربعاء" : 
                defferentDays = 3
                break;
                case "الخميس" : 
                defferentDays = 4
                break;
            }    
            if (currentWeek == 0) {
                switch(database[0][Object.keys(database[0])].day){
                    case "الأحد" : 
                    weekData = database.slice( 0 , 5)
                    break;
                    case "الإثنين" : 
                    weekData = database.slice( 0 , 4)
                    break;
                    case "الثلاثاء" : 
                    weekData = database.slice( 0 , 3)
                    break;
                    case "الأربعاء" : 
                    weekData = database.slice( 0 , 2)
                    break;
                    case "الخميس" : 
                    weekData = database.slice( 0 , 1)
                    break;
                }    
            }else {
                weekData = database.slice((currentWeek * 5 - defferentDays) , ((currentWeek * 5 - defferentDays) + 5))
            }
            database = weekData
            break;
        case "monthly":
            database = database
            break;
        case "yearly":
            break;
        default:
            break;
    }
    return database
})
.then(res=>{
    getdata(res)
    function getdata(data){
        new Promise ((res , rej) =>{
            if(data.length){
                res(data)
            }
            else rej()
            
        }).then(res=>{
            res.map(day=>{
                let data = day[Object.keys(day)]
                data.daily.sort((a , b)=>{
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
            })
            return res
        })
        .then(res=>{
            let admin = false
            let currentTeacher = teatchers
            let tableCount = 0
            res.map(element=>{
                let day = element[Object.keys(element)]
                day.daily.map(ele=>{
                    if (admin == false){
                    if(!addedStudint.includes(Object.keys(ele).join(""))){
                        let data = ele[Object.keys(ele)]
                        if(currentTeacher.includes(data.teatcherId)){
                            tableCount += 1
                            tableBody.innerHTML += `
                            <tr class="a${Object.keys(ele).join("")}">
                            <td class="number-body col-sticky">${tableCount}</td>
                            <td class="name-body col-sticky">${data.studintname}</td>

                            <td class="memoriztion-body">                      
                                <span></span>
                                <div class="outer"></div>
                                <svg width="60px" height="60px">
                                <circle cx="30" cy="30" r="23" stroke-linecap="round" />
                                </svg>                     
                            </td>
                            
                            <td class="commitment-body">
                                <span></span>
                                <div class="outer"></div>
                                <svg width="60px" height="60px">
                                    <circle cx="30" cy="30" r="23" stroke-linecap="round" />
                                </svg>
                            </td>

                            <td class="review-body">
                                <span></span>
                                <div class="outer"></div>
                                <svg width="60px" height="60px">
                                <circle cx="30" cy="30" r="23" stroke-linecap="round" />
                                </svg>
                            </td>

                             <td class="attendence-body">
                                <span></span>
                                <div class="outer"></div>
                                <svg width="60px" height="60px">
                                <circle cx="30" cy="30" r="23" stroke-linecap="round" />
                                </svg>
                            </td>

                            <td class="behavior-body">
                                <span></span>
                                <div class="outer"></div>
                                <svg width="60px" height="60px">
                                <circle cx="30" cy="30" r="23" stroke-linecap="round" />
                                </svg>
                            </td>

                            <td class="total-body">
                                <div class = "rate"></div>
                                <div class="outer"></div>
                                <svg width="100px" height="100px">
                                    <circle cx="50" cy="50" r="28.5" stroke-linecap="round" />
                                </svg>
                            </td>
                            <td class="appre-body">
                                <div class ="appre"></div>
                            </td>
                        </tr>
    
                            `
                            addedStudint.push(Object.keys(ele).join(""))
                        } 
                    }
                    }else{
                        if(!addedStudint.includes(Object.keys(ele).join(""))){
                            let data = ele[Object.keys(ele)]
                            tableCount += 1
                            tableBody.innerHTML += `
                            <tr class="a${Object.keys(ele).join("")}">
                            <td class="number-body col-sticky">${tableCount}</td>
                            <td class="name-body col-sticky">${data.studintname}</td>
                            <td class="memoriztion-body">                      
                                <span></span>
                                <div class="outer"></div>
                                <svg width="60px" height="60px">
                                    <circle cx="30" cy="30" r="23" stroke-linecap="round" />
                                </svg>                     
                            </td>
                            <td class="commitment-body">
                                <span></span>
                                <div class="outer"></div>
                                <svg width="60px" height="60px">
                                    <circle cx="30" cy="30" r="23" stroke-linecap="round" />
                                </svg>
                            </td>
                            <td class="review-body">
                                <span></span>
                                <div class="outer"></div>
                                <svg width="60px" height="60px">
                                    <circle cx="30" cy="30" r="23" stroke-linecap="round" />
                                </svg>
                            </td>
                            <td class="attendence-body">
                                <span></span>
                                <div class="outer"></div>
                                <svg width="60px" height="60px">
                                    <circle cx="30" cy="30" r="23" stroke-linecap="round" />
                                </svg>
                            </td>
                            <td class="behavior-body">
                                <span></span>
                                <div class="outer"></div>
                                <svg width="60px" height="60px">
                                    <circle cx="30" cy="30" r="23" stroke-linecap="round" />
                                </svg>
                                </td>
                                <td class="total-body">
                                <div class = "rate"></div>
                                <div class="outer"></div>
                                <svg width="100px" height="100px">
                                    <circle cx="50" cy="50" r="28.5" stroke-linecap="round" />
                                </svg>
                            </td>
                            <td class="appre-body">
                                <div class ="appre"></div>
                            </td>
                        </tr>
                            `                 
                            addedStudint.push(Object.keys(ele).join(""))
                        }
                    }
                })
    
            })
            return res
        })
        .then(res=>{
            addedStudint.map(id=>{
                let countableDay = 0

                let memoriztion = document.querySelector(`.a${id} .memoriztion-body span`)
                let dayWithMemo = 0
                let memoriztionCircle = document.querySelector(`.a${id} .memoriztion-body svg circle`)
                
                let review = document.querySelector(`.a${id} .review-body span`)
                let dayWithrev = 0
                let reviewCircle = document.querySelector(`.a${id} .review-body svg circle`)

                let attendence = document.querySelector(`.a${id} .attendence-body span`)
                let absentDays = 0
                let attendenceCircle = document.querySelector(`.a${id} .attendence-body svg circle`)

                let behavior = document.querySelector(`.a${id} .behavior-body span`)
                let behaviorDecisiveness = 0
                let behaviorCircle = document.querySelector(`.a${id} .behavior-body svg circle`)
                
                let commitment = document.querySelector(`.a${id} .commitment-body span`)
                let commLiNe = 8;
                let linesTotal = 0
                let todayLinesGem = 0
                let commitmentCircle = document.querySelector(`.a${id} .commitment-body svg circle`)

                let total = document.querySelector(`.a${id} .total-body div.rate`)

                let memoDecisiveness = 0
                let revDecisiveness = 0
                
                let daylength = res.length
                res.map((day , index , array)=>{
                    data = day[Object.keys(day)]
                    data.daily.map(daily=>{

                        if(Object.keys(daily).join("") == id){
                            daily = daily[Object.keys(daily)]
                            // Get Lines Target
                            if(index == Math.floor(daylength / 2)){
                                if(daily.memoSurah == ""){
                                    daylength + 1
                                }else {
                                   if(surahArray.indexOf(daily.memoSurah) > 55){
                                    commLiNe = 8
                                   } else{
                                    commLiNe = 5
                                   }
                                }
                            }
                            if(daily.AttendanceState == 0 || daily.AttendanceState == 2 || daily.AttendanceState == 3 || daily.AttendanceState == 4 || daily.AttendanceState == 5){
                                countableDay += 1
                                // Memoriztion Calc
                                if(daily.memoState){
                                    let dayMis = daily.misteaks
                                    let dayHis = (daily.hesitateds / 2)
                                    memoDecisiveness += dayMis
                                    memoDecisiveness += dayHis
                                    dayWithMemo += 1
                                    if(daily.memoSurah == "" && daily.memoSurahFrom == ""){
                                        memoDecisiveness -= (dayMis + dayHis)
                                        memoDecisiveness += 10
                                    }
                                }
                                // Review Clac
                                if(daily.reviewState){
                                    let dayMis = daily.misteaksRev
                                    let dayHis = (daily.hesitatedsRev / 2)
                                    revDecisiveness += dayMis
                                    revDecisiveness += dayHis
                                    dayWithrev += 1
                                    if(daily.reviewSurahFrom == "" && daily.reviewSurahTo == ""){
                                        revDecisiveness -= (dayMis + dayHis)
                                        revDecisiveness += 10
                                    }
                                }
                                // Attendence Calc
                                if(daily.AttendanceState == 2){
                                    absentDays +=1
                                }
                                if(daily.AttendanceState == 3){
                                    absentDays += 0.25
                                }
                                if(daily.AttendanceState == 4){
                                    absentDays += 0.125
                                }
                                // Behavior
                                behaviorDecisiveness += daily.behaviorArray.length
                                // Commitment
                                linesTotal += +daily.memoSurahLines;
                                todayLinesGem = +daily.memoSurahLines

                            } 


                        }
                    })
                })
                countableDay == 0 ? countableDay = 1 : countableDay = countableDay
                dayWithMemo == 0 ? dayWithMemo = 1 : dayWithMemo = dayWithMemo
                dayWithrev == 0 ? dayWithrev = 1 : dayWithrev = dayWithrev

                // Memoriztion
                memoDecisiveness = 10 - (memoDecisiveness / dayWithMemo)
                memoDecisiveness = memoDecisiveness.toString().split("")
                memoDecisiveness.length > 3 && +memoDecisiveness.join("") < 10 ? memoDecisiveness = memoDecisiveness.slice(0 , 3).join("") : memoDecisiveness = memoDecisiveness.join("")
                memoriztion.innerHTML = memoDecisiveness
                memoriztionCircle.style.strokeDashoffset = `${(10 - memoDecisiveness) * 14.0}`
                if(memoDecisiveness < 7.5 && memoDecisiveness > 4){
                    memoriztion.style.color = "#c19619";
                    memoriztionCircle.style.stroke = "#c19619"
                } else if (memoDecisiveness <= 4){
                    memoriztion.style.color = "#c11d19";
                    memoriztionCircle.style.stroke = "#c11d19"
                }
                // 144 is the max of circle so time rate in 14.4 to get circle
                
                // Review
                revDecisiveness = 10 - (revDecisiveness / dayWithrev)
                revDecisiveness = revDecisiveness.toString().split("")
                revDecisiveness.length > 3 && +revDecisiveness.join("") < 10 ?
                revDecisiveness = revDecisiveness.slice(0 , 3).join("") :
                revDecisiveness = revDecisiveness.join("")

                review.innerHTML = revDecisiveness
                reviewCircle.style.strokeDashoffset = `${(10 - revDecisiveness) * 14.0}`
                if(revDecisiveness < 7.5 && revDecisiveness > 4){
                    review.style.color = "#c19619";
                    reviewCircle.style.stroke = "#c19619"
                } else if (revDecisiveness <= 4){
                    review.style.color = "#c11d19";
                    reviewCircle.style.stroke = "#c11d19"
                }

                // Attendence
                let countOfWeeks = 1
                if(reportType == "monthly"){
                    countOfWeeks = 4
                }
                attendence.innerHTML = (10 - ((absentDays * 2) / countOfWeeks)).toString().slice(0,3)
                attendenceCircle.style.strokeDashoffset = `${((absentDays * 2) / countOfWeeks) * 14.0}`
                if(((absentDays * 2) / countOfWeeks) > 2.5 && ((absentDays * 2) / countOfWeeks) < 5){
                    attendence.style.color = "#c19619";
                    attendenceCircle.style.stroke = "#c19619"
                } else if (((absentDays * 2) / countOfWeeks) >= 5){
                    attendence.style.color = "#c11d19";
                    attendenceCircle.style.stroke = "#c11d19"
                }

                // Behavior
                behavior.innerHTML = 10 - (behaviorDecisiveness * 0.25)
                behaviorCircle.style.strokeDashoffset = `${(behaviorDecisiveness * 0.25) * 14.0}`
                if((behaviorDecisiveness * 0.25) > 2.5 && (behaviorDecisiveness * 0.25) < 5){
                    behavior.style.color = "#c19619";
                    behaviorCircle.style.stroke = "#c19619"
                } else if ((behaviorDecisiveness * 0.25) >= 5){
                    behavior.style.color = "#c11d19";
                    behaviorCircle.style.stroke = "#c11d19"
                }
                
                // commitment
                let commitmentTarget = commLiNe * countableDay
                let commitclac = 0
                let defferent = commitmentTarget - linesTotal
                if(defferent <=0){
                    commitclac = 10
                } else if(defferent > 0){
                    let calc = (linesTotal / commitmentTarget) * 10
                    commitclac = Math.floor(calc)
                    }
                commitment.innerHTML =  commitclac
                commitmentCircle.style.strokeDashoffset = `${(10 - commitclac) * 14.0}`
                if(commitclac < 7 && commitclac > 4){
                    commitment.style.color = "#c19619";
                    commitmentCircle.style.stroke = "#c19619"
                } else if (commitclac  <= 4){
                    commitment.style.color = "#c11d19";
                    commitmentCircle.style.stroke = "#c11d19"
                }

                // Lines Gem
                if (todayLinesGem >= 12){
                    total.setAttribute("gem" , "cyan")
                }else if (todayLinesGem < 12 && todayLinesGem >= 9){
                    total.setAttribute("gem" , "gold")
                }else if (todayLinesGem < 9 && todayLinesGem >= 7){
                    total.setAttribute("gem" , "red")
                }
            })
        })
        .then(res=>{
            let row = document.querySelectorAll("table tbody tr")
            row.forEach(e=>{
                let memoriztion = document.querySelector(`.${e.classList[0]} .memoriztion-body span`)
                let commitment = document.querySelector(`.${e.classList[0]} .commitment-body span`)
                let review = document.querySelector(`.${e.classList[0]} .review-body span`)
                let attendence = document.querySelector(`.${e.classList[0]} .attendence-body span`)
                let behavior = document.querySelector(`.${e.classList[0]} .behavior-body span`)
                let total = document.querySelector(`.${e.classList[0]} .total-body div.rate`)
                let totalCircle = document.querySelector(`.${e.classList[0]} .total-body svg circle`)
                // Full strok is 176
                let cell = document.querySelector(`.${e.classList[0]} .total-body`)

                let rate = +memoriztion.innerHTML + +review.innerHTML + +attendence.innerHTML + +behavior.innerHTML + +commitment.innerHTML
                total.innerHTML = rate.toString().split("").slice(0 , 4).join("")
                totalCircle.style.strokeDashoffset = `${(50 - rate) * 3.52}`
                totalCircle.style.stroke = 'white'
                if(rate >= 40){
                    total.style.color = "var(--green-color)";
                    totalCircle.style.stroke = "var(--green-color)";
                }else if(rate < 40 && rate >= 30){
                    total.style.color = "#108fcb";
                    totalCircle.style.stroke = "#108fcb";
                } else if (rate < 30 && rate >= 20){
                    total.style.color = "#c19619";
                    totalCircle.style.stroke = "#c19619";
                } else if (rate < 20 ){
                    total.style.color = "#c11d19";
                    totalCircle.style.stroke = "#c11d19";
                }
                let appre = document.querySelector(`.${e.classList[0]}  .appre`)
                if(rate >= 45) {
                    if (total.hasAttribute("gem")){
                        switch(total.getAttribute("gem")){
                            case "cyan":
                                appre.innerHTML = `<img src="IMG/gem_cyan.png" alt=""><div>ممتاز</div>`
                                break;
                            case "gold":
                                appre.innerHTML = `<img src="IMG/gem_gold.png" alt=""><div>ممتاز</div>`
                                break;
                            case "red":
                                appre.innerHTML = `<img src="IMG/gem_red.png" alt=""><div>ممتاز</div>`
                                break;
                            }
                        }else appre.innerHTML = `<div>ممتاز</div>`
                    }
                else if(rate < 45 && rate >= 40){
                    if (total.hasAttribute("gem")){
                        switch(total.getAttribute("gem")){
                            case "cyan":
                                appre.innerHTML = `<img src="IMG/gem_cyan.png" alt=""><div>جيد جدًا</div>`
                                break;
                            case "gold":
                                appre.innerHTML = `<img src="IMG/gem_gold.png" alt=""><div>جيد جدًا</div>`
                                break;
                            case "red":
                                appre.innerHTML = `<img src="IMG/gem_red.png" alt=""><div>جيد جدًا</div>`
                                break;
                        }
                    }else appre.innerHTML = `<div>جيد جدًا</div>`
                }
                else if(rate < 40 && rate >= 30) appre.innerHTML = "جيد"
                else if(rate < 30 && rate >= 20) appre.innerHTML = "مقبول"
                else if(rate < 20) appre.innerHTML = "ضعيف"              
            })
        }).then(res=>{
            function sortTable() {
                var table, rows, switching, i, x, y, shouldSwitch;
                table = document.querySelector("table");
                switching = true;
                /*Make a loop that will continue until
                no switching has been done:*/
                while (switching) {
                  //start by saying: no switching is done:
                  switching = false;
                  rows = table.rows;
                  /*Loop through all table rows (except the
                  first, which contains table headers):*/
                  for (i = 1; i < (rows.length - 1); i++) {
                    //start by saying there should be no switching:
                    shouldSwitch = false;
                    /*Get the two elements you want to compare,
                    one from current row and one from the next:*/
                    x = rows[i].getElementsByTagName("TD")[7].children[0];
                    y = rows[i + 1].getElementsByTagName("TD")[7].children[0];
                    //check if the two rows should switch place:
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                      //if so, mark as a switch and break the loop:
                      shouldSwitch = true;
                      break;
                    }
                  }
                  if (shouldSwitch) {
                    /*If a switch has been marked, make the switch
                    and mark that a switch has been done:*/
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                  }
                }
              }
              sortTable()
        })
        .then(res=>{
            let counter = document.querySelectorAll(".number-body.col-sticky")
            let count = 0
            counter.forEach(e=>{
                count +=1
                e.innerHTML = count
            })
        })
        .catch(rej=>{
            tableBody.innerHTML +=`
                        <tr >
                        <th colspan="7" class="no-Data">لا يوجد بيانات لعرضها</th>
                        </tr>
                        `
        })

    }
})

}
StartData("weekly")
