$(document).ready(function () {

  //wrap each ajax call in a seaparte function
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
      //call the other 2 functions
      uvi()
      forcast()
    });
  }
  var uvi = function (city) {
    //ajax for uv index(this doesn't work)
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/uvi/forcast?q=" + city + "&appid=65857d7f4e9480e88e56532b9f03712b",
      method: "GET"
    }).then(function (response) {
      $(".uv").html("UV Index: " + response.value + " &#37;");
      //create if else statements to change color
    });
  }
  var forcast = function (city) {
    //ajax call for 5 day forcast (also does not work)
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=2a9072920062b87bd4001baee7c6639c",
      method: "GET"
    }).then(function (response) {

      // for loop to loop over the forcast 5 times
      for (var i = 0; i < response.length; i++) {
        if (response[i].dt_txt.indexOf('12:00:00') !== -1) {
          //weather variables
          var temp = Math.floor((response[i].main.temp - 273.15) * 1.8 + 32) + " °F";
          var icon = response[i].weather[0].icon;
          var humidity = (response[i].main.humidity) + "%";
          $(".icon").html(icon);
          $(".temp2").html("Temp: " + temp + " &#8457;");
          $(".humidity2").html("Humidity: " + humidity + " &#37;");
        }
      };
    });
  }
  //get items from local storage
  var cities = []
  if (localStorage.getItem("searchHistory")) {
    cities = JSON.parse(window.localStorage.getItem("searchHistory"))
    console.log(cities)
  }
  //function that adds the list item to history without refreshing the page
  function recentSearch() {
    var cityName = $("#search").val().trim();
    var button = $("<button>");
    button.text(cityName).appendTo("#recentCity");
    $(button).addClass("btn btn-light");
  }

  //this one is for the search bar
  $('#search-button').on("click", function (event) {
    event.preventDefault()
    var cityName = $("#search").val().trim();
    cities.push(cityName);
    console.log(cities)
    console.log(cityName)
    searchForCity(cityName)
    localStorage.setItem("searchHistory", JSON.stringify(cities));
    recentSearch()
  });

  //for loop to run through array in local storage
  function pastSearch() {
    for (var i = 0; i < cities.length; i++) {
      var button = $("<button>");
      button.text(cities[i]).appendTo("#history");
      $(button).addClass("btn btn-light");
    }
  }
  pastSearch()

  //on click event for city buttons
  $(".btn").click(function (event) {
    event.preventDefault()
    var cityBtn = $(this).text()
    searchForCity(cityBtn);
    console.log(cityBtn)
  });

});