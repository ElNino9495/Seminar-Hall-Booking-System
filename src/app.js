const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const pdf = require('pdf-creator-node');
const fs = require('fs')
const nodemailer = require('nodemailer')



const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const { off } = require("process");
const { validateHeaderName } = require("http");

mongoose
  .connect("mongodb://127.0.0.1:27017/clubReg")
  .then(() => {
    console.log("MongoDB connection is successful ");
  })
  .catch((err) => {
    console.log("connection was unsuccessful " + err);
  });

var db = mongoose.connection;
db.on("error", () => {
  console.log("error in connecting to database");
});
db.on("open", () => {
  console.log("Connected to Database");
//   var cursor = db.collection("MRD_Reg").find({});
//       cursor.forEach((obj) => {
//         // console.log(obj);});
});

// // console.log(path.join(__dirname,"../public"))
// const static_path = path.join(__dirname,"../public./frontend/index");
// app.use(express.urlencoded({extended: false}));
app.use(express.json());
// app.use(express.static(static_path));
app.use(cors());



app.post("/reg", (req, res) => {
  console.log(req.body);
  // console.log(JSON.parse(JSON.stringify(req.body)));
  var data = JSON.parse(JSON.stringify(req.body));
  var valid ;
  var count = 0;
  if (req.body.venue == "MRD Auditorium") {
    db.collection('MRD_Reg').countDocuments({}).then((num)=>{count = num;
      valid = 1;
      console.log("number of documents:",count);
      if (count == 0) {
      
        db.collection("MRD_Reg").insertOne(data, (err, collection) => {
          if (err) {
            throw err;
          }
          console.log("Record inserted successfully");
          res.json({record : "successful"});
        });
      } 
      else 
      {
        db.collection("MRD_Reg").find({'startDate':data.startDate},{projection:{_id:0}}).toArray((error,RES)=>{
          if(error){throw error}
          console.log(RES);
          if(RES.length==0)
          {
            db.collection("MRD_Reg").find({'startDate':(parseInt(data.startDate.substring(0,2))-1).toString()+data.startDate.substring(2),'selection':'24'}).toArray((ERR,Res)=>{
              if(Res.length==0)
              {
                db.collection("MRD_Reg").insertOne(data, (err, collection) => {
                  if (err) {
                    throw err;
                  }
                  console.log("Record inserted successfully from the else");
                  res.json({record : "successful"});
              })
            }
              else{
            
                res.json({ record: "unsuccessful" });
              }
            
            })
        }
          else{
            
            res.json({ record: "unsuccessful" });
          }
        }
        );
      }
    })
  }
  else if(req.body.venue == "PESU 52 HACKROOM")
  {
    db.collection('PESU 52 HACKROOM').countDocuments({}).then((num)=>{count = num;
      valid = 1;
      console.log("number of documents:",count);
      if (count == 0) {
      
        db.collection("PESU 52 HACKROOM").insertOne(data, (err, collection) => {
          if (err) {
            throw err;
          }
          console.log("Record inserted successfully");
          res.json({record : "successful"});
        });
      } 
      else 
      {
        db.collection("PESU 52 HACKROOM").find({'startDate':data.startDate},{projection:{_id:0}}).toArray((error,RES)=>{
          if(error){throw error}
          console.log(RES);
          if(RES.length==0)
          {
            db.collection("PESU 52 HACKROOM").find({'startDate':(parseInt(data.startDate.substring(0,2))-1).toString()+data.startDate.substring(2),'selection':'24'}).toArray((ERR,Res)=>{
              if(Res.length==0)
              {
                db.collection("PESU 52 HACKROOM").insertOne(data, (err, collection) => {
                  if (err) {
                    throw err;
                  }
                  console.log("Record inserted successfully from the else");
                  res.json({record : "successful"});
              })
            }
              else{
            
                res.json({ record: "unsuccessful" });
              }
            
            })
        }
          else{
            
            res.json({ record: "unsuccessful" });
          }
        }
        );
      }
    })
  }
  else if(req.body.venue == "TECHPARK SEMINAR HALL")
  {
    db.collection('TECHPARK SEMINAR HALL').countDocuments({}).then((num)=>{count = num;
      valid = 1;
      console.log("number of documents:",count);
      if (count == 0) {
      
        db.collection("TECHPARK SEMINAR HALL").insertOne(data, (err, collection) => {
          if (err) {
            throw err;
          }
          console.log("Record inserted successfully");
          res.json({record : "successful"});
        });
      } 
      else 
      {
        db.collection("TECHPARK SEMINAR HALL").find({'startDate':data.startDate},{projection:{_id:0}}).toArray((error,RES)=>{
          if(error){throw error}
          console.log(RES);
          if(RES.length==0)
          {
            db.collection("TECHPARK SEMINAR HALL").find({'startDate':(parseInt(data.startDate.substring(0,2))-1).toString()+data.startDate.substring(2),'selection':'24'}).toArray((ERR,Res)=>{
              if(Res.length==0)
              {
                db.collection("TECHPARK SEMINAR HALL").insertOne(data, (err, collection) => {
                  if (err) {
                    throw err;
                  }
                  console.log("Record inserted successfully from the else");
                  res.json({record : "successful"});
              })
            }
              else{
            
                res.json({ record: "unsuccessful" });
              }
            
            })
        }
          else{
            
            res.json({ record: "unsuccessful" });
          }
        }
        );
      }
    })}
});

app.post("/event_details",(req,res)=>
{
  console.log(req.body)

  var html = fs.readFileSync('pdf_folder/pdf_template.html', 'utf-8');
  var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "15mm",
        contents: '<div style="text-align: center;"></div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: '',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
      }
   };
  // var event_dets = req;
  var users = req.body;
  users.venue_tick1 = "";
  users.venue_tick2 = "";
  users.venue_tick3 = "";
  if(req.body.ticket == "M")
  {
    req.body.ticket = "MRD Auditorium"
    users.venue_tick1 = "Yes";
    
  }
  else if(req.body.ticket == "5")
  {
    req.body.ticket = "PESU 52 HACKROOM"
    users.venue_tick2 = "Yes";
  }
  else
  {
    req.body.ticket = "TECHPARK SEMINAR HALL"
    users.venue_tick3 = "Yes";
  }
  var document = {
    html: html,
    data: {
      users: users,
    },
    path: `pdf_folder/${users.event_nature + "_"+ users.date}.pdf`,
    type: "",
  };  
  pdf.create(document, options)
  .then((res) => {
    console.log(res);
    var index;
    for(index=0;index<users.phone_gmail.length;index++)
    {
      if(users.phone_gmail[index]=='\s')
      {
        break;
      }
    }
    var user_gmail = users.phone_gmail.substring(index,users.phone_gmail.length)
    // console.log(gmail);
    var transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:465,
      secure:true,
      auth:{
        user: 'pesuclubreg@gmail.com',
        pass: 'njfuwifsbrgevlzp'
      }
    });
 
    var message = {   
         from: "pesuclubreg@gmail.com",    
         to:'rohitsuresh15@gmail.com',   
         subject: 'Club Requesting Venue Booking',    
         text: "Dear Sir, Please acknowledge the file attached with this mail and kindly grant permission to the said Club",  
         attachments: [  
         {   
            path:`pdf_folder/${users.event_nature + "_"+ users.date}.pdf`
         }   
         ]   
     };

     transporter.sendMail(message,   
      function(err) {   
        if (!err) { 
            console.log('Email sent ...');
        } else console.log(err);       
    });
  })
  .catch((error) => {
    console.error(error);
  });
  if(req)
  {
    res.json({record:'successful'})
    
  }
  else{
    res.json({record:'unsuccessful'})
  }
 
})

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
