import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

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
      $('.showTemp').text(`The temperature in Fahrenheit is ${Math.round((response.main.temp-273)*1.8+32)} degrees.`);
      $('.showVisibility').text(`The visibility is ${response.visibility} feet.`);
      $('.showWindSpeed').text(`The wind speed is ${response.wind.speed} mph.`);
      let iconCode = response.weather[0].icon;
      let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
      $('#showIcon').attr('src', iconUrl);
      $("#icon").show();
    }
  });
  $("#forecast").click(function() {
    const city = $("#location").val();
    $("#location").val();

    let request2 = new XMLHttpRequest();
    const urlForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}`;

    request2.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getForecast(response);
      }
    };

    request2.open("GET", urlForecast, true);
    request2.send();

    function getForecast(response) {
      for (i=0; i<response.list.length; i++) {
        $('.showForecast').text(`The 5-day forecast in ${city} is ${response.list[i].main.temp}`)
      }
    }
  });
});