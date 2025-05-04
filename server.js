/**
 * packege lévő running script
 * 
 * id hogy a json okes response de standard jo
 *
 * de kihagyható mivel ez a idióta kiszedt minden node dolgot, lol
 * server a file neve
 * "scripts": {
   "start" : "node server",
    "dev" : "node --watch sever"
  },
 */

  const express = require('express');
  const app = express();
  //ne felejtsd el a file kesziteni
  //const extra = require('./module.js')
  const fs = require("fs")
  const port = 1212;
  const neptuneCode = "-- neptun kodom --";

  //regual get, 1 feladat
  app.get('/', (req, res) => {
      res.header('Neptun', neptuneCode)
      res.status(200).json({ msg: neptuneCode });
  })

  //url slice, 2 feladat
  app.get('/slice', (req, res) => {
      //majd a nevek legyenek ugyanaz mint url
      let text = req.query.text;
      let a = req.query.a;
      let b = req.query.b;
      res.header('Neptun', neptuneCode)
      if(text == undefined || text == null || text == ""){
          res.status(400).json({msg: "Hiányos szöveg"});
      }
      else if(a == undefined || a == null || a == ""){
          res.status(400).json({msg: "Hiányos szöveg"});
      }
      else if(b == undefined || b == null || b == ""){
          res.status(400).json({msg: "Hiányos szöveg"});
      }
      else{
          res.status(200).json({text: text.slice(a, b)});
      }
  })

  //dinamic generate module, 3 feladat
  app.get('/lista', (req, res) => {
      const n = Math.floor(Math.random() * 9) + 2;
      const m = Math.floor(Math.random() * 9) + 2;
      let text = `Az első ${n} darab, 1től induló, ${m} különbséggel vett szám természetes logaritmusának értékei:`
      var number = 1;
      //ezt majd kulon fileba module.exports megcsinalni
      var tartalom = [];
      for(let i=1; i<=n; i++){
          const value = Math.log(number).toFixed(4);
          tartalom.push(value);
          number += m;
      }
      res.header('Neptun', neptuneCode)
      res.status(200).json({text: text, numbers: tartalom});
  });


  //log file, 4 feladat
  app.get('/log', (req, res) => {
      const fileName = "log.txt"
      var now = new Date();
      const format = {
          year: 'numeric', month: 'long', day: 'numeric',
          hour: '2-digit',minute: '2-digit', second: '2-digit'
      }
      var log = `${now.toLocaleString("hu-HU", format)}\n`
      fs.appendFile(fileName, log, (err) => {
          if(!err){
              console.log(`${fileName} succesfull added new log`)
          }
          else{
              console.log(`${fileName} failed to add new log`)
          }
      })
      res.header('Neptun', neptuneCode)
      fs.readFile(fileName, (err, data) => {
          if(!err){
              res.status(200)
              let content = data.toString().split('\n').filter(x => x != "")
              res.status(200).json({logs: content})
              console.log(`${fileName} succesfull read`)
          }
          else{
              res.status(400).json({msg: "Something went wrong"})
              console.log(`${fileName} failed to read`)
          }
      })
  })

  //app listen hogy futson
  app.listen(port, () => {
      console.log(`Server is running on localhost:${port}`)
  })