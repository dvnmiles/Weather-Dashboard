// Weather API Key (https://home.openweathermap.org/api_keys): 2833a982a66eaa0d8e5212abe0cef25e
// API: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=2833a982a66eaa0d8e5212abe0cef25e
// API call example: api.openweathermap.org/data/2.5/onecall?lat=38.8&lon=12.09&callback=test
// Your API key is 2833a982a66eaa0d8e5212abe0cef25e
// Endpoint:
// Please, use the endpoint api.openweathermap.org for your API calls
// Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2833a982a66eaa0d8e5212abe0cef25e
// Useful links:
// API documentation https://openweathermap.org/api

var cityFormEl = document.querySelector('#city-form');
var cityButtonsEl = document.querySelector('#language-buttons');
var nameInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#weather-container');
var lookUpValue = document.querySelector('#weather-search-term');

var getCityweathers = function (city) {
  var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=2833a982a66eaa0d8e5212abe0cef25e';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        //console.log(response);
        return response.json()
      }
        else {
      alert('Error: ' + response.statusText);
    }
    })

    .then(function (data) {
            console.log(data[0].name,data[0].state);
            getWeatherData(data[0].lat,data[0].lon);
            document.querySelector('#weather-metro').innerHTML = data[0].name;
            document.querySelector('#weather-state').innerHTML = data[0].state;
          })
    .catch(function (error) {
      alert('Unable to connect to location ');
    });
};

var getWeatherData = function (lat, lon) {
  var api='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=2833a982a66eaa0d8e5212abe0cef25e&units=imperial'

  fetch(api)  
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        return response.json()
      }
        else {
      alert('Error: ' + response.statusText);
    }
    })

    .then(function (data) {
         
           console.log(data.current.temp);
           console.log(data.current.humidity);
           console.log(data.current.wind_speed);
           console.log(data.current.main);
           console.log(data.current.description);
           console.log(data.current.icon);
           displayWeathers(data, city);        
           document.querySelector('#temp').innerText = data.current.temp;
           document.querySelector('#humidity').innerText = data.current.humidity;
           document.querySelector('#wind_speed').innerText = data.current.wind_speed;
           document.querySelector('#uvi').innerText = data.current.uvi;
           document.querySelector('#main').innerText = data.current.main;
           document.querySelector('#description').innerText = data.current.description;
           document.querySelector('#icon').innerText = data.current.icon;
           
           //stuck on the time. it was working...
           var dt = new Date();  
           document.getElementById('#time').innerText = dt.toLocaleString();
                  
          })
    .catch(function (error) {
      
      alert('Unable to connect to weather');
      console.log(error);
    });
};

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = nameInputEl.value.trim();

  if (city) {
    getCityweathers(city);
    weatherContainerEl.textContent = "";
    nameInputEl.value = "";
  } 
  else {
    alert('Please enter a city');
  }
};

var buttonClickHandler = function (event) {
  var language = event.target.getAttribute('data-language');

  if (language) {
    getFeaturedweathers(language);

    weatherContainerEl.textContent = 'TESTING';
  }
};

var getFeaturedweathers = function (language) {
  var apiUrl = 'https://api..com/search/weathersitories?q=' + language + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeathers(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayWeathers = function (weathers, searchTerm) {
  if (weathers.length === 0) {
    weatherContainerEl.textContent = 'No weather found.';
    return;
  }
  displayWeathers.textContent = searchTerm;
  for (var i = 0; i < weathers.length; i++) {
    var weatherName = weathers[i].owner.login + '/' + weathers[i].name;
    var weatherEl = document.createElement('a');
    weatherEl.classList = 'list-item flex-row justify-space-between align-center';
    weatherEl.setAttribute('href', './single-weather.html?weather=' + weatherName);

    var titleEl = document.createElement('span');
    titleEl.textContent = weatherName;

    weatherEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (weathers[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + weathers[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    weatherEl.appendChild(statusEl);

    weatherContainerEl.appendChild(weatherEl);
  }
};

cityFormEl.addEventListener('submit', formSubmitHandler);
//cityButtonsEl.addEventListener('click', buttonClickHandler);



////////////////////////////////////////////////////////////

