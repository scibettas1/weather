
var cityName = 'Wayne'

//on click event with button
$('#search-button').on("click", function () {
  cityName = $("#search").val().trim()
});

$('#atlanta').on("click", function () {
  cityName = "Atlanta"
});

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=ed721ed4c74684d8c960d41dea0e52e0";


// We then created an AJAX call
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {

  // convert Kelvin to farenheight
  var temp = Math.ceil(((response.main.temp - 275.13) * 1.8) + 32);
  console.log(temp.toFixed(2))

  $(".temp").html("Temperature: " + temp + " &#8457;");
  $(".city").html("<br>City: " + response.name + "<br>");
  $(".wind").html("Wind: " + response.wind.speed + " MPH");
  $(".humidity").html("Humidity: " + response.main.humidity + " &#37;");


});