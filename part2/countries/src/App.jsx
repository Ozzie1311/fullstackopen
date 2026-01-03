import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './Country.jsx'

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
            <li key={c.name.common}>{c.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default App
