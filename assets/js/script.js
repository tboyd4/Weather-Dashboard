
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
    })

    $.ajax({
        url: queryURLFive,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })


}

// event listener for the search click specifically

$("#search-click").on("click", function() {
    let searchingCity = $("#search-input").val();
    searchCity(searchingCity);
})