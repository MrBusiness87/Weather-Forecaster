function searchCity(weather) {
  var apiKey = "7fbb8b1345eeaff09ae91ba040de5772"
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + weather + "&units=metric&appid=" + apiKey
  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "jsonp"
  }).then(function (response) {
    var cityName = $(".cityName").text(response.city.name);
    var getDate = new Date(response.list[0].dt_txt)
    var currentDate = $(".currentDate").text("(" + getDate.getDate() + "/" + getDate.getMonth() + "/" + getDate.getFullYear() + ")");
    var iconcode = response.list[0].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $('#wicon').attr('src', iconurl);
    var temp = $(".temp").text("Temperature: " + response.list[0].main.temp + " C");
    var humidity = $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");
    var wind = $(".wind").text("Wind Speed: " + response.list[0].wind.speed + " MPH");

    var dateOne = new Date(response.list[4].dt_txt);
    var dateOneResult = $("#date-1").text(dateOne.getDate() + "/" + dateOne.getMonth() + "/" + dateOne.getFullYear());
    var iconcodeOne = response.list[4].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcodeOne + ".png";
    $('#wicon1').attr('src', iconurl);
    var tempOne = $("#temp-1").text("Temp: " + response.list[4].main.temp + " C");
    var humidityOne = $("#humidity-1").text("Humidity: " + response.list[4].main.humidity + "%");

    var dateTwo = new Date(response.list[12].dt_txt);
    var dateTwoResult = $("#date-2").text(dateTwo.getDate() + "/" + dateTwo.getMonth() + "/" + dateTwo.getFullYear());
    var iconcodeTwo = response.list[12].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcodeTwo + ".png";
    $('#wicon2').attr('src', iconurl);
    var tempTwo = $("#temp-2").text("Temp: " + response.list[12].main.temp + " C");
    var humidityTwo = $("#humidity-2").text("Humidity: " + response.list[12].main.humidity + "%");

    var dateThree = new Date(response.list[20].dt_txt);
    var dateThreeResult = $("#date-3").text(dateThree.getDate() + "/" + dateThree.getMonth() + "/" + dateThree.getFullYear());
    var iconcodeThree = response.list[20].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcodeThree + ".png";
    $('#wicon3').attr('src', iconurl);
    var tempThree = $("#temp-3").text("Temp: " + response.list[20].main.temp + " C");
    var humidityThree = $("#humidity-3").text("Humidity: " + response.list[20].main.humidity + "%");

    var dateFour = new Date(response.list[28].dt_txt);
    var dateFourResult = $("#date-4").text(dateFour.getDate() + "/" + dateFour.getMonth() + "/" + dateFour.getFullYear());
    var iconcodeFour = response.list[28].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcodeFour + ".png";
    $('#wicon4').attr('src', iconurl);
    var tempFour = $("#temp-4").text("Temp: " + response.list[28].main.temp + " C");
    var humidityFour = $("#humidity-4").text("Humidity: " + response.list[28].main.humidity + "%");

    var dateFive = new Date(response.list[35].dt_txt);
    var dateFiveResult = $("#date-5").text(dateFive.getDate() + "/" + dateFive.getMonth() + "/" + dateFive.getFullYear());
    var iconcodeFive = response.list[35].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcodeFive + ".png";
    $('#wicon5').attr('src', iconurl);
    var tempFive = $("#temp-5").text("Temp: " + response.list[35].main.temp + " C");
    var humidityFive = $("#humidity-5").text("Humidity: " + response.list[35].main.humidity + "%");

    console.log(response)

    var lat = response.city.coord.lat
    var lon = response.city.coord.lon

    getUV(lat, lon)
  })
};

function getUV(lat, lon) {
  var apiKey = "7fbb8b1345eeaff09ae91ba040de5772"
  var uvURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
  console.log(uvURL)
  $.ajax({
    url: uvURL,
    method: "GET",
    dataType: "json"
  }).then(function (data) {
    var uvIndex = $(".uv").text("UV Index: ")
    var uvNumber = $(".uvIcon").text(data[4].value)

  });
};

function changeUVColor(uvNumber) {
  var uvIcon = uvNumber.toFixed(0)
  if (uvIcon >= 3) {
    uvIcon.css('background-color', 'green');
  } else if (uvIcon >= 6) {
    uvIcon.setAttribute('style', 'background-color: yellow !important');
  } else if (uvIcon >= 8) {
    uvIcon.setAttribute('style', 'background-color: orange !important');
  } else {
    $(uvIcon).css('background-color', 'red');
  };
}

window.onload = function () {
  var searchButton = $("#searchCity");
  var inputCity = $("#inputCity").val().trim();
  inputCity.value = localStorage.getItem("City Name");
}

$("#searchCity").on("click", function (event) {
  event.preventDefault();
  var inputCity = $("#inputCity").val().trim();
  localStorage.setItem("City Name", inputCity);
  var prevCityNode = $('<button/>').text(inputCity);
  prevCityNode.on('click', function (event) {
    event.preventDefault();
    var prevCity = $(this).text();
    searchCity(prevCity);
  });
  $('#recentlySearchedCities').append(prevCityNode).end();
  searchCity(inputCity);
  // $("#searchCity").on("click", function (event) {
  //   event.preventDefault();
  //   var inputCity = $("#inputCity").val().trim();
  //   localStorage.setItem("City Name", inputCity);
  //   var node = document.createElement("button");
  //   var textnode = document.createTextNode(inputCity);
  //   node.appendChild(textnode);
  //   document.getElementById("recentlySearchedCities").appendChild(node);
  //   searchCity(inputCity);

  // $(this).on("click", "button", function (event) {
  //   event.preventDefault();
  //   var previousCity = $("button");
  //   $(this).append(inputCity);
  //   searchCity(inputCity);
  //   console.log(inputCity)
});