module.exports = {
  printWidth: 100, //超过最大值换行
  tabWidth: 2, //限制tab缩进字节数
  useTabs: false, //缩进不使用tab，使用空格
  semi: true, //句尾添加分号
  singleQuote: true, //使用单引号代替双引号
  proseWrap: 'preserve', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  arrowParens: 'avoid', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  endOfLine: 'lf', // 结尾是 \n \r \n\r auto
  htmlWhitespaceSensitivity: 'ignore', // HTML空格敏感度 css|ignore|strict
  // ignorePath: '.prettierignore' ,// 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  trailingComma: 'none', //在对象或数组最后一个元素后面是否加逗号
  vueIndentScriptAndStyle: true // vue缩进脚本和样式
};
