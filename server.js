const express = require('express');
const path = require('path');
//const fs = require('fs')
// const sslPath = '/etc/letsencrypt/live/vrpacman.com/';
// const options = {
//   key: fs.readFileSync(sslPath + 'privkey.pem'),
//   cert: fs.readFileSync(sslPath + 'fullchain.pem')
// };

const app = express();
//const http = require('https').createServer(options, app);
// const io = require('socket.io')(http);
const port = process.env.PORT || 3000; // 443
var newList = [];
app.use('/', express.static(path.join(__dirname, './client')))
var flag = 0;
var count = 0;
var arr = [[]];
var ok = '';
var pdfreader = require('pdfreader');
function callback() {
  console.log('error');
  parseText(arr);
  console.log('\n\n\n');
 //  for(var i =1;i < arr.length;i++) {
 //  console.log(arr[i]);
 //  console.log('\n');

 // }
}
 new pdfreader.PdfReader().parseFileItems("ok.pdf", function(err, item){
  
  if (err)
    callback(err);
  else if (!item)
    callback();
  else if (item.text) {
    if(item.text == 'Subject:') {
      flag++;
      count = 0;
      arr[flag] = [];
    }
    arr[flag][count] = item.text;
    count++;
  }
});
function parseText(arr) {
    
    for(var i =0;i< arr.length - 1;i++) {
        newList[i] = {};
        newList[i].subjectCode = arr[i][1];
        newList[i].subjectName = arr[i][2];
        newList[i].list = [];
        var j = 3;
        while(j < arr[i].length) {

            newList[i]['list'][Math.floor((j-2)/8)] = [];
            for(var k = 0;k< 8;k++) {
                newList[i]['list'][Math.floor((j-2)/8)].push(arr[i][j+k]);
            }
            j = j + 8;
        }
    }

     for(var i =1;i < newList.length;i++) {
      console.log(newList[i]);
      console.log('\n');
     }
     console.log(newList.length);

}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/wow', function(req, res) {
    console.log('wow');
    res.send(JSON.stringify(newList));
})
 
// // DATABASE
// var mysql = require('mysql');
// var supersecret = require('./config/config');

// mysql.createConnection({
//   user: 'root',
//   password: supersecret.dbPassword,
//   database: 'PacmanVR'
// });

// var Sequelize = require('sequelize');
// var sequelize = new Sequelize('PacmanVR', 'root', supersecret.dbPassword);

// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection established successfully!');
//   })
//   .catch(function(err) {
//     console.log('Unable to connect to the database:', err);
//   });




// // ROUTES
// require('./app/routes.js')(app, passport);


app.listen(port, function() {
  console.log('Server is now connected on port ' + port);
}).on('error', function(err) {
  console.log('err:', err);
});
