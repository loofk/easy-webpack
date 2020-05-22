(function (graph) {
      function require (module) {
        function localRequire (relativePath) {
          return require(graph[module].dependecies[relativePath])
        }

        var exports = {}
        ;(function (require, exports, code) {
          eval(code)
        })(localRequire, exports, graph[module].code)

        return exports
      }

      require('index.js')
    })({"index.js":{"dependecies":{"./src/say.js":"./src\\say.js"},"code":"\"use strict\";\n\nvar _say = require(\"./src/say.js\");\n\n(0, _say.sayHello)();"},"./src\\say.js":{"dependecies":{"./text.js":"./src\\text.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.sayHello = sayHello;\n\nvar _text = require(\"./text.js\");\n\nfunction sayHello() {\n  document.write(_text.text);\n}"},"./src\\text.js":{"dependecies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.text = void 0;\nvar text = 'hello world';\nexports.text = text;"}})