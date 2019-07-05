const path = require('path')

module.exports = {
    target: "async-node",
    entry: "./src/index.js",
    output: {
      filename: "bundle.js"
    },
    mode: "production"
} 