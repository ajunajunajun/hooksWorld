import React from 'react'
import Count from './components/count'
import { ReducerComponent } from './components/reducer'

const InitialState = {
  initial: 0 as number
}

export default () => {
  return (
    <div>
      <Count initial={InitialState.initial} />
      <br />
      <br />
      <ReducerComponent />
    </div>
  )
}
