import React, { useState, useEffect, useContext } from 'react'

type Props = {
  initial: number
}

export const testContext = React.createContext({ context: 'contextdayo~' })

export default ({ initial = 0 }: Props) => {
  const [count, setCount] = useState(initial)
  const { context } = useContext(testContext)

  useEffect(() => {
    alert(context)

    return () => alert('willunmount(副作用時にも発火)')
  }, [count, context])

  return (
    <>
      {count}
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>+1</button>
    </>
  )
}
