import { useState, useEffect, useDebugValue } from 'react'

const useJudgeCount = (count: number) => {
  const [isZero, setBool] = useState(false)
  useEffect(() => {
    count === 0 ? setBool(true) : setBool(false)
  }, [count])

  useDebugValue(`isZeroは${isZero}だよ`)

  return isZero
}

export default useJudgeCount
