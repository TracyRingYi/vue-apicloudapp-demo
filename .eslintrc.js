module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        "@vue/prettier",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "parser": "babel-eslint",
    },
    "plugins": [
        "vue",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        'generator-star-spacing': 'off',
        'no-console':'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-restricted-modules':'off'
    }
};