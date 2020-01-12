

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
        // day 1
        let day1 = response1.list[0].dt_txt;
        let iconCode1 = response1.list[0].weather[0].icon;
        let tempKel1 = response1.list[0].main.temp;
        let temp1 = Math.floor(((tempKel1 - 273.15) * 1.80) + 32);
        let humi1 = response1.list[0].main.humidity;
        var iconUrl1 = "http://openweathermap.org/img/w/" + iconCode1 + ".png";
        setForecast ("1", day1, iconUrl1, temp1, humi1)
        // day 2
        let day2 = response1.list[6].dt_txt;
        let iconCode2 = response1.list[6].weather[0].icon;
        let tempKel2 = response1.list[6].main.temp;
        let temp2 = Math.floor(((tempKel2 - 273.15) * 1.80) + 32);
        let humi2 = response1.list[6].main.humidity;
        var iconUrl2 = "http://openweathermap.org/img/w/" + iconCode2 + ".png";
        setForecast ("2", day2, iconUrl2, temp2, humi2)
        // day 3
        let day3 = response1.list[14].dt_txt;
        let iconCode3 = response1.list[14].weather[0].icon;
        let tempKel3 = response1.list[14].main.temp;
        let temp3 = Math.floor(((tempKel3 - 273.15) * 1.80) + 32);
        let humi3 = response1.list[14].main.humidity;
        var iconUrl3 = "http://openweathermap.org/img/w/" + iconCode3 + ".png";
        setForecast ("3", day3, iconUrl3, temp3, humi3)
        // day 4
        let day4 = response1.list[22].dt_txt;
        let iconCode4 = response1.list[22].weather[0].icon;
        let tempKel4 = response1.list[22].main.temp;
        let temp4 = Math.floor(((tempKel4 - 273.15) * 1.80) + 32);
        let humi4 = response1.list[22].main.humidity;
        var iconUrl4 = "http://openweathermap.org/img/w/" + iconCode4 + ".png";
        setForecast ("4", day4, iconUrl4, temp4, humi4)
        // day 5
        let day5 = response1.list[30].dt_txt;
        let iconCode5 = response1.list[30].weather[0].icon;
        let tempKel5 = response1.list[30].main.temp;
        let temp5 = Math.floor(((tempKel5 - 273.15) * 1.80) + 32);
        let humi5 = response1.list[30].main.humidity;
        var iconUrl5 = "http://openweathermap.org/img/w/" + iconCode5 + ".png";
        setForecast ("5", day5, iconUrl5, temp5, humi5)
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
    if (uv >= 0 && uv <= 2) {
        $("#uv").attr("class", "green");
    } else if (uv > 2 && uv <= 5) {
        $("#uv").attr("class", "yellow");
    } else if (uv >= 6 && uv <= 7) {
        $("#uv").attr("class", "orange");
    } else if (uv >= 8 && uv <= 10) {
        $("#uv").attr("class", "red");
    } else if (uv >= 11) {
        $("#uv").attr("class", "purple");
    }
}

// function to set 5 Day Forecast

function setForecast (day, date, icon, temp, humi) {
    $("#day-"+day).text(date.slice(0, 10));
    $("#temp"+day).text("Temperature: " + temp);
    $("#wicon"+day).attr("src", icon);
    $("#humi"+day).text("Humidity: " + humi);
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
    $("#search-input").val("")
})

// event listener for history buttons

$(document).on("click", ".city-history", function() {
    console.log("i am button click");
    let getArgument = $(this).attr("data-city-name");
    console.log(getArgument);
    searchCity(getArgument);
})

