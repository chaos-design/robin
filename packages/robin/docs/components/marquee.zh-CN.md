---
# category: Components
group:
  title: 组件
  order: 1
title: Marquee
description: 跑马灯组件
tag: '2025-01-27'
---

## 版本

![NPM Version](https://img.shields.io/npm/v/%40chaos-design%2Fmarquee?style=flat&link=https%3A%2F%2Fnpmjs.com%2Fpackage%2F%40chaos-design%2Fmarquee)

## 安装

<InstallDependencies
  pnpm="$ pnpm add @chaos-design/marquee"
  npm="$ npm add @chaos-design/marquee"
  yarn="$ yarn add @chaos-design/marquee"
/>

## 用法

```js
import Marquee from '@chaos-design/marquee';

const App = () => (
  <Marquee>
    <MarqueeContent />
    <MarqueeContent />
    <MarqueeContent />
  </Marquee>
);

export default App;
```

## 代码演示

### 全配置

<code src="./demos/marquee/config.tsx"></code>

### 基本

<code src="./demos/marquee/base.tsx"></code>

### 多行控制

<code src="./demos/marquee/multiple.tsx"></code>

### 水平方向

<code src="./demos/marquee/horizontal-direction.tsx"></code>

### 垂直方向

<code src="./demos/marquee/vertical-direction.tsx"></code>

### 边界情况

<code src="./demos/marquee/edge.tsx"></code>

## API

| 属性                  | 类型                                | Default  | 描述                                                                                                               |
| :-------------------- | :---------------------------------- | :------- | :----------------------------------------------------------------------------------------------------------------- |
| `style`               | `CSSProperties`                     | `{}`     | 容器 `div` 的内联样式                                                                                              |
| `className`           | `string`                            | `""`     | 容器 `div` 的 `className `                                                                                         |
| `itemClassName`       | `string`                            | `""`     | 样式容器中子内容父容器的 `className`                                                                               |
| `autoFill`            | `boolean`                           | `false`  | 在重复滚动时是否自动填充跑马灯内容                                                                                 |
| `play`                | `boolean`                           | `true`   | 是否开始或者暂停跑马灯                                                                                             |
| `pauseOnHover`        | `boolean`                           | `false`  | hover 跑马灯是否暂停                                                                                               |
| `pauseOnClick`        | `boolean`                           | `false`  | click 跑马灯是否暂停                                                                                               |
| `direction`           | `"left" \| "right"\| "up"\| "down"` | `"left"` | 跑马灯滑动的方向<br /><br /> **警告：** 垂直跑马灯目前处于实验阶段，可能存在错误，需要交换设置跑马灯的高度和宽度。 |
| `speed`               | `number`                            | `50`     | 跑马灯速度，单位是`px/s`                                                                                           |
| `delay`               | `number`                            | `0`      | 渲染后延迟动画的持续时间，单位是 `s`                                                                               |
| `loop`                | `number`                            | `0`      | 循环的次数，默认是无限滚动                                                                                         |
| `gradient`            | `boolean`                           | `false`  | 是否显示渐变或不显示                                                                                               |
| `gradientColor`       | `string`                            | `white`  | 渐变的颜色                                                                                                         |
| `gradientWidth`       | `number \| string`                  | `200`    | 两侧渐变的宽度                                                                                                     |
| `onFinish`            | `() => void`                        | `null`   | 当跑马灯完成滚动并停止时的回调。仅在循环非零时调用。                                                               |
| `onIterationComplete` | `() => void`                        | `null`   | 当跑马灯完成一个循环时的回调。如果达到最大循环次数，则不会调用 (请使用 `onFinish` 代替)。                          |
| `onMount`             | `(props: MarqueeInstance) => void`  | `null`   | 当跑马灯完成挂载后被调用。如果需要的话，可以用来重新计算页面大小。                                                 |
| `children`            | `ReactNode`                         | `null`   | 跑马灯的内容                                                                                                       |
