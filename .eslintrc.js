module.exports = {
  "extends": ["standard"],
  "plugins": [
  	"html"
  ],
  "rules": {
    "arrow-parens": 0,
    "no-console": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-new": "off",
    "indent": ["error", 4],
    "semi": ["error", "always"]
  },
  "parserOptions": {
    "parser": "babel-eslint"
  }
}