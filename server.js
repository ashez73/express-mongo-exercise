const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const hbs = require('hbs')
const MongoClient = require('mongodb').MongoClient
//free test db on mlab -no real data here
const url = 'mongodb://Suri:Megasurion01@ds151453.mlab.com:51453/dbase'

let db
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
	if (err) return console.log(err)
	db = client.db('dbase')
	app.listen(3000, () => {
		console.log('listening on 3000')
	})
})
app.get('/', (req, res) => {
	// var cursor = db.collection('messages').find()
	db.collection('messages').find().toArray(function (err, results) {
		res.render('index', { results, base: 'dbase' })
	})
})
app.put('/message', (req, res) => {
	console.log(req.body)
	db.collection('messages')
		.findOneAndUpdate({ name: req.body.name }, {
			$set: {
				name: req.body.name,
				message: req.body.message
			}
		}, {
			sort: { _id: -1 },
			upsert: true
		}, (err, result) => {
			if (err) return res.send(err)
			res.send(result)
		})
})
app.delete('/message', (req, res) => {
	db.collection('messages').findOneAndDelete({ name: req.body.name, message: req.body.message }, {
		sort: { _id: -1 }
	},
	(err, result) => {
		if (err) return res.send(500, err)
		res.send({ message: 'deleted!' })
	})
})
app.post('/message', (req, res) => {
	db.collection('messages').insertOne(req.body, (err, result) => {
		if (err) return console.log(err)
		res.redirect('/')
	})
})

