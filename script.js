async function getWeatherData(city) {
    var apiKey = 'c2fa0fc6a0b2774b24ca5dcd85435f8e';
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

  // the following function will update the UI with the weather data
  function updateWeatherUI(data) {
    if (!data) {
      // Handle error when data is null such as an invalid city search
      return;
    }

    // the following identifiers will update the current weather when the city is searched for
    document.getElementById('title').innerText = `${data.name} (${dayjs.unix(data.dt).format('M/D/YYYY')})`;
    document.getElementById('temp').innerText = `Temp: ${data.main.temp}°F`;
    document.getElementById('wind').innerText = `Wind: ${data.wind.speed} MPH`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
  }

  //the following function will get the information when the search button click event happens
  document.getElementById('searchButton').addEventListener('click', async () => {
    var cityInput = document.getElementById('cityInput').value.trim();

    if (cityInput === '') {
      
      return;
    }

    var weatherData = await getWeatherData(cityInput);

    if (weatherData) {
      updateWeatherUI(weatherData);
      //the following var and query will add the searched city to the search history for easy reference
      var searchHistoryList = document.getElementById('searchHistory');
      var cityButton = document.createElement('button');
      cityButton.className = 'btn btn-link w-100';
      cityButton.innerText = weatherData.name;
      cityButton.addEventListener('click', async () => {
        updateWeatherUI(await getWeatherData(weatherData.name));
      });
      searchHistoryList.appendChild(cityButton);
    }
  });
