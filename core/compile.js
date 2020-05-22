const path = require('path')
const fs = require('fs')
const { getAst, getDependecies, getCode } = require('./parse')

class Compile {
  constructor (options) {
    const { entry, output } = options

    this.entry = entry
    this.output = output
    // 模块
    this.modules = []
  }

  build (filename) {
    const ast = getAst(filename)
    const dependecies = getDependecies(ast, filename)
    const code = getCode(ast)

    return {
      filename,
      dependecies,
      code
    }
  }

  run () {
    const info = this.build(this.entry)
    this.modules.push(info)

    // 递归解析所有依赖项，不能使用forEach遍历，否则无法遍历到新增的模块
    for (let i = 0; i < this.modules.length; i++) {
      const { dependecies } = this.modules[i]
      if (dependecies) {
        Object.values(dependecies).forEach(dependecy => {
          this.modules.push(this.build(dependecy))
        })
      }
    }

    // 生成依赖关系图
    const dependecyGraph = this.modules.reduce((graph, item) => {
      return {
        ...graph,
        [item.filename]: {
          dependecies: item.dependecies,
          code: item.code
        }
      }
    }, {})

    this.generate(dependecyGraph)
  }

  // 重写require方法，实现打包后的引用
  generate (code) {
    // 如果不存在dist文件夹，创建一个
    if (!fs.existsSync(this.output.path)) {
      fs.mkdirSync(this.output.path)
    }
    const filePath = path.join(this.output.path, this.output.filename)

    const bundle = `(function (graph) {
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

      require('${this.entry}')
    })(${JSON.stringify(code)})`

    // 如果文件存在先删除
    if(fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}

module.exports = Compile