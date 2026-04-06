import { useState } from 'react'

export const useField = (parameter) => {
  const [value, setValue] = useState('')
  const onChange = (event) => setValue(event.target.value)
  const reset = () => setValue('')

  return {
    inputProps: { parameter, value, onChange },
    reset,
  }
}
