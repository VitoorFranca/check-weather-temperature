const key = 'c099620ccda8a676f3fe24de360338a2';

const areaCity = document.getElementById('city');
const areaState = document.getElementById('state');
const areaCountry = document.getElementById('country');

const image = document.querySelector('.image img');

(function(){
  fetch('http://ip-api.com/json/?fields=61439')
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('city', data.city)
    areaCity.value = localStorage.city
    areaCity.setAttribute('placeholder', `Ex: ${localStorage.city}, Vancouver, Rome...`)

    localStorage.setItem('state', data.regionName)
    areaState.value = localStorage.state
    areaState.setAttribute('placeholder', `Ex: ${localStorage.state}, California, Martinica...`)

    localStorage.setItem('country', data.country)
    areaCountry.value = localStorage.country
    areaCountry.setAttribute('placeholder', `Ex: ${localStorage.country}, Canada, Italia...`)

    document.querySelector('section div p.title').innerHTML = `${localStorage.city}, ${localStorage.state}`

    getInfoWeather()
  })
})()

function getInfoWeather (){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.city},${localStorage.state},${localStorage.country}&appid=${key}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    image.setAttribute('src', icon)
    document.querySelector('section div p.subtitle').innerHTML = `${kelvinToCelsius(data.main.temp)}°C`
  })
}

function customWeather(){
  const city = document.getElementById('city').value
  const state = document.getElementById('state').value
  const country = document.getElementById('country').value
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${key}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    image.removeAttribute('src')
    image.setAttribute('src', icon)
    console.log(data)
    document.querySelector('section div p.title').innerHTML = `${data.name}, ${data.sys.country}`
    document.querySelector('section div p.subtitle').innerHTML = `${kelvinToCelsius(data.main.temp)}°C`
  })
}

const kelvinToCelsius = value => Math.floor(value - 273.15)