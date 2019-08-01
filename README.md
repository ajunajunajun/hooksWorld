hooks 使うよ～

# React Hooks

前提として react の知識があるといいね！  
Hooks は React の version16.8.0 (2019/02/06) で追加されたよ～
新しい技術ってだけでわくわくするね！！  
https://ja.reactjs.org/docs/hooks-reference.html

Github に僕が書いた例文に使ってるソースコード置いておくから、良かったら見てね  
typescript 使ってるから例文とちょっと違うと思うけど、処理は同じだよ  
https://github.com/ajunajunajun/hooksWorld

import 文とか省いていくよ！　　
似た Hooks を並べてるから、場合によって使い分けてほしいな！

## useState

class でいう State を使える奴

例:

```
const [count, setCount] = useState(0)

return <button onClick={() => setCount(count + 1)}>+1</button>
```

初期値`0`で`count`として定義されて、  
`setCount()`で値変更できる～便利  
boolean 型とか string 型とか 配列とか、なんでも入るよ！

## useReducer

redux みたいに state 管理できる奴  
これも useState みたく state が使える奴なんだけど、  
コードが複雑になってきたらこっち使った方が分かりやすい！

例:

```
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    default:
      return state
  }
}

const ReducerComponent = () => {
  const [state, dispatch] = useReducer(reducer, 0)
  return
    <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
}
```

`useReducer(reducer,0)`で、  
state,dispatch を定義して使えるようにしてる！

`dispatch({ type:'increment' })`とかで、  
reducer 内の action.type を指定して状態を弄ることが出来る～

redux もういらない？って思ったけど middleware 無いから非同期処理とかめんどそうだぁ

## useContext

class でいう <Context.Consumer> を使える奴

例:

```
export const testContext = React.createContext({ context: 'contextdayo~' })
```

```
const ContextComponent = () => {
  const { context } = useContext(testContext)

  // 'contextdayo~'
  return console.log(context)
}
```

`React.createContext`で作られた context を持ってこれるよ！

## useEffect

class でいう LifeCycle を使える奴

例 1:

```
useEffect(() => {
  console.log('a')
  return () => console.log('b')
}, [])
```

`console.log('a')`の位置が componentDidMount  
`console.log('b')`の位置が componentWillUnMount

例 2:

```
useEffect(() => {
  console.log('a')
  return () => console.log('b')
}, [flag])
```

第二引数の配列の中に値入れると lifecycle が少し変わる！

`console.log('a')`の位置が componentDidMount,componentDidUpdate  
`console.log('b')`の位置が componentWillUnMount(副作用時にも発火)

第二引数の`flag`の値の変化が発火条件で、

`('a')` -> `flag`変化 -> `('b')` -> `('a')` ってかんじ  
return 無しでも使えるよ！

## useLayoutEffect

↑ の useEffect とちょっと似てるよ！！

useEffect は描画を止めないで処理するから、  
一瞬処理できてない物が写る可能性あるんだけど、  
useLayoutEffect は描画止めるからその心配が無いよ！

基本 useEffect 使って、問題があればこっち使うのがいいらしい～

例:

```
useEffect(() => {
  console.log('a')
  return () => console.log('b')
}, [flag])

useLayoutEffect(() => {
  console.log('c')
}, [flag])
```

useEffect と useLayoutEffect を並べると先に useLayoutEffect が処理されるよ～

`('c')` -> `('a')` -> `flag`変化 -> `('b')` -> `('c')` -> `('a')` ってかんじ！！

## useCallback

PureComponent 的な奴  
関数を保存するよ！

例 1:

```
const increment = useCallback(() => setCount(c => c + 1), [])

return <button onClick={increment}>+1</button>
```

再レンダリングのたびに、新しい関数が作られるのを防げて、  
パフォーマンスが向上するよ！

例 2:

```
const increment = useCallback(() => setCount(c => c + num), [num])

return <button onClick={increment}>+1</button>
```

第二引数の配列の中に値入れておくと、その値が変わるたびに関数を作り直すよ！  
例 では`1`を変数にしておいて、後から増加分を変えれる様にしてる！

毎回更新されるような書き方だと逆にパフォーマンス落ちるよ！！  
useCallback 自体の処理の方が重いからね！

## useMemo

↑ の useCallback とちょっと似てるよ！！  
useCallback は関数を保存するんだけど、  
useMemo は関数の結果を保存するよ！前回と違ったら更新！

例:

```
// めっちゃ高価な計算
const dec_num_1 = useMemo(() => num - 1, [num])

// num - 1
return console.log(dec_num_1)
```

重たい計算があって、再レンダリングの度に繰り返したくないなら使おう！！  
こんな例文みたいな超簡単な計算じゃ使っちゃだめだよ！  
useMemo 自体の処理の方が重いからね！

## useRef

あらゆる書き換え可能な値を保持しておけるよ！  
コンポーネントの存在期間ずっと生存し続ける！！  
代入しても state 変えるわけじゃないから再描画されない！

例:

```
const inputRef = useRef(null)

const focus_input = () => {
  inputRef.current.focus()
}

return (
  <button onClick={focus_input}>focus_input</button>
  <input ref={inputRef} type="text" />
)
```

`useRef()`の()内で初期値（ここでは null)設定して  
`<input ref={inputRef}>`で input に持たせて、
`inputRef.current.focus()`で focus 合わせる～みたいな

生存し続けるから、前回の値保持しといて何か処理したりできそう。  
再描画されないから、描画に関係ない事に便利そうだし  
色んな使い道がありそうだ～

## useImperativeHandle

ref が使われた時に親コンポーネントに渡されるインスタンス値をカスタマイズ出来るよ！

なんでかは知らないけど、  
ref を使った手続き的なコードはほとんどの場合に避けるべきです。  
らしい～

例:

```
const MyInput = (props, ref) => {
  const myInputRef = useRef()
  useImperativeHandle(ref, () => ({
    setWaaaai() {
      myInputRef.current.value = 'Waaaaai'
    }
  }))

  return <input type="text" ref={myInputRef} />
}

export default forwardRef(MyInput)
```

```
const inputRef = useRef()

<MyInput ref={inputRef} />
<button
  onClick={() => { inputRef.current.setWaaaai() }}
>
  Waaaai
</button>
```

子供の MyInput で作った setWaaaai()を親で使える感じ、ふ～ん

## Custom Hooks

規則に合わせて自分で Hooks を作れるよ  
規則って？

- フックを呼び出すのはトップレベルのみ
- フックを呼び出すのは React の関数内のみ
- 名前が use で始まる

このみっつ

例:

```
const useJudgeCount = (count) => {
  const [isZero, setBool] = useState(false)
  useEffect(() => {
    count === 0 ? setBool(true) : setBool(false)
  }, [count])

  return isZero
}

export default useJudgeCount
```

```
const isZero = useJudgeCount(count)

return
  {isZero ? <p>0だよ</p> : <p>0じゃないよ </p>}
```

適当に count が 0 か否かを教えてくれる奴作ってみた！  
色々機能ごとにファイル分けれるから綺麗に書けそう～

## useDebugValue

ReactDevTools で CustomHooks のラベルを表示できるよ

さっき作った useJudgeCount の中に  
`useDebugValue(isZero)`  
って書くだけで、ReactDevTools でその値が確認できる！！便利！！！
