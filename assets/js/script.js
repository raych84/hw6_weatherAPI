$(document).ready(function () {
  $("#get-data").on("click", function (e) {
    e.preventDefault();
    var inputWeather = $("#dataEntry").val();
    $('#dataEntry').val('');
    console.log("I've been clicked!")
    searchWeather(inputWeather)
  });

  $('#history').on('click', e => {

    if (!e.target.classList.contains('history__item')) return;
    const query = e.target.dataset.search;

    if (!query) return;

    searchWeather(query);

  })
})


function insertHistory(q) {
  const idx = previous.findIndex(p => p === q);


  if (idx < 0) {
    if (previous.length === 5) previous.pop();
    previous.push(q)
  }

  previous = previous.reverse();

}



let previous = [];

function searchWeather(inputWeather) {

  const appID = '166a433c57516f51dfab1f7edaed8413';

  const q = inputWeather.trim()
  let isZip = q.length === 5 && /^\d+$/.test(q);

  insertHistory(q);


  $.ajax({
    type: "GET",
    url: `http://api.openweathermap.org/data/2.5/forecast/daily?${isZip ? 'zip' : 'q'}=${q}&appid=${appID}&units=imperial&cnt=5`,
    dataType: "json"
  })
    .then(function (res) {

      console.log(res);
      // $("<h1>").addClass("city").text(response.name);
      // var todaysDate = $("<p>").attr(response.date).append(cityName);
      // var weatherIcon = $("<img>").attr("src", `http://openweathermap.org/img/wn/${response.icon}@2x.png`);
      // var temperature = $("<p>").text(response.temp);
      // var humidity = $("<p>").text(response.humidity);
      // var windSpeed = $("<p>").text(response.list.wind.speed);
      // var uvIndex = $("<p>").text(response.clouds);

      const container = document.querySelector('#weather-forecast'),
        previousContainer = document.querySelector('#history');

      container.innerHTML = '';
      previousContainer.innerHTML = '';

      container.insertAdjacentHTML('afterBegin', `
      <div class="forecast">
        <h2 class="forecast__city">${res.city.name}, ${res.city.country}</h2>
        <div class="forecast__container">
        ${res.list.map((day, i) => `
          <div class="forecast-card">
            
            <img class="forecast-card__icon" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon">

            
            <p class="forecast-card__day">${!i ? 'Today' : moment.unix(day.dt).format('dddd')}</p>
            <p class="forecast-card__condition">${day.weather[0].main}</p>

            <div class="forecast-card__temp">
              <p class="forecast-card__temp-high">${Math.round(day.temp.max)}&deg;</p>
              <p class="forecast-card__temp-low">${Math.round(day.temp.min)}&deg;</p>
            </div>

            <div class="forecast-card__details">
              <p>${day.humidity}%</p>
              <p>${Math.round(day.speed)} mph</p>
            </div>

          </div>
        `).join('')
        }
        </div>
      </div >
      `);

      previousContainer.insertAdjacentHTML('afterbegin', `
        <div class="history">
          ${previous.map(p => `<div class="history__item" data-search="${p}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
            <p>${p}</p>
            </div>
          `).join('')}
        </div>
      `)



    })
}

      // week 3 day 4

