const express = require('express')
const app = express();
const port = 3000;



app.get('/', (req, res) => {
    res.end('helo word')
})







app.listen(port, (err) => {

    if (err) {
        console.log('error in starting the server');
    }

    console.log(`express server is running on port ${port}`)
})