import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo
} from 'react'

type Props = {
  initial: number
}

export const testContext = React.createContext({ context: 'contextdayo~' })

export default ({ initial = 0 }: Props) => {
  const [count, setCount] = useState(initial)
  const [num, setNum] = useState(1)
  const { context } = useContext(testContext)

  useEffect(() => {
    console.log(context)

    return () => console.log('willunmount(副作用時にも発火)')
  }, [context])

  // めっちゃ高価な計算
  const dec_num_1: number = useMemo(() => num - 1, [num])

  const increment = useCallback(() => setCount(count => count + num), [num])
  const decrement = useCallback(() => setCount(count => count - num), [num])
  const increment_num = useCallback(() => setNum(num => num + 1), [])
  const decrement_num = useCallback(() => setNum(dec_num_1), [dec_num_1])

  return (
    <>
      {count}
      <button onClick={increment}>+{num}</button>
      <button onClick={decrement}>-{num}</button>
      <button onClick={increment_num}>{num + 1}づつ変わるようになるよ</button>
      <button onClick={decrement_num}>{num - 1}づつ変わるようになるよ</button>
    </>
  )
}
