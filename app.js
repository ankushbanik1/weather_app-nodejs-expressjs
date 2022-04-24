const { response } = require("express");
const express = require("express");
const https = require("https");
const app = express();
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    // var city = req.body.n
    // console.log(city)
})
app.post("/", function(req, res) {
    var city = String(req.body.n)
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a791fea9309719738b10433817967669&units=metric'
    https.get(url, function(response) {
        console.log(response.statusCode)

        response.on("data", function(data) {
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp
            const des = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(des)

            res.write("<h1>The temperature in " + city + " is " + temp + " Degree Calcious</h1>")
            res.write("<img src=" + imageurl + ">")
            res.send()
        })
    })

})




app.listen(3000, function() {
    console.log("server")
})