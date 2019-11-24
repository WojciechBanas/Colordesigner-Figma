module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:prettier/recommended'
    ],
    plugins: [
        'prettier'
    ],
    // add your custom rules here
    rules: {
        'no-console': 'off',
        "indent": ["error", 4, {"SwitchCase": 1}],
        "vue/html-indent": ["error", 4],
        "vue/script-indent": ["error", 4],
    }
}
