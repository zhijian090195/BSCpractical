const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

// router.get('/about', function (req, res) {

// })

app.use('/', router)
app.use('/static', express.static(path.join(__dirname + '/static')))
app.listen(process.env.port || 3456);
console.log('listening on port 3456')