# React底层渲染机制

## 因为 React 的渲染机制是：

父 render → 子节点全部递归 render
React 会运行组件函数重新生成 VDOM
再做 diff 判断是否需要更新 DOM

默认情况下，父组件一旦重新渲染，子组件都会重新渲染
不过，需要注意一点：
React 的“重新渲染”不等于 DOM 重新更新 —— React 会先重新执行子组件函数（即render），然后进行 diff，只有真的变了才更新 DOM


## 优化手段及使用经验总结（非常重要）

80% 的项目不用滥用 useMemo/useCallback 
只有当，你发现组件频繁渲染，下传 props 导致无意义渲染，才需要优化。
过度优化反而会让代码变慢（因为 useMemo， useCallback 本身也有开销）


一、React.memo —— 缓存整个组件（适合子组件，可阻止子组件重新渲染，除非子组件props变化，否则render都不会执行）
使用场景
父组件总是在渲染，子组件 props 不怎么变化，你想避免子组件无意义地重新渲染

二、useMemo —— 缓存「计算结果」 （适合父组件，，并传递给子组件）

三、useCallback —— 缓存「函数引用」（适合父组件，并传递给子组件）

综合例子
```
    const Child = memo(({ value, onSelect }) => {
    console.log("child render");
    return <div onClick={onSelect}>{value}</div>;
    });

    export default function Parent() {
    const [count, setCount] = useState(0);

    // 父组件可能有很多props，其中某个props变化，，避免每次 Parent 更新生成新函数
    const handleSelect = useCallback(() => {
        console.log("selected");
    }, []);

    // 父组件可能有很多props，其中某个props变化，避免每次生成新对象
    const computed = useMemo(() => ({ double: count * 2 }), [count]);

    return (
        <>
        <button onClick={() => setCount(c => c + 1)}>+</button>
        <Child value={computed.double} onSelect={handleSelect} />
        </>
    );
    }

```



