import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import sunrise from './sunrise.png';
import sunset from './sunset.png';
import clear from './images/clear.jpg'
import clouds from './images/clouds.jpg'
import rain from './images/rainy.jpg'  
import haze from './images/haze.jpg'
import thunderstorm from './images/thunderstorm.jpg'
import wind from './images/wind.png'
import pressure from './images/air.png'
import humidity from './images/humidity.png'
import visibility from './images/weather.png'
import cloud from './images/clouds.png'
import logo from './images/logo.png'
import name from './images/name.png'
import smile from './images/smile.png'
import sad from './images/sad.png'
import cycling from './images/bicycle.png'
import running from './images/running.png'
import gardening from './images/gardening.png'

const App = () => {
  const [city, setcity] = useState('');
  const [weather, setweather] = useState(null);
  const [nowInSeconds] = useState(()=>{Math.floor(Date.now() / 1000)});
  const fetchWeather = async (params)=> {
    try{
      const query=new URLSearchParams(params).toString();
      const response = await fetch(`http://localhost:3000/weather/server?${query}`);
      const data = await response.json();
      setweather(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        ()=>{
          fetchWeather({city: "Delhi"});
        }
      )
    }
  },[])
  const handleSearch=()=>{
    if(city){
      fetchWeather({city});
    }
  }
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  const now = new Date();
  const getBackgroundImage = () => {
    if (!weather || !weather.weather || weather.weather.length === 0) {
      return clear; // Default background
    }
    const mainWeather = weather.weather[0].main.toLowerCase();
    switch (mainWeather) {
      case 'clear':
        return clear;
      case 'clouds':
        return clouds;
      case 'rain':
        return rain;
      case 'haze':
        return haze;
      case 'thunderstorm':
        return thunderstorm;
      default:
        return clear; 
    }
  }
  const getTextColor = () => {
    if (!weather || !weather.weather || weather.weather.length === 0) {
      return 'text-white'; 
    }
    const mainWeather = weather.weather[0].main.toLowerCase();
    switch (mainWeather) {
      case 'clear':
        return 'text-yellow-300'; 
      case 'clouds':
        return 'text-gray-900'; 
      case 'rain':
        return 'text-gray-900'; 
      case 'haze':
        return 'text-amber-900'; 
      case 'thunderstorm':
        return 'text-white'; 
      default:
        return 'text-white'; 
    }
  }
  const getWindDirection = (degree) =>{
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  }
  const getWindSpeed = (speed) => {
    return (speed * 3.6).toFixed(1); 
  }
  const getVisibility = (visibility) => {
    return (visibility / 1000).toFixed(1); 
  }
  const getPressure = (pressure) => {
    return (pressure / 1.333).toFixed(1); 
  }
  const getPersonaAdvice = () =>{
    if (weather){
      return{
        photographer:{
          title: "Photography",
          tip:weather.visibility>=10000 ? "Great visibility for photography! Capture the beauty of the cityscape and nature." : "Visibility is low, consider focusing on close-up shots or indoor photography.",
          status: ((nowInSeconds > weather.sys?.sunrise && nowInSeconds < weather.sys?.sunset - 3600) || (nowInSeconds > weather.sys?.sunset && nowInSeconds < weather.sys?.sunrise + 3600)) ? "GOLDEN HOUR NOW 📸" : "Wait for Golden Hour"
        },
        traveller:{
          title: "Travel",
          tip: Math.abs(weather.main?.temp-273.15 - weather.main?.feels_like-273.15) > 5 ? "Dress in layers to stay comfortable throughout the day." : "Weather is comfortable, dress as you like!",
          alert: weather.weather?.[0].main.toLowerCase() === 'rain' ? "Carry an umbrella or raincoat if you plan to go out." : "Weather looks good for travel! Enjoy your day out.",
      },
      farmer:{
        title: "Farming",
        tip: weather.main?.humidity > 80 ? "High humidity can promote fungal growth. Consider preventive measures for your crops." : "Humidity levels are good for most crops. Keep monitoring for any changes.",
        alert: weather.weather?.[0].main.toLowerCase() === 'thunderstorm' ? "Secure outdoor equipment and consider delaying fieldwork during thunderstorms." : "Weather conditions are favorable for farming activities."
      }
    }
  }
}
const getGardening = () =>{
  if(weather){
    return{
      title:"Gardening",
      head:weather.main?.humidity>80 && (weather.weather?.[0].main.toLowerCase()==='rain' ||weather.weather?.[0].main.toLowerCase()==='thunderstorm') && (25<=Math.abs((weather.main?.temp-273.15)) || 17>=Math.abs((weather.main?.temp-273.15))) ? "Poor":"Good",
      tip:weather.main?.humidity>80 && (weather.weather?.[0].main.toLowerCase()==='rain' ||weather.weather?.[0].main.toLowerCase()==='thunderstorm') && (25<=Math.abs((weather.main?.temp-273.15)) || 17>=Math.abs((weather.main?.temp-273.15))) ? "Poor weather for gardening right now!":"Good weather for gardening right now!",
    }
  }
}
const getCycling = () =>{
  if (weather){
    return{
      title:"Cycling",
      head:weather.visibility>=2000 && weather.weather?.[0].main.toLowerCase()=== 'clear' && Math.abs(weather.main?.temp-273.15 - weather.main?.feels_like-273.15)<5 && weather.main?.humidity<=50 && getWindSpeed(weather.wind?.speed)<15 ? "Good": "Poor",
      tip:weather.visibility>=2000 && weather.weather?.[0].main.toLowerCase()=== 'clear' && Math.abs(weather.main?.temp-273.15 - weather.main?.feels_like-273.15)<5 && weather.main?.humidity<=50 && getWindSpeed(weather.wind?.speed)<15 ? "Good weather for cycling right now!": "Poor weather of cycling right now!",      
    }
  }
}
const getRunning = () =>{
  if (weather){
    return{
      title:"Running",
      head:weather.visibility>=2000 && weather.weather?.[0].main.toLowerCase()=== 'clear' && Math.abs(weather.main?.temp-273.15 - weather.main?.feels_like-273.15)<5 && weather.main?.humidity<=50 && getWindSpeed(weather.wind?.speed)<15 ? "Good": "Poor",
      tip:weather.visibility>=2000 && weather.weather?.[0].main.toLowerCase()=== 'clear' && Math.abs(weather.main?.temp-273.15 - weather.main?.feels_like-273.15)<5 && weather.main?.humidity<=50 && getWindSpeed(weather.wind?.speed)<15 ? "Good weather for running right now!": "Poor weather for running right now!",
    }
  }
}

  return (
    <div class='w-screen h-full bg-gradient-to-r from-blue-600 to-purple-700 pb-10'>
      <div>
        <img src={logo} alt='logo' className='w-[7rem] inline-block md:w-[8rem] md:ml-[8rem]'></img>
        <img src={name} alt='name' className='inline-block w-[18rem] md:w-[20rem]'></img>
      </div>
      <div class='p-2 bg-gray-700  flex items-center justify-center backdrop-blur-sm bg-opacity-75 shadow-lg sticky top-0 z-10'>
        <input
        type='text'
        placeholder="Search city name"
        value={city}
        onChange={(e)=>{setcity(e.target.value)}}
        class='border-2 border-gray-300 rounded-3xl px-4 py-2 w-64 md:w-80 lg:w-96 focus:outline-none focus:ring-2 focus:ring-green-800'
        >
        </input>
        <button onClick={handleSearch} class='bg-green-800 text-white px-4 py-2 rounded-3xl hover:bg-green-700 ml-2 hover:scale-105 transition-transform duration-200'>Search</button>
      </div>
      <div className={`max-w-100 h-96 mx-auto m-10 ml-5 mr-5 md:ml-20 md:mr-20 lg:ml-40 lg:mr-40 lg:h-96 rounded-3xl p-6 shadow-lg bg-gray-800 bg-opacity-75 backdrop-blur-sm ${getTextColor()}`} style={{backgroundImage: `url(${getBackgroundImage()})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        {weather && weather.name && (
          <div >
            <div className='flex items-center justify-between md:pl-10 md:pr-10'>
              <span>
            <LocationOnIcon className="text-yellow-400 mr-2" />
            <h2 className="text-3xl font-bold mb-6">{weather.name}, {weather.sys?.country}</h2>
            <h6 className="inline">{now.toLocaleDateString()}</h6>
            <h6>{now.toLocaleTimeString()}</h6>
            </span>
            <span>
              <img className='h-20' src={`http://openweathermap.org/img/w/${weather.weather?.[0].icon}.png`} alt="weather icon" />
            <p className="text-6xl font-sans mb-2 ">{(weather.main?.temp-273.15).toFixed(1)}°C</p>
            <p>Feels like: {(weather.main?.feels_like-273.15).toFixed(1)}°C</p>
            </span>
          </div>
          <div className=' md:pl-10 md:pr-10 mt-20 flex items-center justify-between'>
            <div>
            <h1 className="text-2xl font-bold mt-3">{weather.weather?.[0].main}</h1>
            <h3 className="text-xl">{weather.weather?.[0].description}</h3>
          </div>
          <div className='hidden lg:block'>
            <div className='inline-block'>
            <img src={sunrise} alt="Sunrise" className="h-10 w-10" />
            <div >{formatTime(weather.sys?.sunrise)} </div>
            </div>
            <div className='w-40 inline-block h-1 ml-5 mr-5 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full mb-5'></div>
            <div className='inline-block'>
            <img src={sunset} alt="Sunset" className="h-10 w-10 inline" />
            <div>{formatTime(weather.sys?.sunset)}</div>
            </div>
          </div>
          <div className='bg-gray-600 pd-10 rounded-3xl bg-opacity-50 backdrop-blur-sm shadow-lg p-4 flex items-center justify-around mt-5'>
            <p className={`flex items-center text-2xl ${getTextColor()}`}>
              <ArrowUpwardSharpIcon className="text-red-500 mr-1" />
              {(weather.main?.temp_max-273.15).toFixed(1)}°C
            </p>
            <p className={`flex items-center text-2xl ${getTextColor()}`}>
              <ArrowDownwardSharpIcon className="text-blue-500 mr-1" />
              {(weather.main?.temp_min-273.15).toFixed(1)}°C
            </p>
          </div>
          </div>
          </div>
        )}
      </div>
      <div>
        {weather && (
          <div className='grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2 lg:grid-cols-8 lg:grid-rows-1 mt-10 md:ml-20 md:mr-20 lg:ml-40 lg:mr-40 max-w-100 ml-5 mr-5 lg:gap-x-[12rem] lg:overflow-x-auto md:overflow-x-auto gap-x-[2rem] '>
            <div className='h-40 w-[13rem] md:w-40 text-center inline-block bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-5 hover:border-2 hover:border-green-500 transition duration-200'>
              <img src={wind} alt="Wind" className="h-10 w-10 mx-auto mb-2" />
              <h2 className='text-xl font-bold'>Wind</h2>
              <p>{getWindDirection(weather.wind?.deg)} {getWindSpeed(weather.wind?.speed)} km/h</p>
            </div>
            <div className='h-40 w-[13rem] md:w-40 text-center inline-block bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-5 hover:border-2 hover:border-green-500 transition duration-200'>
              <img src={visibility} alt="Visibility" className="h-10 w-10 mx-auto mb-2" />
              <h2 className='text-xl font-bold'>Visibility</h2>
              <p>{getVisibility(weather.visibility)} km</p>
            </div>
            <div className='h-40 w-[13rem] md:w-40 text-center inline-block bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-5 hover:border-2 hover:border-green-500 transition duration-200'>
              <img src={pressure} alt="Pressure" className="h-10 w-10 mx-auto mb-2" />
              <h2 className='text-xl font-bold'>Pressure</h2>
              <p>{getPressure(weather.main?.pressure)} mmHg</p>
            </div>
            <div className='h-40 w-[13rem] md:w-40 text-center inline-block bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-5 hover:border-2 hover:border-green-500 transition duration-200'>
              <img src={humidity} alt="Humidity" className="h-10 w-10 mx-auto mb-2" />
              <h2 className='text-xl font-bold'>Humidity</h2>
              <p>{weather.main?.humidity}%</p>
            </div>
            <div className='h-40 w-[13rem] md:w-40 text-center inline-block bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-5 hover:border-2 hover:border-green-500 transition duration-200'>
              <img src={cloud} alt="Clouds" className="h-10 w-10 mx-auto mb-2" />
              <h2 className='text-xl font-bold'>Cloudiness</h2>
              <p>{weather.clouds?.all}%</p>
            </div>
            <div className='h-40 w-[13rem] md:w-40 text-center inline-block bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-5 hover:border-2 hover:border-green-500 transition duration-200'>
              <LocationOnIcon className="text-blue-300 mx-auto mb-2" />
              <h2 className='text-xl font-bold'>Coordinates</h2>
              <p>Lat: {weather.coord?.lat},</p>
              <p>Lon: {weather.coord?.lon}</p>
            </div>
            <div className='h-40 w-[13rem] md:w-40 text-center inline-block bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-5 hover:border-2 hover:border-green-500 transition duration-200'>
              <img src={sunrise} alt="Sunrise" className="h-10 w-10 mx-auto mb-2" />
              <h2 className='text-xl font-bold'>Sunrise</h2>
              <p>{formatTime(weather.sys?.sunrise)}</p>
            </div>
            <div className='h-40 w-[13rem] md:w-40 text-center inline-block bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-5 hover:border-2 hover:border-green-500 transition duration-200'>
              <img src={sunset} alt="Sunset" className="h-10 w-10 mx-auto mb-2" />
              <h2 className='text-xl font-bold'>Sunset</h2>
              <p>{formatTime(weather.sys?.sunset)}</p>
            </div>
          </div>
        )}
      </div>
      <div className='max-w-100 ml-5 mr-5 md:ml-20 md:mr-20 lg:ml-40 lg:mr-40 mb-10 p-6 rounded-3xl bg-gray-800 bg-opacity-75 backdrop-blur-sm shadow-lg mt-10 grid grid-cols-3 gap-x-[28rem] overflow-x-auto lg:gap-x-20 md:gap-x-[23rem]' >
        <div className='bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-4 shadow-lg flex w-[26rem] lg:w-80 md:w-80'>
          <div className='inline-block'>
            <h2 className='font-bold text-2xl'>{getCycling()?.title}</h2> 
            <img src={cycling} alt='cycling' className='w-20'></img>
            <p>{getCycling()?.tip}</p>
          </div>
          <div className='inline-block pl-20 text-center'>
            {getCycling()?.head==="Good"?(
              <img src={smile} alt='sad' className='w-10'></img>
            )
            :(
              <img src={sad} alt='sad' className='w-10'></img>
            )}
          <h3>{getCycling()?.head}</h3>
          </div>
        </div>
        <div className='bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-4 shadow-lg flex w-[26rem] lg:w-80 md:w-80'>
          <div className='inline-block'>
            <h2 className='font-bold text-2xl'>{getRunning()?.title}</h2> 
            <img src={running} alt='running' className='w-20'></img>
            <p>{getRunning()?.tip}</p>
          </div>
          <div className='inline-block pl-20 text-center'>
            {getRunning()?.head==="Good" ? (
              <img src={smile} alt='sad' className='w-10'></img>
            )
            :(
              <img src={sad} alt='sad' className='w-10'></img>
            )}
          <h3>{getRunning()?.head}</h3>
          </div>
        </div>
        <div className='bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-4 shadow-lg flex w-[26rem] lg:w-80 md:w-80'>
          <div className='inline-block'>
            <h2 className='font-bold text-2xl'>{getGardening()?.title}</h2> 
            <img src={gardening} alt='gardening' className='w-20'></img>
            <p>{getGardening()?.tip}</p>
          </div>
          <div className='inline-block pl-20 text-center'>
            {getGardening()?.head==="Good"?(
              <img src={smile} alt='sad' className='w-10'></img>
            )
            :(
              <img src={sad} alt='sad' className='w-10'></img>
            )}
          <h3>{getGardening()?.head}</h3>
          </div>
        </div>
      </div>
      <div>
        {weather && (
          <div className='max-w-100 ml-5 mr-5 md:ml-20 md:mr-20 lg:ml-40 lg:mr-40 mb-10 p-6 rounded-3xl bg-gray-800 bg-opacity-75 backdrop-blur-sm shadow-lg mt-10'>
            <h1 className='text-2xl font-bold mb-4'>Personalized Advice</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-4 shadow-lg'>
                <h2 className='text-xl font-bold mb-2'>{getPersonaAdvice().photographer.title}</h2>
                <p>{getPersonaAdvice().photographer.tip}</p>
                <p className='mt-2 font-semibold'>{getPersonaAdvice().photographer.alert}</p>
              </div>
              <div className='bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-4 shadow-lg'>
                <h2 className='text-xl font-bold mb-2'>{getPersonaAdvice().farmer.title}</h2>
                <p>{getPersonaAdvice().farmer.tip}</p>
                <p className='mt-2 font-semibold'>{getPersonaAdvice().farmer.alert}</p>
              </div>
              <div className='bg-green-900 bg-opacity-75 backdrop-blur-sm rounded-3xl p-4 shadow-lg'>
                <h2 className='text-xl font-bold mb-2'>{getPersonaAdvice().traveller.title}</h2>
                <p>{getPersonaAdvice().traveller.tip}</p>
                <p className='mt-2 font-semibold'>{getPersonaAdvice().traveller.alert}</p>
              </div>
      </div>
    </div>
        )
      }
      </div>
      </div>
  )
}

export default App