

// function that displays current weather data when search bar click

function searchCity (cityArg) {
    var city = cityArg;
    let currentLon = "";
    let currentLat = "";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f41a04a3ef06b441d0a448b858a97ca4";
    var queryURLFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=f41a04a3ef06b441d0a448b858a97ca4";

    

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

        // nested ajax call to get uv

        currentLon = response.coord.lon;
        currentLat = response.coord.lat;

        var queryURLuv = "http://api.openweathermap.org/data/2.5/uvi?appid=f41a04a3ef06b441d0a448b858a97ca4&lat=" + currentLat + "&lon=" + currentLon;

        $.ajax({
            url: queryURLuv,
            method: "GET"
        }).then(function(response2) {
            console.log(response2);
            let resUV = response2.value;
            setUV(resUV);
        })
        
        setTodayInfo(resName, resTempFar, resHumi, resWind, iconUrl);
    })

    $.ajax({
        url: queryURLFive,
        method: "GET"
    }).then(function(response1){
        console.log(response1);
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

// function to set UV index for current day

function setUV (uv) {
    $("#uv").text("UV Index: " + uv);
}

// function to create buttons (search history)

function setSearch () {
    let newButton = $("<button>").text($("#search-input").val());
    newButton.attr("data-city-name", newButton.text());
    newButton.addClass("city-history");
    $("#search-history").prepend(newButton);
}

// event listener for the search click specifically

$("#search-click").on("click", function() {
    console.log("i am search button click")
    let searchingCity = $("#search-input").val();
    searchCity(searchingCity);
    setSearch();
})

// event listener for history buttons

$(document).on("click", ".city-history", function() {
    console.log("i am button click");
    let getArgument = $(this).attr("data-city-name");
    console.log(getArgument + "BOOP BEEP");
    searchCity(getArgument);
})

