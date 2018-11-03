const express = require('express')
const bodyParser= require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient

const url='mongodb://Suri:Megasurion01@ds151453.mlab.com:51453/dbase'
var db

MongoClient.connect(url,{useNewUrlParser:true}, (err, client) => {
	if (err) return console.log(err)
  db = client.db('dbase') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000 lol')
  })
  // ... start the server
})


console.log('By the power of graytail!')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {

var cursor = db.collection('messages').find()

db.collection('messages').find().toArray(function(err, results) {
  console.log(results)
  // send HTML file populated with quotes here
})


})
app.post('/message', (req, res) => {
	db.collection('messages').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
  console.log(req.body)
})

