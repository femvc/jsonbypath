function parsePropertyPath(path) {
  let properties = [];  // 用于保存解析出的属性路径
  let current = '';     // 当前解析的属性名
  let inBracket = false;  // 是否处于方括号内
  let inQuotes = false;   // 是否处于引号内
  let quoteChar = '';     // 引号的类型（' 或 "）
  
  for (let i = 0; i < path.length; i++) {
    let char = path[i];
    
    if (inQuotes) {
      // 如果在引号内，处理转义字符
      if (char === '\\' && i + 1 < path.length && path[i + 1] === quoteChar) {
        current += path[++i];  // 跳过转义的引号
      } else if (char === quoteChar) {
        // 遇到闭合引号，结束字符串
        inQuotes = false;
      } else {
        current += char;
      }
    } else if (char === '"' || char === '\'') {
      // 进入引号内，开始处理字符串
      inQuotes = true;
      quoteChar = char;
    } else if (char === '[') {
      // 进入方括号模式
      if (current) {
        properties.push(current);
        current = '';
      }
      inBracket = true;
    } else if (char === ']') {
      // 退出方括号模式
      if (current) {
        properties.push(current);
        current = '';
      }
      inBracket = false;
    } else if (char === '.' && !inBracket) {
      // 遇到点，处理属性分割
      if (current) {
        properties.push(current);
        current = '';
      }
    } else {
      // 累积属性名字符
      current += char;
    }
  }
  
  // 将最后一个属性添加进去
  if (current) {
    properties.push(current);
  }
  return properties;
};

function findValueByPath (obj, path) {
  let properties = Array.isArray(path) ? path : parsePropertyPath(path);
  
  // 通过解析好的属性路径，逐步访问嵌套对象
  // 使用 while 循环逐步访问嵌套对象
  let cur = obj;
  let i = 0;
  while (i < properties.length) {
    let prop = properties[i];
    if (cur && cur.hasOwnProperty(prop)) {
      cur = cur[prop];  // 访问对象属性
    } else {
      console.warn(`Warning: Property "${prop}"  in "${path}" does not exist.`);
      return undefined;  // 返回 undefined 表示属性不存在
    }
    i++;
  }
  return cur;  // 返回最终获取的属性值
};
var getValueByPath = findValueByPath;

function setValueByPath (obj, path, val) {
  let properties = Array.isArray(path) ? path : parsePropertyPath(path);
  
  // 通过解析好的属性路径，逐步访问嵌套对象
  // 使用 while 循环逐步访问嵌套对象
  let cur = obj;
  let i = 0;
  while (i < properties.length) {
    let prop = properties[i];
    if (i === properties.length - 1) {
      cur[prop] = val;
    } else {
      if (cur && cur.hasOwnProperty(prop)) {
        cur = cur[prop];  // 访问对象属性
      } else {
        console.warn(`Warning: Property "${prop}"  in "${path}" does not exist.`);
        return undefined;  // 返回 undefined 表示属性不存在
      }
    }
    i++;
  }
  return cur;  // 返回最终获取的属性值
};

if (typeof exports !== 'undefined') {
  exports.parsePropertyPath = parsePropertyPath
  exports.getValueByPath = getValueByPath
  exports.findValueByPath = findValueByPath
  exports.setValueByPath = setValueByPath
}