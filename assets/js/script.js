
// openweather api key
var city = "";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f41a04a3ef06b441d0a448b858a97ca4";


// function that displays current weather data when search bar click

function searchCity (cityArg) {
    city = cityArg;
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f41a04a3ef06b441d0a448b858a97ca4";
    queryURLFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=f41a04a3ef06b441d0a448b858a97ca4";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        let resName = response.name;
        let resTempKelv = response.main.temp;
        let resHumi = response.main.humidity;
        let resWind = response.wind.speed;
        let iconCode= response.weather[0].icon;
        console.log(iconCode);
        let resTempFar = ((resTempKelv - 273.15) * 1.80) + 32;
        resTempFar = Math.floor(resTempFar);
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        
        setTodayInfo(resName, resTempFar, resHumi, resWind, iconUrl);
    })

    $.ajax({
        url: queryURLFive,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
}

// function to set response to html elements

function setTodayInfo (city, temp, humi, wind, icon) {
    let todate = moment().format("LL");
    $("#city-name").text(city + " (" + todate + ")");
    $("#temp").text("Temperature: " + temp);
    $("#humi").text("Humidity: " + humi);
    $("#wind").text("Wind Speed: " + wind + " MPH");
    $("#wicon").attr("src", icon);
}

// event listener for the search click specifically

$("#search-click").on("click", function() {
    let searchingCity = $("#search-input").val();
    searchCity(searchingCity);
})