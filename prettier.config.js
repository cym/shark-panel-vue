/**
 * Prettier配置
 *
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  printWidth: 80, // 建议一行最多80字符
  tabWidth: 2, // 使用2个缩进
  useTabs: false, // 使用tab符缩进, false为空格缩进
  semi: true, // 语句末尾使用分号
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed', // 对象的key仅在必要时用引号
  jsxSingleQuote: false, // jsx不使用单引号, 而使用双引号
  trailingComma: 'all', // 尾随逗号
  bracketSpacing: true, // 大括号内的首尾需要空格
  bracketSameLine: false, // 括号线
  arrowParens: 'always', // 箭头函数, 只有一个参数的时候也需要括号
  requirePragma: false, // 需要编译指示
  insertPragma: false, // 插入
  proseWrap: 'never', // 是否换行
  htmlWhitespaceSensitivity: 'strict', // 根据显示样式决定html要不要折行
  vueIndentScriptAndStyle: true, // 缩进js跟css
  endOfLine: 'lf', // 换行符使用lf
  embeddedLanguageFormatting: 'auto', // 嵌入式语言格式化
  singleAttributePerLine: false, // 每行单个属性
};
