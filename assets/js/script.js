// function that displays current weather data when search bar click

function searchCity(cityArg) {
  var city = cityArg;
  let currentLon = "";
  let currentLat = "";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=f41a04a3ef06b441d0a448b858a97ca4";
  var queryURLFive =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=f41a04a3ef06b441d0a448b858a97ca4";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    let resName = response.name;
    let resTempKelv = response.main.temp;
    let resHumi = response.main.humidity;
    let resWind = response.wind.speed;
    let iconCode = response.weather[0].icon;
    console.log(iconCode);
    let resTempFar = (resTempKelv - 273.15) * 1.8 + 32;
    resTempFar = Math.floor(resTempFar);
    var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";

    // nested ajax call to get uv

    currentLon = response.coord.lon;
    currentLat = response.coord.lat;

    var queryURLuv =
      "https://api.openweathermap.org/data/2.5/uvi?appid=f41a04a3ef06b441d0a448b858a97ca4&lat=" +
      currentLat +
      "&lon=" +
      currentLon;

    $.ajax({
      url: queryURLuv,
      method: "GET"
    }).then(function(response2) {
      console.log(response2);
      let resUV = response2.value;
      setUV(resUV);
    });

    setTodayInfo(resName, resTempFar, resHumi, resWind, iconUrl);
  });

  $.ajax({
    url: queryURLFive,
    method: "GET"
  }).then(function(response1) {
    console.log(response1);
    let dayArray = ["1", "2", "3", "4", "5"];

    // first the app will need to go through the massive data returned by the forecast call
    let dataParse = response1.list;
    let dataFinish = [];

    for (var j = 0; j < dataParse.length; j++) {
      if (dataParse[j].dt_txt.slice(11, 19) === "15:00:00") {
        dataFinish.push(dataParse[j]);
      }
    }

    // now that I have an array of length 5 thats just the five days I want, i can use that new array to grab the info
    for (var i = 0; i < dayArray.length; i++) {
      let currentDay = dayArray[i];

      let day1 = dataFinish[i].dt_txt.slice(0, 10);
      let iconCode1 = dataFinish[i].weather[0].icon;
      let tempKel1 = dataFinish[i].main.temp;
      let temp1 = Math.floor((tempKel1 - 273.15) * 1.8 + 32);
      let humi1 = dataFinish[i].main.humidity;
      var iconUrl1 = "https://openweathermap.org/img/w/" + iconCode1 + ".png";
      setForecast(currentDay, day1, iconUrl1, temp1, humi1);
    }
  });
}

// function to set response to html elements

function setTodayInfo(city, temp, humi, wind, icon) {
  let todate = moment().format("LL");
  $("#city-name").text(city + " (" + todate + ")");
  $("#temp").text("Temperature: " + temp);
  $("#humi").text("Humidity: " + humi);
  $("#wind").text("Wind Speed: " + wind + " MPH");
  $("#wicon").attr("src", icon);
}

// function to set UV index for current day

function setUV(uv) {
  $("#uv").text("UV Index: " + uv);
  console.log(uv);
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

function setForecast(day, date, icon, temp, humi) {
  $("#day-" + day).text(date.slice(0, 10));
  $("#temp" + day).text("Temperature: " + temp);
  $("#wicon" + day).attr("src", icon);
  $("#humi" + day).text("Humidity: " + humi);
}

// function to create buttons (search history)

function setSearch() {
  let newButton = $("<button>").text($("#search-input").val());
  newButton.attr("data-city-name", newButton.text());
  newButton.addClass("city-history");
  $("#search-history").prepend(newButton);
}

// event listener for the search click specifically

$("#search-click").on("click", function() {
  console.log("i am search button click");
  let searchingCity = $("#search-input").val();
  searchCity(searchingCity);
  setSearch();
  $("#search-input").val("");
});

// event listener for history buttons

$(document).on("click", ".city-history", function() {
  console.log("i am button click");
  let getArgument = $(this).attr("data-city-name");
  console.log(getArgument);
  searchCity(getArgument);
});
