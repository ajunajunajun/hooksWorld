import React, { useState, useEffect, useContext, useCallback } from 'react'

type Props = {
  initial: number
}

export const testContext = React.createContext({ context: 'contextdayo~' })

export default ({ initial = 0 }: Props) => {
  const [count, setCount] = useState(initial)
  const { context } = useContext(testContext)

  useEffect(() => {
    console.log(context)

    return () => console.log('willunmount(副作用時にも発火)')
  }, [context])

  const increment = useCallback(() => setCount(count => count + 1), [])
  const decrement = useCallback(() => setCount(count => count - 1), [])

  return (
    <>
      {count}
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>+1</button>
    </>
  )
}
