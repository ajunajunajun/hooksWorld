import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect
} from 'react'

type Props = {
  initial: number
}

export const testContext = React.createContext({ context: 'contextdayo~' })

export const Count = ({ initial = 0 }: Props) => {
  const [count, setCount] = useState(initial)
  const [num, setNum] = useState(1)
  const { context } = useContext(testContext)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log(context)

    return () => console.log('willunmount(副作用時にも発火)')
  }, [context])

  useLayoutEffect(() => {
    console.log('描画とめるからuseLayoutEffect先処理')
  }, [])

  // めっちゃ高価な計算
  const dec_num_1: number = useMemo(() => num - 1, [num])

  const increment = useCallback(() => setCount(count => count + num), [num])
  const decrement = useCallback(() => setCount(count => count - num), [num])
  const increment_num = useCallback(() => setNum(num => num + 1), [])
  const decrement_num = useCallback(() => setNum(dec_num_1), [dec_num_1])

  const focus_input = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <>
      {count}
      <button onClick={increment}>+{num}</button>
      <button onClick={decrement}>-{num}</button>
      <button onClick={increment_num}>{num + 1}づつ変わるようになるよ</button>
      <button onClick={decrement_num}>{num - 1}づつ変わるようになるよ</button>
      <button onClick={focus_input}>focus_input</button>
      <input ref={inputRef} type="text" />
    </>
  )
}

export default Count
