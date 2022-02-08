import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js';

function clearFields() {
  $('#location').val("");
  $("input:radio[name=temp]:checked").val("");
  $('.showErrors').text("");
  $('.showHumidity').text("");
  $('.showF').text("");
  $('.showClouds').text("");
  $('.showWeather').text("");
  $('#showWind').text("");
  $('#showSpeed').text("");
}

function getElements(response, unit) {
  if (response.main) {
    $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
    $('.showClouds').text(`The cloudiness in ${response.name} is ${response.clouds.all}%`);
      if(unit === "imperial") {
        $('.showF').text(`The temperature in ${response.name} in Fahrenheit is ${response.main.temp}`);
      } else {
        $('.showF').text(`The temperature in ${response.name} in Kelvins is ${response.main.temp}`);
      }  
    $('.showWeather').text(`The weather in ${response.name} is ${response.weather[0].main}`);
    $("#showWind").text(`The wind in ${response.name} is ${response.wind.deg}`);
    $("#showSpeed").text(`The wind speed in ${response.name} is ${response.wind.speed}`);
  } else {
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
}

async function makeApiCall(city, unit) {
  const response = await WeatherService.getWeather(city, unit);
  getElements(response, unit);
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    let unit = $("input:radio[name=temp]:checked").val();
    $('#location').val("");
    clearFields();
    makeApiCall(city, unit);
  });
});