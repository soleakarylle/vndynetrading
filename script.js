
let data=[]

fetch("collection.json")
.then(r=>r.json())
.then(json=>{

data=json

if(document.getElementById("totalCount")){
updateStats()
}

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
if(!tbody) return

tbody.innerHTML=""

list.forEach(item=>{

let link=item["Link"]?`<a href="${item["Link"]}" target="_blank">Open</a>`:""

let row=document.createElement("tr")

row.innerHTML=`
<td>${item["Audio / Video"]||""}</td>
<td>${item["Show"]||""}</td>
<td>${item["Date"]||""}</td>
<td>${item["Tour"]||""}</td>
<td>${item["Cast"]||""}</td>
<td>${item["Format"]||""}</td>
`

tbody.appendChild(row)

})

}

function apply(){

let search=document.getElementById("search").value.toLowerCase()
let type=document.getElementById("typeFilter").value
let show=document.getElementById("showFilter").value

let filtered=data.filter(item=>{

let text=(
(item["Show"]||"")+
(item["City"]||"")+
(item["Venue"]||"")
).toLowerCase()

let matchSearch=text.includes(search)
let matchType=!type||item["Audio / Video"]===type
let matchShow=!show||item["Show"]===show
let matchShow=!show||item["Cast"]===cast

return matchSearch&&matchType&&matchShow

})

render(filtered)

}

function populateShows(){

let select=document.getElementById("showFilter")
if(!select) return

let shows=[...new Set(data.map(x=>x["Show"]))].sort()

shows.forEach(show=>{

let opt=document.createElement("option")
opt.value=show
opt.textContent=show
select.appendChild(opt)

})

}
