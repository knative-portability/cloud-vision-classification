const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const request = require('request')
const {
	detectLabels,
} = require('./cloud_vision')

morgan('tiny') // loggings

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/detect_labels', (req, res) => {
	if (req.query.url) {
		detectLabels(req.query.url, (labels) => {
			res.status(200).send(JSON.stringify(labels))
		})
	}
	else {
		res.status(400).send('you must supply a "url" param')
	}
})

app.get('/proxy', (req, res) =>	{
	if (req.query.url) {
		request.get(req.query.url).pipe(res)
	}
})

const port = process.env.PORT || 8080
app.listen(port, () => {
	console.log('app listening on port', port)
})
