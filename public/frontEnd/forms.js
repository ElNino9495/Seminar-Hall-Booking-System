function func(){
    var f_name=document.getElementById('name').value
    var f_event_name=document.getElementById('event_name').value
    var f_phone=document.getElementById('phone').value
    var f_club=document.getElementById('club').value
    var data=[{
        "name": f_name,
        "event": f_event_name,
        "phone": f_phone,
        "club": f_club,
    }]
    var url=require("url")
    var http=require("http")
    var fs=require("fs")
    var qs=require("querystring")
    var mong=require("mongodb").MongoClient
    var mong = require("mongodb").MongoClient
    var url="mongodb://localhost:27017"
    mong.connect(url,(err,db)=>{
        if(err) throw err
        var db0=db.db("data");
        alert("database connected");
        
        db0.collection("student").insertOne(data,(err,res)=>{
            if(err)throw err
            alert("inserted");
            db.close();
            })
    })
    }