/*global require,exports*/
/********************************************************************
 * Copyright (C) 2024
 *
 * @author wanghaiyang
 * @date 2024/11/03
 *
 ********************************************************************
 */
'use strict'
var lib = require('./jsonbypath')
module.exports = {
    parsePropertyPath: lib.parsePropertyPath,
    getValueByPath: lib.getValueByPath,
    findValueByPath: lib.findValueByPath,
    setValueByPath: lib.setValueByPath
}