import * as surah from "../surah.js"
import HijriJS from "../Hijri.js"
let surahArray = []
surah.surah.forEach(e=>{
    surahArray.push((Object.keys(e).join("")))
})
let users =[]
let currentSurah = "";
let teatchersArray = []
let teatcherId = ""
let mosqueNumber = ""
let studintname = "" ;
// GitHub
fetch("https://thfid.github.io/DataBase/Students.json")
// fetch("../DataBase/Teatchers.JSON")
.then(res=>res.json())
.then(res=>res.map(e=>users.push(e)))
.then(res=>{
    users.map(e=>{
        let data = e[Object.keys(e)]
        if ( sessionStorage.getItem("User") == Object.keys(e)){
            let user = document.getElementById("user-welcome")
            user.innerText = `مرحبا ${data.studintName.split(" ")[0].replace("_" , " ")}`

            studintname = e[Object.keys(e)].studintName.split(" ");
            studintname = `${studintname[0].replace(
              "_",
              " "
            )} ${studintname[1].replace("_", " ")} ${
               studintname[3]
                ? studintname[3].replace("_", " ")
                : studintname[2].replace("_", " ")
            }`;
        }
    })
})
if(sessionStorage.getItem("Info")){
    let data = JSON.parse(sessionStorage.getItem("Info"))
    mosqueNumber = data.mosqueN
    teatcherId = data.teatchersId
}else{
    console.log("Error 505");
}

let lastTsmee = []
let selectedDay = HijriJS.today().toString().split("/")[0]
let selectedMonth = HijriJS.today().toString().split("/")[1]
let selectedYear = HijriJS.today().toString().split("/")[2].slice(0,4)
let currentYear = selectedYear
let currentMonth = +selectedMonth
  fetch(`https://thfid.github.io/DataBase/${mosqueNumber.slice(1)}/${currentYear.slice(2)}/${currentMonth.toString().padStart(2,"0")}/PeriodicEvaluation.json`)
  .then(res=> res.json())
  .then(res=>{
    let database = res[currentMonth.toString().padStart(2,"0")]
    let dbc = 0;
    dbc = database.length - 1

      database[dbc][Object.keys(database[dbc])].daily.map((e , i)=>{
        let data = e[Object.keys(e)]
        if(data.studintname == studintname){
        let memoSurah = data.memoSurah;
            lastTsmee.push({[data.studintname]:{
            memoSurah : memoSurah
            }})
      }
      })
    lastTsmee.forEach(e=>{
      let data = e[Object.keys(e)]
      let studentName = Object.keys(e).join("")
      let firstSurah = data.firstSurah
      let memoSurah = data.memoSurah;
      let revFrom = data.revFrom;
      let studentarray = [memoSurah];
      studentarray.map((ele , index)=>{ 
        function checkValue(parameter){
          if(ele == ""){
            database[parameter][Object.keys(database[parameter])].daily.map((student , i)=>{
              let secondData = student[Object.keys(student)]
              if (secondData.studintname == studentName) {
                switch(index){
                  case 0 :
                    if(data.memoSurah == ""){
                      data.memoSurah  = secondData.memoSurah || "";
                    }
                    break;
                }
              }
            })
          }
        }
        for(let i = database.length - 2 ; i >= 0 ; i --){
          if(ele == ""){
            checkValue(i)
          }
        }
      })
    })
  }).then(res=>{
    let table = document.getElementById("table-body")
    currentSurah = lastTsmee[0][Object.keys(lastTsmee[0])].memoSurah
    let indexOfCurrent = surahArray.indexOf(currentSurah);
    let reviewsdue = []
    let updatedReviews = []
    let counter = 0
    surah.reviews.forEach(e=>{
        if(surahArray.indexOf(e[0]) > indexOfCurrent){
            reviewsdue.push(e)
        }else if ( indexOfCurrent <= 32 && e[0].split(" ").length > 1){
            reviewsdue.push(e)
        }
    })
    if(indexOfCurrent < 57){
        reviewsdue[0] = [reviewsdue[0][0] , reviewsdue [1][1]]
        reviewsdue.splice(1 , 1);
        reviewsdue[1] = [reviewsdue[1][0] , reviewsdue [2][1]]
        reviewsdue.splice(2 , 1)
    }
    if(indexOfCurrent < 50){
        reviewsdue[0] = [reviewsdue[0][0] , reviewsdue [1][1]]
        reviewsdue.splice(1 , 1);
        reviewsdue[1] = [reviewsdue[1][0] , reviewsdue [2][1]]
        reviewsdue.splice(2 , 1)
        reviewsdue[2] = [reviewsdue[2][0] , reviewsdue [3][1]]
        reviewsdue.splice(3 , 1)
    }
    if(indexOfCurrent < 40){
        reviewsdue[3] = [reviewsdue[3][0] , reviewsdue [4][1]]
        reviewsdue.splice(4 , 1);
        reviewsdue[4] = [reviewsdue[4][0] , reviewsdue [5][1]]
        reviewsdue.splice(5 , 1);
    }
    if(indexOfCurrent < 34){
        reviewsdue[1] = [reviewsdue[1][0] , reviewsdue [2][1]]
        reviewsdue.splice(2 , 1);
        reviewsdue[2] = [reviewsdue[2][0] , reviewsdue [3][1]]
        reviewsdue.splice(3 , 1);
        reviewsdue[3] = [reviewsdue[3][0] , reviewsdue [4][1]]
        reviewsdue.splice(4 , 1);
        reviewsdue[4] = [reviewsdue[4][0] , reviewsdue [5][1]]
        reviewsdue.splice(5 , 1);
    }
    if(indexOfCurrent < 32){
      reviewsdue[3] = [reviewsdue[3][0] , "الذاريات"]
      reviewsdue.splice(4 , 1);
      reviewsdue[4] = ["ق" , reviewsdue [5][1]]
      reviewsdue.splice(5 , 1);
    }
    if(indexOfCurrent < 28){
        reviewsdue[5] = [reviewsdue[5][0] , reviewsdue [6][0]]
        reviewsdue.splice(6 , 1);
    }
    reviewsdue.map(e=>{
        if(e.length > 1){
            counter++
            table.innerHTML += `
            <tr>
            <td>${counter}</td>
                <td>${e[0]}</td>
                <td>${e[1]}</td>
            </tr>
            `
        }else{
            counter++
            table.innerHTML += `
            <tr>
            <td>${counter}</td>
                <td colspan="2">${e[0]}</td>
            </tr>
            `
        }
    })
  }
  )

