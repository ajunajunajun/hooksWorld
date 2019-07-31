hooks 使うよ～

# React Hooks

前提として react の知識があるといいね！
Hooks は React の version16.8.0 (2019/02/06) で追加されたよ～
https://ja.reactjs.org/docs/hooks-reference.html#useref

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

PureComponent 的な奴  
関数を保存するよ！

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

毎回更新されるような書き方だと逆にパフォーマンス落ちるよ！！  
useCallback 自体の処理の方が重いからね！

## useMemo

↑ の useCallback とちょっと似てるよ！！  
useCallback は関数を保存するんだけど、  
useMemo は関数の結果を保存するよ！前回と違ったら更新！

example:

```
// めっちゃ高価な計算
const dec_num_1 = useMemo(() => num - 1, [num])
console.log(dec_num_1)
```

重たい計算があって、再レンダリングの度に繰り返したくないなら使おう！！  
こんな例文みたいな超簡単な計算じゃ使っちゃだめだよ！  
useMemo 自体の処理の方が重いからね！

## useRef

あらゆる書き換え可能な値を保持しておけるよ！  
コンポーネントの存在期間ずっと生存し続ける！！  
代入しても state 変えるわけじゃないから再描画されない！

```
const inputRef = useRef(null)

const focus_input = () => {
    inputRef.current.focus()
}

<button onClick={focus_input}>focus_input</button>
<input ref={inputRef} type="text" />
```

`useRef()`の()内で初期値（ここでは null)設定して  
`<input ref={inputRef}>`で input に持たせて、
`inputRef.current.focus()`で focus 合わせる～みたいな

生存し続けるから、前回の値保持しといて何か処理したりできそう。  
再描画されないから、描画に関係ない事に便利そうだし  
色んな使い道がありそうだ～

## useReducer

## useImperativeHandle

## useLayoutEffect

## useDebugValue

## custom hooks
