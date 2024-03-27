import HijriJS from "../Hijri.js"
import * as surahJs from "../surah.js"
import * as components from "../Eshada.js"

let groups = []
let users =[]
let mosqueNumber = ""
let teatcherId = ""
let studintname = "" ;
if(sessionStorage.getItem("Info")){
  let data = JSON.parse(sessionStorage.getItem("Info"));
    mosqueNumber =  data.mosqueN.slice(1);
    teatcherId = data.teatchersId
}else{
  console.log(`Error in`);
}
// GitHub
fetch(`https://thfid.github.io/DataBase/${mosqueNumber}/Students.json`)
// fetch("../DataBase/Teatchers.JSON")
.then(res=>res.json())
.then(res=>res.map(e=>users.push(e)))
.then(res=>{
    users.map(e=>{
        if ( sessionStorage.getItem("User") == Object.keys(e)){
            let user = document.getElementById("user-welcome")
            user.innerText = `مرحبا ${e[Object.keys(e)].studintName.split(" ")[0].replace("_" , " ")}`
            
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

let content = document.querySelector(".groups .container")
fetch(`https://thfid.github.io/DataBase/${mosqueNumber}/Groups.json`)
.then(res=>res.json())
.then(res=>{
  groups = res
  if(!localStorage.getItem(`groups ${HijriJS.today().toString().split("/")[0]}`)){
    localStorage.setItem(`groups ${HijriJS.today().toString().split("/")[0]}` , JSON.stringify(groups))
  }  
})
.then(
  res=>{
    function callData(){
      if (localStorage.getItem(`groups ${HijriJS.today().toString().split("/")[0]}`)){
        content.innerHTML = ``
        let data = JSON.parse(localStorage.getItem(`groups ${HijriJS.today().toString().split("/")[0]}`))
        data.map((e , index)=>{
          if(e.teatcherId == teatcherId){
          let box = document.createElement("div");
          box.classList.add("box")
          box.setAttribute("table-number" , index)
        
          let title = document.createElement("div")
          title.classList.add("title")
        
          let groupNumber = components.arabicNumberWriten[content.children.length]
          let innerTitle = document.createElement("div")
          innerTitle.classList.add("title-content")
          innerTitle.innerHTML = `المجموعة ${groupNumber}`
          title.appendChild(innerTitle)
        
          let contentHolder = document.createElement("div")
          contentHolder.classList.add("content")
        
          let table = document.createElement("table")
          let thead = document.createElement("thead")
          thead.innerHTML = `              
          <th class="number-head">العدد</th>
          <th class="name-head">الاسم</th>
          <th class="rank-head">الرتبة</th>
        `
        let tbody = document.createElement("tbody")
      
          let group = e
          let groupMembersNum = Object.keys(group).length
          for (let i = 0 ; i < groupMembersNum - 1 ; i++){
            let rank = group[`members${i + 1}`].memberRank
            switch (rank) {
              case "قائد":
                  rank = "leader"
                break;
              case "نائب":
                  rank = "deputy"
                break;
            
                default:
                  rank = "member"
                  break;
                }            
            tbody.innerHTML += `
            <tr class="${rank}">
              <td class="number-body">${i + 1}</td>
              <td class="name-body">${group[`members${i + 1}`].membername}</td>
              <td cla>${group[`members${i + 1}`].memberRank}</td>
            </tr>
            `
          }
          box.appendChild(title)
          table.appendChild(thead)
          table.appendChild(tbody)
          contentHolder.appendChild(table)
          box.appendChild(contentHolder)
          content.appendChild(box)
          checkSize()
          }
        })
      }  
    }
    callData()
    // End of Add group
    function checkSize(){
      if((window.innerWidth < 1200 && window.innerWidth > 992) || (window.innerWidth < 710 && window.innerWidth > 650)){
        let namesRows = document.querySelectorAll(".name-body")
        namesRows.forEach(e=>{
        let a = e.innerHTML.split("")
          if (a.length > 20){
            a.length = 20
            a = a.join("")
            a += "..."
            e.innerHTML = a
          }
        })
      }  
    }
    checkSize()
    window.addEventListener('resize' , ()=>{
      checkSize()
    })
    let rows = document.querySelectorAll(".box .content table tbody tr")
    rows.forEach(e=>{
      if(e.children[1].innerHTML == studintname){
        e.style.backgroundColor = "var(--main-hover)"
        e.children[0].style.color = "white"
        e.children[1].style.color = "white"
        e.children[2].style.color = "white"
      }
    })
  })