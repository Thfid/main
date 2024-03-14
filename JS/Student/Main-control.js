let users =[]
let mosqueNumber = "";
let teatchersArray = []
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
            if(!sessionStorage.getItem("Info")){
                mosqueNumber = data.mosqueN
                teatchersArray.push(data.teatcherId)
                let infoObject = {
                    userType : "Student",
                    mosqueN : mosqueNumber,
                    teatchersId : teatchersArray,
                    studentId : data.studintId
                }
                sessionStorage.setItem('Info' , JSON.stringify(infoObject) )
            }  
        }
    })
})

//  Student Log
let studentLog = document.getElementById("studing-log")
studentLog.onclick = ()=>{
    let link = document.createElement("a")
    link.href = "./student-log.html"
    document.body.appendChild(link)
    link.click()
    link.remove()
}

// Report
let reportbtn = document.getElementById("report")
reportbtn.onclick = ()=>{
    let link = document.createElement("a")
    link.href = "./report.html"
    document.body.appendChild(link)
    link.click()
    link.remove()
}

//  LogOut
let logOut = document.getElementById("log-out")
logOut.onclick = ()=>{
    let linkBack = document.createElement("a")
    linkBack.href = "./index.html"
    document.body.appendChild(linkBack)
    linkBack.click()
    linkBack.remove()
}