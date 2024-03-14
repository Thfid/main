let users =[]
// GitHub
let mosqueNumber = "";
let teatchersArray = []
fetch("https://thfid.github.io/DataBase/Students.json")
// fetch("../DataBase/Teatchers.JSON")
.then(res=>res.json())
.then(res=>res.map(e=>users.push(e)))
.then(res=>{
    users.map(e=>{
        if ( sessionStorage.getItem("User") == e[Object.keys(e)].parentId){
            let data = e[Object.keys(e)]
            let user = document.getElementById("user-welcome")
            user.innerText = 
            `مرحبا ${e[Object.keys(e)].studintName.split(" ")[1].replace("_" , " ")} \
             ${e[Object.keys(e)].studintName.split(" ")[e[Object.keys(e)].studintName.split(" ").length - 1].replace("_" , " ")}`
             if(!teatchersArray.includes(data.teatcherId)){
                teatchersArray.push(data.teatcherId)
             }
             if(!sessionStorage.getItem("Info")){
                mosqueNumber = data.mosqueN
            }
        }
    })
    if(!sessionStorage.getItem("Info")){
        let infoObject = {
            userType : "Parent",
            mosqueN : mosqueNumber,
            teatchersId : teatchersArray
        }
        sessionStorage.setItem('Info' , JSON.stringify(infoObject) )
    }
})


//  Student Log
let studentLog = document.getElementById("studing-log")
studentLog.onclick = ()=>{
    let link = document.createElement("a")
    link.href = "./parent-log.html"
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
