import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './Country.jsx'

const CountryArticle = ({ country }) => {
  const [isShow, setIsShow] = useState(false)
  return (
    <li>
      {isShow ? <Country country={country} /> : country.name.common}
      <button onClick={() => setIsShow(!isShow)}>{isShow ? 'Hide' : 'Show'}</button>
    </li>
  )
}

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [value, setValue] = useState('')
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {
    console.log('effect')
    axios.get(baseUrl).then((response) => {
      console.log(response.data)
      setAllCountries(response.data)
    })
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const countriesToShow = allCountries.filter((c) => c.name.common.toLowerCase().includes(value.toLowerCase()))

  return (
    <div>
      <div>
        find countries <input value={value} onChange={handleChange} />
      </div>
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length === 1 ? (
        <Country country={countriesToShow[0]} />
      ) : (
        <ul>
          {countriesToShow.map((c) => (
            <CountryArticle key={c.name.common} country={c} />
          ))}
        </ul>
      )}
    </div>
  )
}
export default App
