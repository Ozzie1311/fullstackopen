import Number from './Number'
// import phoneService from '../Services/phonenumbers'

const Numbers = ({ personsToShow, deletePhone }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Number
            id={person.id}
            key={person.id}
            name={person.name}
            number={person.number}
            onDelete={deletePhone}
          />
        ))}
      </ul>
    </>
  )
}

export default Numbers
