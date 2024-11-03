# jsonbypath

jsonbypath 是一个轻量的工具，用于通过路径语法访问和修改 JSON 对象中的属性。它支持点号、方括号表示法，并处理嵌套及动态属性路径。

## 安装

使用 npm 安装 jsonbypath：

```bash
npm install jsonbypath
```

## 使用方法

导入模块
```javascript
const { parsePropertyPath, getValueByPath, setValueByPath } = require('jsonbypath');
```

### 函数说明
parsePropertyPath(path)：将属性路径字符串解析为属性数组。
getValueByPath(obj, path)：在给定 JSON 对象中获取指定路径上的值。
setValueByPath(obj, path, val)：在给定 JSON 对象中设置指定路径上的值。

### 示例

解析属性路径

```javascript
const path = 'user.address["street name"]';
const properties = parsePropertyPath(path); 
// 输出: ['user', 'address', 'street name']
```

获取指定路径的值

```javascript
const obj = { user: { address: { street: 'Main St' } } };
const path = 'user.address.street';
const value = getValueByPath(obj, path); 
// 输出: 'Main St'
```

设置指定路径的值

```javascript
const obj = { user: { address: { street: 'Main St' } } };
const path = 'user.address.street';
setValueByPath(obj, path, 'Broadway');
// 现在 obj.user.address.street 的值变为 'Broadway'
```

特殊字符

```javascript
const data = {
  m: {
    'a.b': {
      "c\\'\"d": {
        'e[0]': [10, 20, 30],
      },
    },
  }
};
// Accessing nested properties with special characters like '"[]\  
console.log(getValueByPath(data, `m['a.b']["c\\'\\"d"]['e[0]'][1]`));  // >> 20  
console.log(getValueByPath(data, `m['a.b']["c\\'\\"d"]['e[1]'][1]`));  // >> Warning  
console.log(setValueByPath(data, `m['a.b']["c\\'\\"d"]['e[1]']`, [333,555,888]));  // >> Warning  
console.log(getValueByPath(data, `m['a.b']["c\\'\\"d"]['e[1]'][1]`));  // >> 555  
```


### 错误处理

如果路径在对象中不存在，将记录警告并返回 undefined。

```javascript
const obj = { user: { name: 'Alice' } };
const value = getValueByPath(obj, 'user.address.street'); 
// 输出: 警告: 属性 "address" 在 "user.address.street" 中不存在。
```

### 注意

setValueByPath 时需确保父级对象存在，否则会报path不存在的错误提示。


## 许可
本项目基于 MIT 许可证授权。







