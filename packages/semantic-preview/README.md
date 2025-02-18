# @chaos-design/semantic-preview

语义化 DOM

## 用法

```jsx
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
