const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    var apiKey = "YOUR_API_KEY";
    var query = req.body.cityName;
    var units = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, (response) => {
        response.on("data", (data) => {
            var weatherData = JSON.parse(data);
            var weatherDescription = weatherData.weather[0].description;
            var temperature = weatherData.main.temp;
            var icon = weatherData.weather[0].icon;
            var icon_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<head><meta charset='utf-8'></head>")
            res.write("<body style='background-color: #87CEFA'>")
            res.write("<div class='container-fluid' style='width: 50%; margin: 15% auto'>");
            res.write("<p><h3>Weather Description: " + weatherDescription + "</h3></p>");
            res.write("<h1>Current Temperature in " + query + " is " + temperature + "&#8451;</h1>");
            res.write("<img src=" + icon_url + ">");
            res.write("</div>");
            res.write("</body>");
            res.send();
        });
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("App is up and running!");
});
