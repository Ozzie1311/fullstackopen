import { useSelector, useDispatch } from 'react-redux'
import {
  updateGood,
  updateOk,
  updateBad,
  reset,
} from './actions/counterActions'

const App = () => {
  const dispatch = useDispatch()
  const counter = useSelector((state) => state)

  const plusGood = () => dispatch(updateGood())
  const plusOk = () => dispatch(updateOk())
  const plusBad = () => dispatch(updateBad())
  const resetToZero = () => dispatch(reset())
  return (
    <div>
      <button onClick={plusGood}>good</button>
      <button onClick={plusOk}>ok</button>
      <button onClick={plusBad}>bad</button>
      <button onClick={resetToZero}>reset stats</button>
      <div>good {counter.good}</div>
      <div>ok {counter.ok}</div>
      <div>bad {counter.bad}</div>
    </div>
  )
}

export default App
