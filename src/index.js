import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    let unit = $("input:radio[name=temp]:checked").val();
    // console.log(unit);
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showClouds').text(`The cloudiness in ${city} is ${response.clouds.all}%`);
      $('.showF').text(`The temperature in ${city} in ${unit} is ${response.main.temp}`);
      $('.showWeather').text(`The weather in ${city} is ${response.weather[0].main}`);
      $("#showWind").text(`The wind in ${city} is ${response.wind.deg}`);
      $("#showSpeed").text(`The wind in ${city} is ${response.wind.speed}`);
    }
  });

  $('#joke').click(function() {

    let request = new XMLHttpRequest();
    const url = `https://api.chucknorris.io/jokes/random`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showJoke').text(`Joke: ${response.value}`);
      
    }
  });
});