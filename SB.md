

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = nameInputEl.value.trim();

  if (city) {
    getCityweathers(city);

    weatherContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
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
          displayweathers(data.items, language);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  };

var displayweathers = function (weathers, searchTerm) {
  if (weathers.length === 0) {
    weatherContainerEl.textContent = 'No weathersitories found.';
    return;
  }

  weatherSearchTerm.textContent = searchTerm;

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

CityFormEl.addEventListener('submit', formSubmitHandler);
cityButtonsEl.addEventListener('click', buttonClickHandler);
