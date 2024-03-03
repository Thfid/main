import HijriJS from "./Hijri.js"
import * as components from "./Eshada.js"

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



let selectedDay = HijriJS.today().toString().split("/")[0]
let selectedMonth = HijriJS.today().toString().split("/")[1]
let selectedYear = HijriJS.today().toString().split("/")[2].slice(0,4)
let currentMonth = +selectedMonth
let currentWeek = Math.floor(+selectedDay / 8)

let tableTitleH1 = document.getElementById("TitleOfTable")
let monthArray = ["صفر" , "محرم", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"]
let monthtitle = monthArray[+selectedMonth - 1]

function tableTitle(){
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
    } else if(reportType.id == "monthly"  && currentMonth < 11 ){
        currentMonth +=1
    }
    tableTitle()
    StartData(reportType.id)
})
preDataBtn.addEventListener("click" , ()=>{
    let reportType = document.querySelector(".report-type-control.active")
    if(reportType.id == "weekly" && currentWeek > 0 ){
        currentWeek -= 1
    } else if(reportType.id == "monthly" && currentMonth > 0){
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
fetch("https://thfid.github.io/DataBase/PeriodicEvaluation.json")
// fetch("../DataBase/PeriodicEvaluation.JSON")
.then(res=>{
    tableBody.innerHTML = ``
    return res.json()
})
.then(res=>{
    let database = res[selectedYear][currentMonth.toString().padStart(2,"0")]
    switch (reportType) {
        case "weekly":
            database = database.slice((currentWeek * 5) , ((currentWeek * 5) + 5))
            break;
        case "monthly":
            database = database
            break;
        case "yearly":
            console.log("Good After None");
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
            let tableCount = 0
            res.map(element=>{
                let day = element[Object.keys(element)]
                day.daily.map(ele=>{
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

                            <td class="commitment-body">
                                <span></span>
                                <div class="outer"></div>
                                <svg width="60px" height="60px">
                                    <circle cx="30" cy="30" r="23" stroke-linecap="round" />
                                </svg>
                            </td>
                            <td class="total-body">
                                <div class = "rate"></div>
                            </td>
                            <td class="appre-body">
                                <div class ="appre"></div>
                            </td>
                        </tr>
    
                            `
                            addedStudint.push(Object.keys(ele).join(""))
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
                let linesTotal = 0
                let commitmentCircle = document.querySelector(`.a${id} .commitment-body svg circle`)

                let memoDecisiveness = 0
                let revDecisiveness = 0

                res.map(day=>{
                    data = day[Object.keys(day)]
                    data.daily.map(daily=>{
                        if(Object.keys(daily).join("") == id){
                            daily = daily[Object.keys(daily)]

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
                                linesTotal += +daily.memoSurahLines
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
                attendence.innerHTML = (10 - (absentDays * 2))
                attendenceCircle.style.strokeDashoffset = `${(absentDays * 2) * 14.0}`
                if((absentDays * 2) > 2.5 && (absentDays * 2) < 5){
                    attendence.style.color = "#c19619";
                    attendenceCircle.style.stroke = "#c19619"
                } else if ((absentDays * 2) >= 5){
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
                let commitmentTarget = 7.2 * countableDay
                let commitclac = 0
                let defferent = commitmentTarget - linesTotal
                // console.log(`
                // need :${commitmentTarget}
                // done :${linesTotal}
                // defference : ${defferent}
                // _______________________
                // `);
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

            })
        })
        .then(res=>{
            let row = document.querySelectorAll("table tbody tr")
            row.forEach(e=>{
                let memoriztion = document.querySelector(`.${e.classList[0]} .memoriztion-body span`)
                let review = document.querySelector(`.${e.classList[0]} .review-body span`)
                let attendence = document.querySelector(`.${e.classList[0]} .attendence-body span`)
                let behavior = document.querySelector(`.${e.classList[0]} .behavior-body span`)
                let commitment = document.querySelector(`.${e.classList[0]} .commitment-body span`)
                let total = document.querySelector(`.${e.classList[0]} .total-body div.rate`)
                let cell = document.querySelector(`.${e.classList[0]} .total-body`)

                let rate = +memoriztion.innerHTML + +review.innerHTML + +attendence.innerHTML + +behavior.innerHTML + +commitment.innerHTML
                total.innerHTML = rate.toString().split("").slice(0 , 4).join("")
                cell.style.strokeDashoffset = `${(50 - rate) * 2.88}`
                if(rate < 40 && rate >= 30){
                    cell.style.backgroundColor = "#108fcb";
                } else if (rate < 30 && rate >= 20){
                    cell.style.backgroundColor = "#c19619";
                } else if (rate < 20 ){
                    cell.style.backgroundColor = "#c11d19";
                }

                let appre = document.querySelector(`.${e.classList[0]}  .appre`)
                if(rate >= 45) appre.innerHTML = "ممتاز"
                else if(rate < 45 && rate >= 40) appre.innerHTML = "جيد جدًا"
                else if(rate < 40 && rate >= 30) appre.innerHTML = "جيد"
                else if(rate < 30 && rate > 20) appre.innerHTML = "مقبول"
                else if(rate < 20) appre.innerHTML = "ضعيف"

                 
            })
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
                    x = rows[i].getElementsByTagName("TD")[7];
                    y = rows[i + 1].getElementsByTagName("TD")[7];
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
                count += 1
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
