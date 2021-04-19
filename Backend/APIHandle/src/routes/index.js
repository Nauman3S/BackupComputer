import express from 'express';
import { indexPage } from '../controllers';
import { cashHandlePage } from '../controllers';
import mysql from 'mysql'
//import helmet from 'helmet'
//import 'axios'
//import MqttHandler from './mqtt_handler'
import mqtt from 'mqtt';
import cors from 'cors';
//import axios from 'axios';

// const app=express();
// app.use(helmet())
// app.use(helmet.permittedCrossDomainPolicies({
//       permittedPolicies : "all",

// }));
// app.use(cors({credentials:true , origin:true}))
// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

// })
const indexRouter = express.Router();
//const indexRouter = app;
const cashHandleRouter = express.Router();
//indexRouter.locals.axios=axios;
//axios.defaults.headers.common['Access-Control-Allow-Origin']='*';
// indexRouter.use(cors());

//   indexRouter.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin",'*');
//     res.header("Access-Control-Allow-Headers",'Origin, X-Requested-With, Content-Type, Accept');

// })
//const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

var garageState = ''
var connected = false

client.on('connect', () => {
  client.subscribe('edc-monitor/getActive')
  client.subscribe('edc-monitor/setActive')
  client.subscribe('edc-monitor/createNew')
  client.subscribe('edc-monitor/updatePlayer')
  client.subscribe('edc-monitor/playerExists')
})


var db = mysql.createConnection({
  host: 'srv-captain--gh-mysqldb-db',
  port:3306,
  user: 'root',
  password: 'gh-mysqldb',
  database: 'backupcomputer',
  multipleStatements: true
})
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



indexRouter.get('/', cors(), indexPage);
indexRouter.get('/csh', cors(), cashHandlePage);


indexRouter.post('/registerUser', cors(),function(req, res) {
  let sql = `INSERT INTO Users(FName, LName, Email, Password, Role, Credits, RewardPoints,CreditsRequest,TotalJobs) VALUES (?)`;
  let values = [
    req.body.FName,
    req.body.LName,
    req.body.Email,
    req.body.Password,
    "user",
    "10",
    "5",
    "0",
    "0"
    
  ];
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New player added successfully"
    })
  })
});


indexRouter.post('/loginUser',cors(), function(req, res) {
  let sql = `SELECT * FROM Users WHERE Email='`+req.body.email+`' AND Password='`+req.body.password+`'`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});
indexRouter.post('/updateUser',cors(), function(req, res) {
  //console.log(req);
  let values = [
    
    req.body.FName,
    req.body.LName,
    req.body.Email,
    req.body.Password
    
    
  ];
  let sql = `UPDATE Users SET FName='`+values[0]+`', LName='`+values[1]+`', Email='`+values[2]+`', Password='`+values[3]+`' WHERE Email='`+values[2]+`'`;
  
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    })
  })
});

indexRouter.post('/credReq',cors(), function(req, res) {
  //console.log(req);
  let values = [
    
    req.body.CreditsRequest,
    req.body.Email,
    
    
  ];
  let sql = `UPDATE Users SET CreditsRequest='`+values[0]+`' WHERE Email='`+values[1]+`'`;
  
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    })
  })
});

indexRouter.get('/rewardEqCredits', cors(),function(req, res) {
  
  let sql = `SELECT RewardEqCredits FROM Admin`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});


indexRouter.post('/rewardToCred',cors(), function(req, res) {
  //console.log(req);
  let values = [
    
    req.body.RewardPoints,
    req.body.Credits,
    req.body.Email
    
  ];
  let sql = `UPDATE Users SET RewardPoints='`+values[0]+`' ,Credits='`+values[1]+`' WHERE Email='`+values[2]+`'`;
  
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    })
  })
});



//On new jobs//
indexRouter.post('/rewardCredsUpdate',cors(), function(req, res) {
  //console.log(req);
  let values = [
    
    req.body.RewardPoints,
    req.body.Credits,
    req.body.Email
    
  ];
  let sql = `UPDATE Users SET RewardPoints='`+values[0]+`' ,Credits='`+values[1]+`' WHERE Email='`+values[2]+`'`;
  
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    })
  })
});
indexRouter.post('/getUserLedger',cors(), function(req, res) {
  let sql = `SELECT * FROM Ledger WHERE Email='`+req.body.email+`'`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.post('/ledgerUpdate', cors(),function(req, res) {
  let sql = `INSERT INTO Ledger( FileName, JobType, CreditsUsed, RewardPointsEarned, Email) VALUES (?)`;
  let values = [
    
    req.body.FileName,
    req.body.JobType,
    req.body.CreditsUsed,
    req.body.RewardPointsEarned,
    req.body.Email,
    
    
  ];
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New player added successfully"
    })
  })
});


indexRouter.get('/listAll', cors(),function(req, res) {
  
  let sql = `SELECT * FROM data`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.get('/getActive', cors(),function(req, res) {
  let sql = `SELECT * FROM data WHERE ActiveStatus='1'`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.get('/getUser',cors(), function(req, res) {
  let sql = `SELECT * FROM user`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});



indexRouter.post('/addPlayer', cors(),function(req, res) {
  let sql = `INSERT INTO data(Timestamp, PlayerID, TMIN30, TMOUT30, TMIND, TMOUTD, ActiveStatus) VALUES (?)`;
  let values = [
    req.body.Timestamp,
    req.body.PlayerID,
    req.body.TMIN30,
    req.body.TMOUT30,
    req.body.TMIND,
    req.body.TMOUTD,
    req.body.ActiveStatus
    
  ];
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New player added successfully"
    })
  })
});



client.on('message', (topic, message) => {
  switch (topic) {
    case 'edc-monitor/getActive':
      
      handlegetActive()
      .then(function(results){
        var strData=JSON.stringify(results[0])
        client.publish('edc-monitor/activePlayer', strData)
        
      })
      .catch(function(err){
        console.log("Promise rejection error: "+err);
      })
      break;
    case 'edc-monitor/setActive':
    //handlesetActive(message.toString()).then(function(results1){var m=results1[0]}).catch(function(err){console.log('err',err)});    
    handleDeactivateAll()
      .then(function(results){
       /// var strData=JSON.stringify(results[0])
        // client.publish('edc-monitor/activePlayer', strData)
        // handlesetActive(message).then(function(results){var m=""}).catch(function(err){console.log(err)});
        handlesetActive(message.toString()).then(function(results1){var m=""}).catch(function(err){console.log(err)});  
      })
      .catch(function(err){
        console.log("Promise rejection error: "+err);
      })
      break;
      // client.publish('garage/close', 'Closing;'+message)
      // return handleGarageState(message)
    case 'edc-monitor/playerExists':
      doesPlayerExists(message.toString())
      .then(function(results){
        var strData=JSON.stringify(results[0])
        /// var strData=JSON.stringify(results[0])
        if(typeof strData == 'undefined'){
          client.publish('edc-monitor/playerExistance', 'null')  
        }
        else{
        client.publish('edc-monitor/playerExistance', strData)
        }
         // client.publish('edc-monitor/activePlayer', strData)
         // handlesetActive(message).then(function(results){var m=""}).catch(function(err){console.log(err)});
         //handlesetActive(message.toString()).then(function(results1){var m=""}).catch(function(err){console.log(err)});  
       })
       .catch(function(err){
         console.log("Promise rejection error: "+err);
       })
       break;
      
    case 'edc-monitor/createNew':
      var dataD=message.toString()
      console.log(dataD)
      var DataG=dataD.split(';')
      handleCreateNew(DataG[0],DataG[1],DataG[2],DataG[3],DataG[4],DataG[5],DataG[6])
      .then(function(results){
        var strData=JSON.stringify(results[0])
        //client.publish('edc-monitor/activePlayer', strData)
        
      })
      .catch(function(err){
        console.log("Promise rejection error: "+err);
      })
      break;

    case 'edc-monitor/updatePlayer':
      var dataD=message.toString()
      console.log(dataD)
      var DataG=dataD.split(';')
      handleUpdatePlayer(DataG[0],DataG[1],DataG[2],DataG[3],DataG[4],DataG[5],DataG[6])
      .then(function(results){
        var strData=JSON.stringify(results[0])
        //client.publish('edc-monitor/activePlayer', strData)
        
      })
      .catch(function(err){
        console.log("Promise rejection error: "+err);
      })
      break;
  }
  //console.log('No handler for topic %s', topic)
})
//import async from 'async';
 function handlegetActive(){
  return new Promise(function(resolve, reject){
    db.query(
      `SELECT * FROM data WHERE ActiveStatus='1'`, 
        function(err, rows){                                                
            if(rows === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(rows);
            }
        }
    )}
)}


function doesPlayerExists(PID){
  return new Promise(function(resolve, reject){
    db.query(
      `SELECT * FROM data WHERE PlayerID='`+PID+`'`, 
        function(err, rows){                                                
            if(rows === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(rows);
            }
        }
    )}
)}

function handleDeactivateAll(){
  return new Promise(function(resolve, reject){
    db.query(
      `UPDATE data SET ActiveStatus='0'`, 
        function(err, rows){                                                
              resolve(rows);
            // if(rows === undefined){
            //     reject(new Error("Error rows is undefined"));
            // }else{
            //     resolve(rows);
            // }
        }
    )}  
)}
function handlesetActive(playerID){
  return new Promise(function(resolve, reject){
    db.query(
      `UPDATE data SET ActiveStatus='0' ; UPDATE data SET ActiveStatus='1' WHERE PlayerID='`+playerID+`'`, 
        function(err, rows){                                                
            resolve(rows);
            // if(rows === undefined){
            //     reject(new Error("Error rows is undefined"));
            // }else{
            //     resolve(rows);
            // }
        }
    )}  
)}

function handleCreateNew(Timestamp,PlayerID,TMIN30,TMOUT30,TMIND,TMOUTD,ActiveStatus){
  return new Promise(function(resolve, reject){
  let sql = `INSERT INTO data(Timestamp, PlayerID, TMIN30, TMOUT30, TMIND, TMOUTD, ActiveStatus) VALUES (?)`;
  let values = [
            Timestamp,
            PlayerID,
            TMIN30,
            TMOUT30,
            TMIND,
            TMOUTD,
            ActiveStatus
    
  ];
    db.query(sql,[values],
        function(err, rows){                                                
            if(rows === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(rows);
            }
        }
    )}  
)}

function handleUpdatePlayer(playerID,Timestamp,TMIN30,TMOUT30,TMIND,TMOUTD,ActiveStatus){
  return new Promise(function(resolve, reject){
    
    db.query(
      `UPDATE data SET Timestamp='`+Timestamp+`', TMIN30='`+TMIN30+`', TMOUT30='`+TMOUT30+`', TMIND='`+TMIND+`', TMOUTD='`+TMOUTD+`', ActiveStatus='`+ActiveStatus+`' WHERE PlayerID='`+playerID+`'`, 
        function(err, rows){                                                
            if(rows === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(rows);
            }
        }
    )}  
)}



export default indexRouter;
//export default cashHandleRouter;