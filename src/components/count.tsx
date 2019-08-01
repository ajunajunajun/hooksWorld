import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect
} from 'react'

import MyInput, { Handler } from './imperativehandle'
import useJudgeCount from './customhook'

type Props = {
  initial: number
}

const testContext = React.createContext({ context: 'contextdayo~' })

const Count = ({ initial = 0 }: Props) => {
  const [count, setCount] = useState(initial)
  const [num, setNum] = useState(1)
  const { context } = useContext(testContext)
  const inputRef = useRef({} as Handler)
  const isZero = useJudgeCount(count)

  useEffect(() => {
    console.log(context)

    return () => console.log('willunmount(副作用時にも発火)')
  }, [context])

  useLayoutEffect(() => {
    console.log('描画とめるからuseLayoutEffect先処理')
  }, [])

  // めっちゃ高価な計算
  const dec_num_1: number = useMemo(() => num - 1, [num])

  const increment = useCallback(() => setCount(c => c + num), [num])
  const decrement = useCallback(() => setCount(c => c - num), [num])
  const increment_num = useCallback(() => setNum(num => num + 1), [])
  const decrement_num = useCallback(() => setNum(dec_num_1), [dec_num_1])

  return (
    <>
      {isZero ? <p>0だよ</p> : <p>0じゃないよ </p>}
      {count}
      <button onClick={increment}>+{num}</button>
      <button onClick={decrement}>-{num}</button>
      <button onClick={increment_num}>{num + 1}づつ変わるようになるよ</button>
      <button onClick={decrement_num}>{num - 1}づつ変わるようになるよ</button>
      <MyInput ref={inputRef} />
      <button
        onClick={() => {
          if (inputRef && inputRef.current) {
            inputRef.current.setWaaaai()
          }
        }}
      >
        Waaaai
      </button>
    </>
  )
}

export default Count
