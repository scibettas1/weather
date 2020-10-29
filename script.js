var searchForCity = function (city) {
  //ajax call for current weather
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ed721ed4c74684d8c960d41dea0e52e0",
    method: "GET"
  }).then(function (response) {
    // convert Kelvin to farenheight
    var temp = Math.ceil(((response.main.temp - 275.13) * 1.8) + 32);
    $(".temp").html("Temp: " + temp + " &#8457;");
    $(".city").html("<br>" + response.name + "<br>");
    $(".wind").html("Wind: " + response.wind.speed + " MPH");
    $(".humidity").html("Humidity: " + response.main.humidity + " &#37;");
    $(".uv").html("UV Index: " + response.main.uvi + " &#37;");
  });
  //ajax for uv index(this doesn't work)
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/uvi/forcast?q=" + city + "&appid=ed721ed4c74684d8c960d41dea0e52e0",
    method: "GET"
  }).then(function (response) {
    $(".uv").html("UV Index: " + response.main.uvi + " &#37;");
  });
  //ajax call for 5 day forcast (in progress)
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forcast?q=" + city + "&appid=ed721ed4c74684d8c960d41dea0e52e0",
    method: "GET"
  }).then(function (response) {
    var temp = Math.ceil(((response.main.temp - 275.13) * 1.8) + 32);
    $(".temp2").html("Temp: " + temp + " &#8457;");
    $(".city2").html("<br>" + response.name + "<br>");
    $(".wind2").html("Wind: " + response.wind.speed + " MPH");
    $(".humidity2").html("Humidity: " + response.main.humidity + " &#37;");
  });
}
var cities = []
if (localStorage.getItem("searchHistory")){
  cities = JSON.parse(localStorage.getItem("searchHistory"))

}

console.log(cities)
//on click event with buttons
//this one is for the search bar
$('#search-button').on("click", function (event) {
  event.preventDefault()
  var cityName = $("#search").val().trim();
  cities.push(cityName);
  console.log(cities)
  searchForCity(cityName)
  localStorage.setItem("searchHistory", JSON.stringify(cities));
});

//get items from local stoage
//for loop to run through array in local storage
function pastSearch() {
  for (var i = 0; i < cities.length; i++) {
    var button = $("<button>");
    button.text(cities[i]).appendTo("#history");
  }
}
pastSearch()
