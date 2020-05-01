
let ville = "Yokohama";
meteoTemp(ville);

//Sélecteurs
let weather     = document.getElementById("weather");
let city        = document.getElementById("ville");
let tempe       = document.getElementById("temperature_label");
let feelik      = document.getElementById("feel_like");
let hum         = document.getElementById("humidity")
let pressu      = document.getElementById("pressure");
let win         = document.getElementById("wind");
let heure       = document.getElementById("hour");
let btnChange   = document.getElementById("changer");
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
//Initialise l'heure quand la page est chargé
hour.textContent   = DateLocale;
//Change le fond d'écran  il est 20h ou plus 
let dateHeure = dateActu.getHours();
if (dateHeure >= 20 || dateHeure < 6) {
  document.querySelector('body').style.backgroundImage = "url('app/img/wallpnight.jpg')";

}

//Fonctions

//Mets à jours l'heure toute les 60/s et adapte la date et l'heure par rapport à la langue du navigateur de l'utilisateur
function afficheHeure(){
  dateActu = new Date();
  let langue = navigator.language;
  DateLocale = dateActu.toLocaleString(langue.toUpperCase()+"-"+langue, {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric", 
    minute: "numeric", 
    
    });
  hour.textContent = DateLocale;
}
setInterval(afficheHeure,60000);



//Fonction qui envoi une requete à l'API météorologique "OpenWeather", et nous renvoie les informations demandées sur le fichier HTML 
function meteoTemp(ville) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ ville +"&appid=fe50c1ba2e0819bed110d869610a1c11&units=metric";
  let requete = new XMLHttpRequest();
  requete.open('GET',url);
  requete.responseType = 'json';
  requete.send();
  console.log(url);
  requete.onload = function() {
    if(requete.readyState === XMLHttpRequest.DONE){
        if(requete.status === 200){
          let reponse     = requete.response;
          //Variable des informations météorologique
          let countries =reponse.sys.country;
          let temperature = reponse.main.temp;
          let feellike = reponse.main.feels_like;
          let humidity    = reponse.main.humidity;
          let pressure = reponse.main.pressure;
          //Transforme les mètres par secondes du vent en km/h
          let wind = Math.floor(reponse.wind.speed * 3600 / 1000);
          let meteo = reponse.weather[0].main;
          //Affichage
          city.textContent = ville + ", " + countries;
          hum.textContent = humidity + "%";
          pressu.textContent = pressure + "hpa"
          win.textContent = wind + "km/h";
          tempe.textContent =   Math.floor(temperature) + "°C";
          feelik.textContent = "Température ressentie " + Math.floor(feellike) + "°C";
          console.log("le vent est de " + wind);
          
          //Condition switch qui vérifie l'état météorologique de la variable ville et affiche des icons par rapport à celle-ci
          switch (meteo) {
            case "Clouds":
              weather.setAttribute("src","app/img/cloud.png");
              break;
            case "Rain":
              weather.setAttribute("src","app/img/rainy.png");
            break;
            case "Clear":
              weather.setAttribute("src","app/img/sun.png");
              break;
            case "Drizzle":
              weather.setAttribute("src","app/img/rainy.png");
              console.log("Pluie fine")
              break;
            case "Snow":
              weather.setAttribute("src","app/img/snow.png");
              break;
            case "Thunderstorm":
              weather.setAttribute("src","app/img/thunder.png");
            default:
              break;
        }
      }
    }
  }
}

//Events

//Bouton qui change de ville par rapport à la valeur str de ville
btnChange.addEventListener('click', () => {
  event.preventDefault();
  ville = inputChange.value;
  inputChange.value = "";
  meteoTemp(ville);
})




//Sonyeong - 2020