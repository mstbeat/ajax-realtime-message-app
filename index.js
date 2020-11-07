const bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require('path');

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1103634",
  key: "1c605e4552be6323ef0b",
  secret: "ca041addae1b1e31916c",
  cluster: "ap3",
  useTLS: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.post('/comment',function(req,res){
  console.log(req.body);
  var newMessage = {
    name:req.body.name,
    message:req.body.message
  }
  pusher.trigger("my-channel", "my-event",newMessage);
  res.json({created:true});
});


app.listen(3000);