const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    //console.log(req.body.cityName);
    const city = req.body.cityName;
    const appid = "654fa9b6eff9598076a5830a0c9b3daf";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units=" + units;
    https.get(url, function(response){
       console.log(response.statusCode); 

       response.on("data", function(data){
           const weatherData = JSON.parse(data);
           const temp = weatherData.main.temp;
           console.log(temp);
           const description = weatherData.weather[0].description;
           const icon = weatherData.weather[0].icon;
           const imageURL = "http://openweathermap.org/img/wn/" + icon +  "@2x.png"
           res.write("<p> The whether in " + city + " is " + description + " </p>")
           res.write("<h1>The temp  in " + city + " is " + temp + " degrees celcius </h1>");
           res.write("<img src =" + imageURL + ">");
            res.send();
       })

    })
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});