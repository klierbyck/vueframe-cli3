// https://eslint.org/docs/user-guide/configuring
module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        '@vue/standard'
        //   'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0, //测试环境关掉console报错
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, //测试环境关掉debugger报错
        "no-undef": 0, //不允许未声明的变量
        "no-unused-vars": [0, { "vars": "all", "args": "none" }], //不允许有声明后未使用的变量或者参数
        "no-tabs": 0, //允许tabs
        "no-mixed-spaces-and-tabs": [0, "smart-tabs"], //允许混用tab和空格
        "indent": [0, 4], //缩进风格
        "camelcase": [0, { "properties": "never" }], //强制驼峰命名规则
        "space-before-function-paren": [0, { "anonymous": "always", "named": "never" }], //函数定义时括号前的空格
        "arrow-parens": 0, //箭头函数用小括号括起来
        "semi": [0, "always"], //语句强制分号结尾
        "no-extra-parens": 2, //禁止非必要的括号
        "no-extra-semi": 2, //禁止多余的冒号
        "quotes": [2, "single"], //引号类型为单引号
        "space-after-keywords": [0, "always"], //关键字后面是否要空一格
        'generator-star-spacing': 0, // 生成器函数*的前后空格
        "eol-last": 0, //文件以单一的换行符结束
        "no-multiple-empty-lines": [0, {"max": 100}],
    }
}