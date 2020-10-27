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
  });

  //ajax call for 5 day forcast (in progress)
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forcast?q=" + city + "&appid=ed721ed4c74684d8c960d41dea0e52e0",
    method: "GET"
  }).then(function (response) {
    var temp = Math.ceil(((response.main.temp - 275.13) * 1.8) + 32);
    $(".temp").html("Temp: " + temp + " &#8457;");
    $(".city").html("<br>" + response.name + "<br>");
    $(".wind").html("Wind: " + response.wind.speed + " MPH");
    $(".humidity").html("Humidity: " + response.main.humidity + " &#37;");
  });
}

//on click event with buttons
//this one is for the search bar
$('#search-button').on("click", function (event) {
  event.preventDefault()
  var cityName = $("#search").val().trim();
  searchForCity(cityName)
  localStorage.setItem(cityName);
});


//save searches to local storage

//for loop to run through array in local storage
function pastSearch() {
  for (var i = 0; i < cityName.length; i++) {
    var button = $("<button>");
    button.text(cityName[i]).appendTo("aside");
  }
}

$(cityName).val(localStorage.getItem("9"));


//look at our movie assignment and re-think these buttons

/* $('#atlanta').on("click", function () {
  cityName = "Atlanta"
});
$('#austin').on("click", function () {
  cityName = "Austin"
});
$('#chicago').on("click", function () {
  cityName = "Chicago"
});
$('#denver').on("click", function () {
  cityName = "Denver"
});
$('#newYork').on("click", function () {
  cityName = "New York"
});
$('#orlando').on("click", function () {
  cityName = "Orlando"
});
$('#sanFrancisco').on("click", function () {
  cityName = "San Francisco"
});
$('#seattle').on("click", function () {
  cityName = "Seattle"
}); */
