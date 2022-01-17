# chaos

`译为: 混沌 异曰万物伊始`

### chaos 布局系统

- 布局块需要用 Main(不区分大小写)包裹, Main 节点有几种模式
  - 固定 width&height 模式: 设置固定值 px 或者 xx%, 并且可以设置内部是否可以自由收缩
  - 自由 h/w 模式: 内部第一层节点只可以使用 span 绝对值设置, 最外层容器由内部第一层节点宽高总和撑满
- 一行或者一列 span 总和需要小于等于 12
  - span 可以为相对或者固定值(px), 同一行或者同一列可以两种模式混用, 如果混用, 则(相对值=100%-绝对值总和)
  - 如果 span 值缺省, 则默认相对值 1
- row 于 col 组合图形必须是矩形
- row&col 存在固定位置的属性(stick=top/bottom/left/right)
- row&col 存在 space 间隔属性(space 只能存在相对值), 一行或一列每个 item 的宽高=总相对&绝对值数值-space 总值
- TODO: space&span&width&height 可以表达式动态计算出结果, 其中依赖项动态变化, 可导致结果值动态变化
-
