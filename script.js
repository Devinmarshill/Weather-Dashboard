async function getWeatherData(city) {
    var apiKey = '8a7948fcc5bd289d5323d2ddab19f470';
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
      var response = await fetch(url);
      var data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }

  