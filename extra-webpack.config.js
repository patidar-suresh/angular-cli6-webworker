const path = require('path');

const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];

const HtmlWebpackPlugin = require('html-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AngularCompilerPlugin;


module.exports = {
    target : "web",
    "entry": {
      "main": [
        "./src/main.ts"
      ],
      "polyfills": [
        "./src/polyfills.ts"
      ],
      "styles": [
        "./src/styles.css"
      ],
      "webworker": [
        "./src/workerLoader.ts"
      ]
    },
    "output": {
      "path": path.join(process.cwd(), "dist"),
      "filename": "[name].bundle.js",
      "chunkFilename": "[id].chunk.js"
    },
    "module": { },
    "plugins": [
      new HtmlWebpackPlugin({
        "template": "./src/index.html",
        "filename": "./index.html",
        "hash": false,
        "inject": true,
        "compile": true,
        "favicon": false,
        "minify": false,
        "cache": true,
        "showErrors": true,
        "chunks": "all",
        "xhtml": true,
        "excludeChunks": [
          "webworker"
        ],
        "title": "Webpack App",
        "chunksSortMode": function sort(left, right) {
          let leftIndex = entryPoints.indexOf(left.names[0]);
          let rightIndex = entryPoints.indexOf(right.names[0]);
          if (leftIndex > rightIndex) {
            return 1;
          }
          else if (leftIndex < rightIndex) {
            return -1;
          }
          else {
            return 0;
          }
        }
      }),
      new AotPlugin({
        "mainPath": "main.ts",
        "entryModule": 'src/app/app.module#AppModule',
        "hostReplacementPaths": {
          "environments/environment.ts": "environments/environment.ts"
        },
        "exclude": [],
        "tsConfigPath": "src/tsconfig.app.json",
        "skipCodeGeneration": true
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /\/node_modules\//,
            chunks: 'all',
            priority: 0,
            enforce: true,
          },
        },
      },
    },
  };
