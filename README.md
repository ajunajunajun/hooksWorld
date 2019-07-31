hooks 使うよ～

# React Hooks

## useState

class でいう State を使える奴

example:

```
const [count, setCount] = useState(initial)

return <button onClick={() => setCount(count + 1)}>+1</button>
```

初期値`initial`で`count`として定義されて、  
`setCount()`で値変更できる～便利
boolean 型とか string 型とか、なんでも入るよ！

## useEffect

class でいう LifeCycle を使える奴

example1:

```
useEffect(() => {
console.log('a')
    return () => console.log('b')
}, [])
```

`console.log('a')`の位置が componentDidMount  
`console.log('b')`の位置が componentWillUnMount

example2:

```
useEffect(() => {
console.log('a')
    return () => console.log('b')
}, [count])
```

第二引数の配列の中に値入れると lifecycle が少し変わる！

`console.log('a')`の位置が componentDidMount,componentDidUpdate  
`console.log('b')`の位置が componentWillUnMount

第二引数の`count`の値の変化が発火条件で、

`count`変化 -> `('b')` -> `('a')` ってかんじ  
return 無しでも使えるよ！

## useContext

class でいう <Context.Consumer> を使える奴

example:

```
export const testContext = React.createContext({ context: 'contextdayo~' })

const { context } = useContext(testContext)
console.log(context) // 'contextdayo~'
```

`React.createContext`で作られた context を持ってこれるよ！

## useCallback

example1:

```
const increment = useCallback(() => setCount(count => count + 1), [])

return <button onClick={increment}>+1</button>
```

再レンダリングのたびに、新しい関数が作られるのを防げて、  
パフォーマンスが向上するよ！

example2:

```
const increment = useCallback(() => setCount(count => count + num), [num])

return <button onClick={increment}>+1</button>
```

第二引数の配列の中に値入れておくと、その値が変わるたびに関数を作り直すよ！  
example では`1`を変数にしておいて、後から増加分を変えれる様にしてる！

## useMemo

計算した結果をメモしとく関数

## useReducer

## useRef
