import { useDispatch } from 'react-redux'
import { setFilter } from '../actions/anecdoteActions'

const Filter = () => {
  const dispatch = useDispatch()
  const filterStyle = { marginBottom: 16 }

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }
  return (
    <div style={filterStyle}>
      Filter
      <input onChange={handleChange} />
    </div>
  )
}

export default Filter
