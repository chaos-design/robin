---
# category: Components
group:
  title: 组件
  order: 2
title: SemanticPreview
description: 语义化DOM
tag: 0.0.1
---

## 用法

```js
import { SemanticPreview } from '@chaos-design/semantic-preview';

const App = () => (
  <SemanticPreview
    semantics={[
      { name: 'header', desc: locale.header, version: '5.14.0' },
      { name: 'title', desc: locale.title, version: '5.14.0' },
      { name: 'extra', desc: locale.extra, version: '5.14.0' },
      { name: 'cover', desc: locale.cover, version: '5.14.0' },
      { name: 'body', desc: locale.body, version: '5.14.0' },
      { name: 'actions', desc: locale.actions, version: '5.14.0' },
    ]}
  >
    <BlockCard>
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title="Card Meta title"
        description="This is the description"
      />
    </BlockCard>
  </SemanticPreview>
);

export default App;
```

## 代码演示

<code src="./demos/semantic-preview/index.tsx"></code>

## API

| 属性        | 类型        | Default           | 描述                         |
| :---------- | :---------- | :---------------- | :--------------------------- |
| `prefix`    | `string`    | `"semantic-mark"` | 组件前缀                     |
| `height`    | `number`    | `""`              | 容器最小高度                 |
| `semantics` | Semantics[] |                   | 高亮对应属性、描述、版本信息 |

### Semantics

```json
{
  name: string;
  desc: string;
  version?: string;
}
```

## 关于语义化 DOM

:::info
请务必遵循下面规范实现组件，否则无法生效, 了解设计思路即可。
:::

### 设计思路

`SemanticsPreview` 通过属性`semantics` 配置对应的属性 `header`、`body`、`extra`、`title`、`actions`、`cover` 会被渲染到组件对应的位置。

即，组件需要接受通过 `SemanticsPreview` 配置的类名

:::code-group

```ts [SemanticsPreview.tsx]
const Preview = () => {
  return (
    <SemanticPreview
      semantics={[
        { name: 'header', desc: locale.header, version: '5.14.0' },
        { name: 'title', desc: locale.title, version: '5.14.0' },
        { name: 'extra', desc: locale.extra, version: '5.14.0' },
        { name: 'cover', desc: locale.cover, version: '5.14.0' },
        { name: 'body', desc: locale.body, version: '5.14.0' },
        { name: 'actions', desc: locale.actions, version: '5.14.0' },
      ]}
    >
      <Card
        {...props}
        title="Card title"
        extra="More"
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      />
    </SemanticPreview>
  );
};
```

```ts [CardComponent.tsx]
const Card = ({
  classNames,
}: {
  classNames?: {
    header?: string;
    body?: string;
    extra?: string;
    title?: string;
    actions?: string;
    cover?: string;
  };
}) => {
  return (
    <div className={className}>
      <div className={c('header', classNames?.header)}>header</div>
      <div className={c('body')}>b, classNames?.body</div>
      <div className={c('extra', classNames?.extra)}>extra</div>
      <div className={c('title', classNames?.title)}>title</div>
      <div className={c('actions', classNames?.actions)}>actions</div>
      <div className={c('cover', classNames?.cover)}>cover</div>
    </div>
  );
};
```

:::
