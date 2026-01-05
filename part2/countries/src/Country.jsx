import axios from 'axios'
import { useState, useEffect } from 'react'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const languagesArray = Object.values(country.languages)

  const api_key = import.meta.env.VITE_API_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=metric`,
      )
      .then((response) => {
        setWeather(response.data)
      })
      .catch((error) => {
        console.error('Error fetching weather', error)
      })
  }, [country])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>

      <h3>Languages</h3>
      <ul>
        {languagesArray.map((c, index) => {
          return <li key={index}>{c}</li>
        })}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.name.common}</h2>
      {weather ? (
        <div>
          <p>Temperature {Math.round(weather.main.temp)}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind {weather.wind.speed} k/h</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  )
}
export default Country
