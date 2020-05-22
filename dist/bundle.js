(function (graph) {
      function require (module) {
        function localRequire (relativePath) {
          return require(graph[module].dependecies[relativePath])
        }

        var exports = {}
        (function (require, exports, code) {
          eval(code)
        })(localRequire, exports, graph[module].code)

        return exports
      }

      require('G:\webpack-demo\index.js')
    })({"G:\\webpack-demo\\index.js":{"dependecies":{"./src/text.js":"G:\\webpack-demo\\src\\text.js"},"code":"\"use strict\";\n\nvar _text = _interopRequireDefault(require(\"./src/text.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(_text[\"default\"]);"},"G:\\webpack-demo\\src\\text.js":{"dependecies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.text = void 0;\nvar text = 'hello world';\nexports.text = text;"}})