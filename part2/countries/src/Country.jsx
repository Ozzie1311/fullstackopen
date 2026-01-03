const Country = ({ country }) => {
  const languagesArray = Object.values(country.languages)

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
    </div>
  )
}
export default Country
