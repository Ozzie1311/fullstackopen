const updateGood = () => {
  return {
    type: 'GOOD',
  }
}

const updateOk = () => {
  return { type: 'OK' }
}

const updateBad = () => {
  return { type: 'BAD' }
}

const reset = () => {
  return { type: 'ZERO' }
}

export { updateGood, updateOk, updateBad, reset }
