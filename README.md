hooks 使うよ～

# React Hooks

## useState

classComponent でいう State を使えるやつ

example:

```
const [count, setCount] = useState(initial)
return <button onClick={() => setCount(count + 1)}>+1</button>
```

初期値`initial`で`count`として定義されて、  
`setCount()`で値変更できる～便利

## useEffect

classComponent でいう LifeCycle を使えるやつ

example1:

```
useEffect(() => {
alert('a')
    return () => alert('b')
}, [])
```

`alert('a')`の位置が componentDidMount  
`alert('b')`の位置が componentWillUnMount

↑ 第二引数`[]`で空なんだけど、引数与えると lifecycle ちょっと変わってくる

example2:

```
useEffect(() => {
alert('a')
    return () => alert('b')
}, [count])
```

`alert('a')`の位置が componentDidMount,componentDidUpdate  
`alert('b')`の位置が componentWillUnMount

第二引数の`count`が変わったら  
クリーンアップの為に`('b')`発火して -> `('a')` ってかんじ  
return 無しでも使えるよ～

## useContext

## useMemo

## useCallback

## useReducer

## useRef
