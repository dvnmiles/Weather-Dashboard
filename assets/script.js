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
var searchFormEl = document.querySelector('#search-form');
var nameInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#today');
var fiveDay = document.getElementById('#forecast');
var getCityweathers = function (city) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=2833a982a66eaa0d8e5212abe0cef25e';

    fetch(apiUrl)
        .then(function (response) {
            console.log(response);
            if (response.ok) {

                return response.json()
            }
            else {
                alert('Error: ' + response.statusText);
            }
        })

        .then(function (data) {
            console.log(data[0].name, data[0].state);
            getWeatherData(data[0].lat, data[0].lon);
            document.querySelector('#weather-metro').innerHTML = data[0].name;
            document.querySelector('#weather-state').innerHTML = data[0].state;
        })
        .catch(function (error) {
            alert('Unable to connect to location ');
        });
};

var getWeatherData = function (lat, lon) {
    var api = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=2833a982a66eaa0d8e5212abe0cef25e&units=imperial'
    fetch(api)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
            else {
                alert('Error: ' + response.statusText);
            }
        })
        .then(function (data) {
            console.log(city);
            var iconImage = 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '.png'


            var cityEl = document.createElement('h4');
            var cityElText = document.createTextNode('Current conditions for:', cityEl);
            cityEl.appendChild(cityElText);
            document.body.appendChild(cityElText);

            var imageEl = document.createElement('img');

            var tempEl = document.createElement('p');
            var tempElText = document.createTextNode('Temperature:', tempEl);
            tempEl.appendChild(tempElText);
            document.body.appendChild(tempElText);


            var humidityEl = document.createElement('p');
            var humidityElText = document.createTextNode('Humidity:', humidityEl);
            humidityEl.appendChild(humidityElText);
            document.body.appendChild(humidityElText);

            var wind_speedEl = document.createElement('p');
            var wind_speedElText = document.createTextNode('Wind Speed (mph):', wind_speedEl);
            wind_speedEl.appendChild(wind_speedElText);
            document.body.appendChild(wind_speedElText);

            var uviEl = document.createElement('p');
            var uviElText = document.createTextNode('UV Index:', uviEl);
            uviEl.appendChild(uviElText);
            document.body.appendChild(uviElText);



            // console.log(data);
            // console.log(data.current.temp);
            // console.log(data.current.humidity);
            // console.log(data.current.wind_speed);
            // console.log(data.current.uvi);
            // console.log(data.current.weather[0].main);
            // console.log(data.current.weather[0].description);
            // console.log(data.current.weather[0].icon);
            displayWeathers(data, city);
            cityEl.innerText = city.value;
            imageEl.setAttribute("src", iconImage);
            tempEl.innerText = data.current.temp;
            humidityEl.innerText = data.current.humidity;
            wind_speedEl.innerText = data.current.wind_speed;
            uviEl.innerText = data.current.uvi;

            cityEl.append(imageEl);
            weatherContainerEl.append(cityElText, cityEl);
            weatherContainerEl.append(tempElText, tempEl);
            weatherContainerEl.append(humidityElText, humidityEl);
            weatherContainerEl.append(wind_speedElText, wind_speedEl);
            weatherContainerEl.append(uviElText, uviEl);

            for (var i = 1; i < 6; i++) {
                console.log(data.daily[i]);
                var dt = new Date(data.daily[i].dt*1000);
                console.log(dt);

                var formatDt = dt.toLocaleDateString(undefined, {
                    weekday: "short", 
                    month: "long", 
                    day: "numeric", 
                    year: "numeric"                    
                }
                )
                
                var wrapperDiv = document.createElement('div');
                var dateEl = document.createElement('h6');
                var dateElText = document.createTextNode(`Day ${i} `, dateEl);
                dateEl.appendChild(dateElText);
                wrapperDiv.appendChild(dateEl);
                document.body.appendChild(dateElText);
                document.body.appendChild(dateElText);
                
            }

            if (data.current.uvi < 3) {
                document.querySelector('#uvi').setAttribute("class", "uv-favorable");
            }
            else if (data.current.uvi >= 3 && data.current.uvi < 6) {
                document.querySelector('#uvi').setAttribute("class", "uv-moderate");
            }
            else {
                document.querySelector('#uvi').setAttribute("class", "uv-severe");
            }
            document.querySelector('#main').innerText = data.current.weather[0].main;
            document.querySelector('#description').innerText = data.current.weather[0].description;
            document.querySelector('#icon').setAttribute("src", iconImage);
            document.getElementById('time').innerText = dt.toLocaleString();
        });
}

//START of fiveDay forcast

var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(event);
    var city = nameInputEl.value.trim();
    console.log(city);
    if (city) {
        weatherContainerEl.textContent = "";
        getCityweathers(city);
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

//This function is creating button history
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

cityFormEl.addEventListener('click', formSubmitHandler);