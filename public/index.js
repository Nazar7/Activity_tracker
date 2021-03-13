
const activityList = document.getElementById("activityList");

let outputList = ''

const actList = document.getElementById("actList");


const activityStatistikRide = document.getElementById("activityStatistikRide");

let outputStatistikRide = ''

const activityStatistikRun = document.getElementById("activityStatistikRun");

let outputStatistikRun = ''

const distanceRide = document.getElementById("distanceRide")

let outputDistanceRide = ''

const distanceRun = document.getElementById("distanceRun")

let outputDistanceRun = ''


    const addBtn = document.querySelector('#btn-create');


async function allData(){
        const startTime = document.querySelector('#start-time');
        const sTime  = startTime.value;
        const finishTime = document.querySelector('#finish-time');
        const fTime  = finishTime.value;
        const distance = document.querySelector('#distance');
        const dis  = distance.value;
        const e = document.querySelector("#active-type");
        const activeType = e.options[e.selectedIndex].text;
        const dropDown = document.getElementById("active-type");
     
            const month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
          
            var d = new Date();
            var day = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            var n = month[d.getMonth()];
            const date = n + ' ' + day.split('/')[2]

                            const hour = parseInt(finishTime[0]) - parseInt(startTime[0]);
                            const min =  (parseInt(finishTime[1]) - 60) - (parseInt(startTime[1]) - 60);
                                
                            start = sTime.split(":");
                            end = fTime.split(":");
                            var startDate = new Date(0, 0, 0, start[0], start[1], 0);
                            var endDate = new Date(0, 0, 0, end[0], end[1], 0);
                            var diff = endDate.getTime() - startDate.getTime();
                            var hours = Math.floor(diff / 1000 / 60 / 60);
                            diff -= hours * 1000 * 60 * 60;
                            var minutes = Math.floor(diff / 1000 / 60);

                            var fullTime = minutes/60+hours;
                            var speed = (dis/fullTime).toFixed(1);

                            function time(startTime, finishTime) {
                                                            
                             if (hours <= 0){
                                    return restime = (minutes + ' ' + 'minutes')

                                   } else if (minutes<=0) {
                                    return restime = (hours + ' ' + 'h')
                                   } else {
                                    return restime = (hours + ' ' + 'h' + ' ' + minutes + ' ' + 'minutes')
                                   
                                   }
                            }

                            time(startTime, finishTime)

            const data = {
                date: date,
                activeType: activeType,
                dis: dis,
                sTime: sTime,
                fTime: fTime,
                restime: time(startTime, finishTime),
                speed: speed 
            }
                
        if (data.dis == "" && data.sTime == "" && data.fTime == ""){
            alert("Please past all data to empty inputs")
             }else{
                 var last_child = activityList.lastChild
                 outputList += `<div id="actList" class="list"><div class="list-item">${data.date}</div><div class="list-item">${data.activeType}</div> <div class="list-item">${data.dis + ' ' + 'km'}</div><div class="list-item">${data.restime}</div><div class="list-item">${data.speed + " " + 'km/hour'}</div></div>`
                 activityList.innerHTML = outputList
                 const response = await fetch("/", {
                    method: 'POST', 
                    headers: {
                        "Accept": "application/json", 
                        "Content-Type": "application/json" 
                    },
                  
                    body: JSON.stringify(data) // body data type must match "Content-Type" header        
                })
                .then(response => response.json())
                .then(json => {
                    var data = json;
                        if(data[0] !== null){
                            outputStatistikRun = `<div class="statistik-item">${data[0][0]}</div><div class="statistik-item">${data[0][1]}</div><div class="statistik-item">${data[0][2]}</div>`
                            activityStatistikRun.innerHTML = outputStatistikRun
                            outputDistanceRun = `<div>${data[3]}</div>`
                            distanceRun.innerHTML =  outputDistanceRun
                            outputDistanceRide = `<div>${data[2]}</div>`
                            distanceRide.innerHTML = outputDistanceRide  
                            }
                        if(data[1] !== null){
                            outputStatistikRide = `<div class="statistik-item">${data[1][0]}</div><div class="statistik-item">${data[1][1]}</div><div class="statistik-item">${data[1][2]}</div>`
                            activityStatistikRide.innerHTML = outputStatistikRide
                            outputDistanceRun = `<div>${data[3]}</div>`
                            distanceRun.innerHTML =  outputDistanceRun
                            outputDistanceRide = `<div>${data[2]}</div>`
                            distanceRide.innerHTML = outputDistanceRide
                        }
                }).then(() => {
                    startTime.value = '';
                    finishTime.value = '';
                    distance.value = '';
                    dropDown.selectedIndex = 0;

                })
        }

            }
                async function GetData() {
                    const response = await fetch("/api", {
                        method: "GET",
                        headers: { "Accept": "application/json" }
                    });
                    if (response.ok === true) {
                        const data = await response.json();
                        data[0].forEach(dataOutput => { 
                                outputList += `<div id="actList" class="list"><div class="list-item">${dataOutput.date}</div><div class="list-item">${dataOutput.activeType}</div> <div class="list-item">${dataOutput.dis + ' ' + 'km'}</div><div class="list-item">${dataOutput.restime}</div><div class="list-item">${dataOutput.speed + " " + 'km/hour'}</div></div>`
                        });
                            activityList.innerHTML = outputList
                            if(data[1] !== null){
                            outputStatistikRun = `<div class="statistik-item">${data[1][0]}</div><div class="statistik-item">${data[1][1]}</div><div class="statistik-item">${data[1][2]}</div>`
                            activityStatistikRun.innerHTML = outputStatistikRun
                            outputDistanceRun = `<div>${data[3]}</div>`
                            distanceRun.innerHTML =  outputDistanceRun  
                            }else{

                            }
                        if(data[2] !== null){
                            outputStatistikRide = `<div class="statistik-item">${data[2][0]}</div><div class="statistik-item">${data[2][1]}</div><div class="statistik-item">${data[2][2]}</div>`
                            activityStatistikRide.innerHTML = outputStatistikRide
                            outputDistanceRide = `<div>${data[4]}</div>`
                            distanceRide.innerHTML = outputDistanceRide
                        }
        
                            }

                            
                            
  
                    }
  
        GetData();
        addBtn.onclick = allData;



