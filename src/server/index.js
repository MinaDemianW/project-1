var path = require('path')
const express = require('express')
require('dotenv').config()
const axios = require('axios')
const bodyparser = require('body-parser')
var cors = require('cors')

const app = express()

app.use(express.static('dist'))
app.use(bodyparser.json({extended:true}))
app.use(cors())

// console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

app.post('/api', function (req, res) {
    const txt = req.body.txt;
    // Refer to https://www.educative.io/edpresso/how-to-make-an-axios-post-request
    axios.post('https://api.meaningcloud.com/sentiment-2.1?key=' + process.env.API_KEY + '&lang=en&txt=' + txt)
    .then(respose=> res.send(respose.data))
    .catch(error => {console.log(error)})
})
