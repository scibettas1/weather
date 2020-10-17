    // This is our API key. Add your own API key between the ""
    var APIKey = "ed721ed4c74684d8c960d41dea0e52e0";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;

    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Create CODE HERE to Log the queryURL
      console.log(queryURL);
      // Create CODE HERE to log the resulting object
      console.log(response);
      // Create CODE HERE to calculate the temperature (converted from Kelvin)
      var temp = Math.ceil(((response.main.temp -275.13) * 1.8) + 32);
      // Create CODE HERE to transfer content to HTML
      // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
      // Create CODE HERE to dump the temperature content into HTML
      console.log(temp.toFixed(2))
      
      $(".temp").html("Temperature:" + temp);
      $(".city").html("City: " + response.name);
      $(".wind").html("Wind: " + response.wind.speed);
      $(".humidity").html("Humidity: " + response.main.humidity);



    });