const express = require("express")
const app = express();
const mongoose = require("mongoose")
const morgan = require('morgan');
const bodyParser = require('body-parser');
const eventservice = require('./event/eventService');
const cron = require('node-cron');
var cors = require('cors')
const env = require('dotenv').config()
app.use(cors({ credentials: true, origin: true }))
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log("err-----------------------------------------", err)
    } else {
        console.log("process.env.DBURL", process.env.DBURL)
    }
});
app.use(morgan('combined'));
app.use(express.static('./img'));
require('./router')(app)
app.set('views', './views');
app.set('view-engine', 'jade');
const http = require('http');
const chat = require("./schema/chat");
// const eventDao = require("./event/eventDao");
// const userDao = require("./user/userDao");
const port = process.env.PORT;
console.log('Magic happens on port', process.env.PORT);
var server = app.listen(port);
var router = express.Router();
// var ObjectId = require('mongodb').ObjectID;
// var io = require('socket.io').listen(server);
const whitelist = ['http://localhost:4200'];
//app.use(cors({credentials: true, origin: true}))
// app.use(cors({
// 	'allowedHeaders': ['Content-Type'],
// 	'origin': '*',
// 	'preflightContinue': true
// }));
// const nDate = new Date().toLocaleString('en-US', {
//     timeZone: 'Asia/Dubai'
//   });
// console.log(new Date(nDate).toString(), new Date().toString())4

app.use(function (req, res){
    res.status(404);

    if (req.accepts('html')) {
    return res.send(`<style>*{transition:all .6s}html{height:100%}body{font-family:Lato,sans-serif;color:#888;margin:0}#main{display:table;width:100%;height:100vh;text-align:center}.fof{display:table-cell;vertical-align:middle}.fof h1{font-size:50px;display:inline-block;padding-right:12px;animation:type .5s alternate infinite}@keyframes type{from{box-shadow:inset -3px 0 0 #888}to{box-shadow:inset -3px 0 0 transparent}}</style>
    <div id="main">
       <div class="fof">
          <h1>Your Requested Link is Expired</h1>
       </div>
    </div>`);
    }
  
    if (req.accepts('json')) {
        return res.json({ error: 'Not found' });
    }
    res.type('txt').send('Not found');
})

var socket = require('socket.io')(http);
const io = socket.listen(server)
require('./socket/socketHandler')(io)

// cron.schedule('*/59 * * * *', function () {
//     console.log("<==========================running a task every  1 hour======================================>");
//     eventservice.twodaysbeforenotification()
//     eventservice.onedaysbeforenotification()
// });
// cron.schedule('* */1 * * *', function () {
//     console.log("<==========================running a task every  1 minute======================================>");
//     eventservice.oneminafternotification()
//     eventservice.eventhappennotification()
// });


