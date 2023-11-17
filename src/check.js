// const express = require("express");
// const path = require("path");
// const app = express();
// const cors = require("cors");
// const pdf = require('pdf-creator-node');
// const fs = require('fs')

// var html = fs.readFileSync('C:\\Web Dev\\project\\pdf_folder\\pdf_template.html','utf-8');
//   var options = {
//     format: "A3",
//     orientation: "portrait",
//     border: "10mm",
//     header: {
//         height: "15mm",
//         contents: '<div style="text-align: center;'
//     },
//     footer: {
//         height: "28mm",
//         contents: {
//             first: '',
//             2: 'Second page', // Any page number is working. 1-based index
//             default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
//             last: 'Last Page'
//         }
//       }
//    };
//   // var event_dets = req;
//   var users = 
//   { 
//     name: 'Samarth , Prestige South Ridge',        
//     phone_gmail: '8073220640 sam@gmail.com',       
//     org_nature: 'College Club , Enactus-PESU',     
//     event_nature: 'Ideathon',
//     chief_guest: 'None',
//     nature_participants: 'PES university Students',
//     num_participants: '120',
//     meals: 'yes',
//     ticket: 'no',
//     date: '29th Sep 2022',
//     timmings: '8:00A.M to 3:30P.M',
//     others: 'None'
//   }
//   ; 
//   var document = {
//     html: html,
//     data: {
//       users: users,
//     },
//     path: "C:\\Web Dev\\project\\pdf_folder\\event_details.pdf",
//     type: "",
//   };  
//   pdf.create(document, options)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

var js = {
  a: "fdsfsf",
  b:"dafafdfs"
}
js.c = "fsdfsfdfs"
console.log(js)
