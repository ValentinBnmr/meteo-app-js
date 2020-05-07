
let city = "Paris";
meteoTemp(city);

let weatherDisplay     = document.getElementById("weather-icon");
let weatherDescDisplay = document.getElementById("weather-descrip");
let temperatureDisplay        = document.getElementById("temperature");
let feelikeDisplay      = document.getElementById("feel-like");
let cityDisplay      = document.getElementById("city");
let humidityDisplay         = document.getElementById("humidity")
let pressureDisplay      = document.getElementById("pressure");
let windDisplay         = document.getElementById("wind");
let dateDisplay       = document.getElementById("date");
let btnChange   = document.getElementById("btn-change");
let inputChange = document.getElementById("input-change");

//Variable & traitement de l'heure affichée 
let dateActu      = new Date();
let DateLocale    = dateActu.toLocaleString('FR-fr', {

  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "numeric", 
  minute: "numeric", 

});
dateDisplay.textContent   = DateLocale;
//Change le fond d'écran il est 20h ou plus et annulation de la condition à 7h
let dateHour = dateActu.getHours();
if (dateHour >= 20 || dateHour < 7) {
  document.querySelector('body').style.backgroundImage = "url('app/img/wallpnight.jpg')";

}


//Mets à jours l'heure toute les 60/s et adapte la date et l'heure par rapport à la langue du navigateur de l'utilisateur
function afficheHeure(){
  dateActu = new Date();
  let language = navigator.language;
  DateLocale = dateActu.toLocaleString(language.toUpperCase()+"-"+language, {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric", 
    minute: "numeric", 
    
    });
  dateDisplay.textContent = DateLocale;
}
setInterval(afficheHeure,60000);



//Fonction qui envoi une requete à l'API météorologique "OpenWeather", et nous renvoie les informations demandées sur le fichier HTML 
function meteoTemp(city) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=fe50c1ba2e0819bed110d869610a1c11&units=metric&lang=fr";
  let request = new XMLHttpRequest();
  request.open('GET',url);
  request.responseType = 'json';
  request.send();
  console.log(url);

  request.onload = function() {
    if(request.readyState === XMLHttpRequest.DONE){
        if(request.status === 200){
          let res     = request.response;
          //Variable des informations météorologique
          let countriesData =res.sys.country;
          let temperatureData = res.main.temp;
          let feellikeData = res.main.feels_like;
          let humidityData    = res.main.humidity;
          let pressureData = res.main.pressure;
          //Transforme les mètres par secondes du vent en km/h
          let windData = Math.floor(res.wind.speed * 3600 / 1000);
          let weatherData = res.weather[0].main;
          let weatherDescripData = res.weather[0].description.
          charAt(0).toUpperCase() + res.weather[0].description.slice(1).toLowerCase();
          
          
          cityDisplay.textContent = city + ", " + countriesData;
          humidityDisplay.textContent = humidityData + "%";
          pressureDisplay.textContent = pressureData + "hpa"
          windDisplay.textContent = windData + "km/h";
          temperatureDisplay.textContent =   Math.floor(temperatureData) + "°C";
          feelikeDisplay.textContent = "Température ressentie " + Math.floor(feellikeData) + "°C";
          
          //Condition switch qui vérifie l'état météorologique de la variable ville et affiche des icons par rapport à celle-ci
          switch (weatherData) {
            case "Clouds":
              weatherDisplay.setAttribute("src","app/img/cloud.png");
              weatherDescDisplay.textContent = weatherDescripData;
              break;
            case "Rain":
              weatherDisplay.setAttribute("src","app/img/rainy.png");
              weatherDescDisplay.textContent = weatherDescripData;
            break;
            case "Clear":
              weatherDisplay.setAttribute("src","app/img/sun.png");
              weatherDescDisplay.textContent = weatherDescripData;
              break;
            case "Drizzle":
              weatherDisplay.setAttribute("src","app/img/rainy.png");
              weatherDescDisplay.textContent = weatherDescripData;
              console.log("Pluie fine")
              break;
            case "Snow":
              weatherDisplay.setAttribute("src","app/img/snow.png");
              weatherDescDisplay.textContent = weatherDescripData;
              break;
            case "Mist":
              weatherDisplay.style.height ="200px";
              weatherDisplay.style.width ="200px";
              weatherDisplay.setAttribute("src","app/img/fog.png");
              weatherDescDisplay.textContent = weatherDescripData;
              break;
            case "Thunderstorm":
              weatherDisplay.setAttribute("src","app/img/thunder.png");
              weatherDescDisplay.textContent = weatherDescripData;
            default:
              break;
        }
      }
    }
  }
}


//Bouton qui change de ville par rapport à la valeur str de ville
btnChange.addEventListener('click', () => {
  event.preventDefault();
  city = inputChange.value.
  charAt(0).toUpperCase() + inputChange.value.slice(1).toLowerCase();;
  inputChange.value = "";
  meteoTemp(city);
})

console.log("Code recus");



//Sonyeong - 2020