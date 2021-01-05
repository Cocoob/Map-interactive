// Météo
//  Stockage API + code
const api = {
    key: "3389edfb1d8ccc7e88a006ae7ffcb99c",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  //   Affichage de la météo de Narbonne à l'ouverture de la page
  window.onload = getNarbonneWeather();
  
  function getNarbonneWeather(){
    fetch(`${api.base}weather?q=Narbonne&lang=fr&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);    
  }
  
  
  let searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  //   Obtenir le résultat de la search box en pressant la touche espace
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&lang=fr&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
  }
  
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].description;
    
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }
  
  function dateBuilder (d) {
    let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    let days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`;
  }
  
  
  // Map 
  
  var map = L.map('mapid').setView([43.1833, 3], 13);
  
  // Définition des icones de marqueur
  var hamburger = L.icon({
    iconUrl : 'Images/hamburger-solid.svg',
    iconSize: [20,40],
    popupAnchor:  [0, -12]
  });
  
  var beer = L.icon({
    iconUrl : 'Images/beer-solid.svg',
    iconSize: [20,40],
    popupAnchor:  [0, -12]
  });
  
  var movie = L.icon({
    iconUrl : 'Images/film-solid.svg',
    iconSize: [20,40],
    popupAnchor:  [0, -12]
  });
  
  
  
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Affichage des marqueurs
  L.marker([43.18484,2.99916],{icon: beer}).addTo(map)
  .bindPopup('<h1>Le Botafogo</h1><p>Restaurant / bar ambiance de Narbonne</p> <img src="Images/bota.jpg" alt="" width="100%">')
  
  L.marker([43.18162,3.02854],{icon: hamburger}).addTo(map)
  .bindPopup('<h1>McDonalds</h1><p>Fast-food</p> <img src="Images/mcdo.jpeg" alt="" width="300px">')
  
  L.marker([43.16433,2.98744],{icon: movie}).addTo(map)
  .bindPopup('<h1>Cinéma CGR Narbonne</h1> <br> <img src="Images/cgr.jpg" alt="" width="300px">')
  
  L.marker([43.1607912, 2.9869241],{icon: beer}).addTo(map)
  .bindPopup('<h1>Le Repaire</h1><p>Bar ambiance</p> <img src="Images/repaire.jpg" alt="" width="300px">')
  
  L.marker([43.1896224, 3.0180646],{icon: hamburger}).addTo(map)
  .bindPopup('<h1>Enjoy tacos</h1><p>Snack</p> <img src="Images/tacos.jpeg" alt="" width="100%">');
  
  
  
  
  