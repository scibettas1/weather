$(document).ready(function () {
  var searchForCity = function (city) {
    //ajax call for current weather
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ed721ed4c74684d8c960d41dea0e52e0",
      method: "GET"
    }).then(function (response) {
      // convert Kelvin to farenheight
      console.log(response)
      var lat = response.coord.lat
      var lon = response.coord.lon
      var temp = Math.ceil(((response.main.temp - 275.13) * 1.8) + 32);
      var icon = "<img src=https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png>";
      $(".temp").html("Temp: " + temp + " &#8457;");
      $(".icon").html(icon);
      $(".city").html("<br>" + response.name + "<br>");
      $(".wind").html("Wind: " + response.wind.speed + " MPH");
      $(".humidity").html("Humidity: " + response.main.humidity + " &#37;");
      //ajax for uv index
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=65857d7f4e9480e88e56532b9f03712b",
        method: "GET"
      }).then(function (response) {
        $(".uv").html("UV Index: " + response.value + " &#37;");
        //create if else statements to change color
        if (response.value < 2) {
          $(".uv").addClass("low")
        } else if (response.value > 6) {
          $(".uv").removeClass("low")
          $(".uv").addClass("high")
        } else {
          $(".uv").removeClass("low")
          $(".uv").removeClass("high")
          $(".uv").addClass("mod")
        }
      });
    });
    //ajax call for 5 day forcast
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=2a9072920062b87bd4001baee7c6639c",
      method: "GET"
    }).then(function (response) {
      console.log(response)
      // for loop to loop over the forcast 5 times
      for (var i = 0; i < 40; i++) {
        if (response.list[i].dt_txt.indexOf('12:00:00') !== -1) {
          var integer = i
          console.log(i)
          //weather variables
          var dateConvertVal = dateConvert();
          console.log(dateConvertVal);
          var temp2 = Math.floor((response.list[i].main.temp - 273.15) * 1.8 + 32) + " °F";
          var icon2 = "<img src=https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png>";
          var humidity = (response.list[i].main.humidity) + "%";
          $("#date-" + integer).html(dateConvertVal);
          $("#icon-" + integer).html(icon2);
          $("#temp-" + integer).html("Temp: " + temp2);
          $("#humid-" + integer).html("Humidity: " + humidity);
          function dateConvert() {
            var a = new Date(response.list[i].dt_txt);
            console.log(a)
            var monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var year = a.getFullYear();
            var month = monthList[a.getMonth()];
            var date = a.getDate();
            console.log(date)
            var time = month + ' ' + date + ', ' + year;
            console.log(time)
            return time;
          }
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