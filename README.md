# jsonbypath
getValueByPath(obj, path)/setValueByPath(obj, path, val)

// Accessing nested properties with special characters like '"[]\  
console.log(getValueByPath(data, `m['a.b']["c\\'\\"d"]['e[0]'][1]`));  // >> 20  
console.log(getValueByPath(data, `m['a.b']["c\\'\\"d"]['e[1]'][1]`));  // >> Warning  
console.log(setValueByPath(data, `m['a.b']["c\\'\\"d"]['e[1]']`, [333,555,888]));  // >> Warning  
console.log(getValueByPath(data, `m['a.b']["c\\'\\"d"]['e[1]'][1]`));  // >> 555  
