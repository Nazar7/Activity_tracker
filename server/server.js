const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const bp = require('body-parser');
const mongoose = require('mongoose');
const dbData = require('./models/dbData');
const dbService = require('./models/dbService');

dotenv.config();

console.log('dbData requir => ', dbData);
console.log('dbData from mongoose => ', mongoose.model('dataSchema') );

app.use(express.static(path.join(__dirname, '..', 'public')))


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.post('/', async (req, res) => {
    const data = req.body;
    const newBlogPost = new dbData(req.body);
    newBlogPost.save(async (error) => {
        var ride = await getDataFromDBRide();
        var run = await getDataFromDBRun();
        var distRun = await SumDistRide();
        var distRide = await SumDistRun();
        if(error) {
            res.status(500).json({msg: 'Sorry, internal server error'})
        }else {
            res.json([run, ride, distRun, distRide])
        }
    })
})

async function getDataFromDB(){
    const data = await dbData.find((error, dataDb) => {
        return dataDb
    })
}

async function getDataFromDBRide(){ 
    const data = await dbData.find((error, dataDb) => {
            return dataDb
        })
    const filterRide = await data.filter(ride => {
            if(ride.activeType == 'Ride'){
                return true
            } 
        })
            if(filterRide.length == 0) {
                return console.log('No data')
            }else {
    const longRide = await filterRide.map(statistik => {
            return parseInt(statistik.dis)
        })
    const maxRide = await Math.max(...longRide)
    const maxRideIndex = await longRide.indexOf(maxRide)

    const maxRideDate = await filterRide[maxRideIndex].date;
    const maxRideDis = await filterRide[maxRideIndex].dis;
  
    const maxRideTimeStart = await filterRide[maxRideIndex].sTime;
    const maxRideTimeFinish = await filterRide[maxRideIndex].fTime;

    const maxRideTime = await filterRide[maxRideIndex].restime;
    
    return [maxRideDate, maxRideDis, maxRideTime]
}
    
}


async function getDataFromDBRun(){ 
    const data = await dbData.find((error, dataDb) => {
            return dataDb
        })
        const filterRun = await data.filter(run => {
            if(run.activeType == 'Run') {
                return true
            } 
        })
            if(filterRun.length == 0) {
                return console.log('No data')
            }else {
    const longRun = await filterRun.map(statistik => {
            return parseInt(statistik.dis)
        })
    const maxRun = await Math.max(...longRun)
    
    const maxRunIndex = await longRun.indexOf(maxRun)
    
    const maxRunDate = await filterRun[maxRunIndex].date;
    const maxRunDis = await filterRun[maxRunIndex].dis;
    
    const maxRunTimeStart = await filterRun[maxRunIndex].sTime;
    const maxRunTimeFinish = await filterRun[maxRunIndex].fTime;
    
    const maxRunTime = await filterRun[maxRunIndex].restime;

    return [maxRunDate, maxRunDis, maxRunTime]
}
    
}


async function SumDistRide(){
    const data = await dbData.find((error, dataDb) => {
        return dataDb
    })
const filterRide = await data.filter(ride => {
        if(ride.activeType == 'Ride'){
            return true
        } 
    })
    const sumDisRide = await filterRide.reduce((total, ride) => {
        var totalDistRide = total + parseInt(ride.dis)
        return totalDistRide
    }, 0)
    return sumDisRide
}

async function SumDistRun(){
    const dataRun = await dbData.find((error, dataDb) => {
        return dataDb
    })
    const filterRun = await dataRun.filter(run => {
        if(run.activeType == 'Run') {
            return true
        } 
    })

    const sumDisRun = await filterRun.reduce((total, run) => {
        return total + parseInt(run.dis)
    }, 0)
    return sumDisRun
}




getDataFromDBRun()

getDataFromDBRide()

SumDistRun()

SumDistRide()


app.get('/api', async (req, res) =>{ 
    var ride = await getDataFromDBRide();
    var run = await getDataFromDBRun();
    var distRide = await SumDistRide();
    var distRun = await SumDistRun();
     await dbData.find((error, dataDb) => {
        if (error){
        } else {
            res.json([dataDb, run, ride, distRun, distRide])
        }
       
    })
   
})

app.listen(process.env.PORT,()=>{
    console.log('app is running')
});