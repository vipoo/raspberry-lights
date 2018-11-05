module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true
  },
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "plugins": ["eslint-plugin-node", "import"],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "node/no-missing-import": ["error", {
        "allowModules": [],
        "resolvePaths": ["node_modules"],
        "tryExtensions": [".js", ".mjs"]
    }],
    "import/no-commonjs": ["error"],    
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-console": 0
  },
  "globals": {
    "require": false,
    "module": false,
    "exports": false,
    "process": false
  }
}