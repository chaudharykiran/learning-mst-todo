module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "globals": {
        "document": 1
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prefer-stateless-function": 0,
        "no-unused-expressions": 0,
        "react/prop-types": 0,
        "react/no-unused-state": 0,
        "import/prefer-default-export": 0,
        "no-param-reassign": 0,
      }
};
