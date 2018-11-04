const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const hbs = require('hbs')

const MongoClient = require('mongodb').MongoClient

const url='mongodb://Suri:Megasurion01@ds151453.mlab.com:51453/dbase'
var db

app.set('view engine', 'hbs')
//app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect(url,{useNewUrlParser:true}, (err, client) => {
	if (err) return console.log(err)
	db = client.db('dbase') // whatever your database name is
	app.listen(3000, () => {
		console.log('listening on 3000 lol')
	})
	// ... start the server
})




app.get('/', (req, res) => {

	var cursor = db.collection('messages').find()

	db.collection('messages').find().toArray(function(err, results) {
	console.log(results)
	console.log(results[0].name)
		res.render('index', { results, base: "test" })
		// send HTML file populated with quotes here
	})



	app.get('/index', (req, res) => {

		res.render('index', { info: 'OK' })
  
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

