import Number from './Number'

const Numbers = ({ personsToShow }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Number key={person.id} name={person.name} number={person.number} />
        ))}
      </ul>
    </>
  )
}

export default Numbers
