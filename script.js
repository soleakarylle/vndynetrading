
let data = []

fetch("collection.json")
.then(r=>r.json())
.then(json=>{

data=json

updateStats()
render(data)

})

function updateStats(){

let total=data.length
let video=data.filter(x=>x["Audio / Video"]==="Video").length
let audio=data.filter(x=>x["Audio / Video"]==="Audio").length

document.getElementById("totalCount").innerText=total
document.getElementById("videoCount").innerText=video
document.getElementById("audioCount").innerText=audio

}

function render(list){

const tbody=document.querySelector("#collectionTable tbody")
tbody.innerHTML=""

list.forEach(item=>{

let row=document.createElement("tr")

let link=item["Link"]?`<a href="${item["Link"]}" target="_blank">Open</a>`:""

row.innerHTML=`
<td>${item["Audio / Video"]||""}</td>
<td>${item["Show"]||""}</td>
<td>${item["Date"]||""}</td>
<td>${item["City"]||""}</td>
<td>${item["Venue"]||""}</td>
<td>${item["Format"]||""}</td>
<td>${link}</td>
`

tbody.appendChild(row)

})

}

document.getElementById("search").addEventListener("input",apply)
document.getElementById("typeFilter").addEventListener("change",apply)
document.getElementById("sort").addEventListener("change",apply)

function apply(){

let search=document.getElementById("search").value.toLowerCase()
let type=document.getElementById("typeFilter").value
let sort=document.getElementById("sort").value

let filtered=data.filter(item=>{

let text=(
(item["Show"]||"")+
(item["City"]||"")+
(item["Venue"]||"")
).toLowerCase()

let matchSearch=text.includes(search)
let matchType=!type||item["Audio / Video"]===type

return matchSearch&&matchType

})

if(sort==="show"){
filtered.sort((a,b)=>(a["Show"]||"").localeCompare(b["Show"]||""))
}

if(sort==="city"){
filtered.sort((a,b)=>(a["City"]||"").localeCompare(b["City"]||""))
}

if(sort==="date"){
filtered.sort((a,b)=>(a["Date"]||"").localeCompare(b["Date"]||""))
}

render(filtered)

}
